import { Injectable } from '@nestjs/common';
import { ProcessRNASequenceDto } from '../model/dto/process-rnaSequence.dto';
import { SelectFileUseCase } from './use-case/selectFile.use-case';
import { GetHelpRNASequencesUseCase } from './use-case/getHelpRNASequences.use-case';
import { NextGenUseCase } from './use-case/nextGene.use-case';

@Injectable()
export class RNASequencesService {
  private readonly selectFile: SelectFileUseCase = new SelectFileUseCase();
  private readonly nextGene: NextGenUseCase = new NextGenUseCase();

  /**
   * A function that return how we can use the service
   * @returns an string with the explanation
   */
  public getHelp(): string {
    return GetHelpRNASequencesUseCase.helpInfo;
  }

  /**
   * A function to select the file to be used.
   * @param rnafilepath the file path.
   */
  public setSelectFile(rnafilepath: string): void {
    const readStream = this.selectFile.createReadStream(rnafilepath);
    this.nextGene.setGeneratorSecuence(readStream);
    process.stdout.write("File selected: " + rnafilepath + "\n\n");
  }

  /**
   * A function to obtain the next gene of the sequence in the file.
   * @returns The process secuence of the next gene.
   */
  public getNextGene(): ProcessRNASequenceDto {
    return this.nextGene.getNextGene();
  }
}
