import { Injectable } from '@nestjs/common';

@Injectable()
export class GetHelpRNASequencesUseCase {
  public static readonly helpInfo: string = 'Hello,\n\n'
  + 'To process your rna sequences you must invoke the endpoint of ./selectFile it as a POST and send the filepath in body like follows:\n'
  + '{\n  "rnafilepath": "your file path";\n}\n\n'
  + 'Once you have charged your file, you can get the next gen of it invoking the endpoint of ./nextGen. It returns the next object:\n'
  + '{\n  gen: Gen;\n  done: boolean;\n}\n';
}