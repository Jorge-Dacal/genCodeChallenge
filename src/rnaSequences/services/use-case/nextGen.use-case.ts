import { Injectable } from '@nestjs/common';
import { ProcessRNASequenceDto } from '../../model/dto/process-rnaSequence.dto';
import { Codon } from '../../model/codon';
import { Gen } from '../../model/gen';
import { CommentAndIgnoreCharacters } from '../../model/commentAndIgnoreCharacters';
import { ReadStream } from 'fs';
import { FileNotLoadException } from '../../exceptions/fileNotLoad.exception';
import { RNASequenceDataException } from '../../exceptions/invalidRNASequenceData.exception';

@Injectable()
export class NextGenUseCase {
  private generatorSecuence: Generator<Gen>
  private codon: Codon;
  private gen: Gen;
  private commentAndIgnoreCharacters: CommentAndIgnoreCharacters;

  public static ERROR_PROCESS_RNA_SEQUENCE = "ERROR: error during process RNA Sequence. Resetting all values to start from the scratch. REASON:\n    $e"

  /**
   * A fuction to set the readStream to read the secuences.
   * @param readStream the readStream that reads the file info.
   */
  public setGeneratorSecuence(readStream: ReadStream): void {
    this.resetGeneratorSecuence();
    this.generatorSecuence = this.processRNASequence(readStream);
  }

  /**
   * A function to obtain the next gen of the sequence in the file.
   * @returns The process secuence of the next gen.
   */
  public getNextGen(): ProcessRNASequenceDto {
    let res: ProcessRNASequenceDto = new ProcessRNASequenceDto();
    if (this.generatorSecuence == undefined) {
      throw new FileNotLoadException();
    }
    try {
      const genIterator: IteratorResult<Gen> = this.generatorSecuence.next();
      if (genIterator.done) {
        res.complete();
      }
      if (genIterator.value != undefined) {
        const gen: Gen = genIterator.value;
        res.setGen(gen);
      }
      return res;
    } catch (e) {
      throw new RNASequenceDataException(e);
    }
  }

  /**
   * A function to process a file and obtain gen sequences of it.
   * @param readStream The file to analyze.
   * @returns The process secuence of the first gen found.
   */
  private * processRNASequence(readStream: ReadStream): Generator<Gen> {
    try {
      let br: string | Buffer;
      while (null !== (br = readStream.read(1))) {
        const c: string = br.toString();
        if (!this.commentAndIgnoreCharacters.characterMustBeIgnored(c)){
          this.codon.addNucleotide(c);
          if (this.codon.isComplete()) {
            this.gen.addCodon(this.codon);
            if (this.gen.isComplete()) {
              yield this.gen; // Return gen and wait for next invocation
              this.gen = new Gen(); // Reboot for new gen
            }
            this.codon = new Codon(); // Reboot codon for new sequence
          }
        }
      }
      readStream.close();
      this.resetGeneratorSecuence(); // When finish, we need to unset everything like if we start from the scratch
    }catch (e) {
      const errorMessage = NextGenUseCase.ERROR_PROCESS_RNA_SEQUENCE.replace("$e",e.message);
      this.resetGeneratorSecuence();
      throw new Error(errorMessage);
    }
  }

  /**
   * A function to reset all the memory variables to start from the scratch
   */
  private resetGeneratorSecuence(): void {
    this.generatorSecuence = undefined;
    this.gen = new Gen();
    this.codon = new Codon();
    this.commentAndIgnoreCharacters = new CommentAndIgnoreCharacters();
  }
}
