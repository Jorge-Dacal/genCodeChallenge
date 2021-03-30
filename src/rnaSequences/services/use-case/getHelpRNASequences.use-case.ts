import { Injectable } from '@nestjs/common';

@Injectable()
export class GetHelpRNASequencesUseCase {
  public static readonly helpInfo: string = 'Hello,\n\n'
  + 'To process your rna sequences you must invoke the endpoint of ./selectFile it as a POST and send the filepath in body like follows:\n'
  + '{\n  "rnafilepath": "your file path";\n}\n\n'
  + 'Once you have charged your file, you can get the next gene of it invoking the endpoint of ./nextGene. It returns the next object:\n'
  + '{\n  gene: Gene;\n  hasNext: boolean;\n}\n';
}