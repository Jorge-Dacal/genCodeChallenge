import { Injectable } from '@nestjs/common';
import { ProcessRNASequenceDto } from '../model/dto/process-rnaSequence.dto';
import { SelectFileUseCase } from './use-case/selectFile.use-case';
import { GetHelpRNASequencesUseCase } from './use-case/getHelpRNASequences.use-case';
import { NextGenUseCase } from './use-case/nextGen.use-case';

@Injectable()
export class RNASequencesService {
  private readonly selectFile: SelectFileUseCase = new SelectFileUseCase();
  private readonly nextGen: NextGenUseCase = new NextGenUseCase();

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
    this.nextGen.setGeneratorSecuence(readStream);
    process.stdout.write("File selected: " + rnafilepath + "\n\n");
  }

  /**
   * A function to obtain the next gen of the sequence in the file.
   * @returns The process secuence of the next gen.
   */
  public getNextGen(): ProcessRNASequenceDto {
    return this.nextGen.getNextGen();
  }
}
