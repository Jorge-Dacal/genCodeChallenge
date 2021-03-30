import { Controller, Post, Body, Get} from '@nestjs/common';
import { FileRNASequenceDto } from '../model/dto/file-rnaSequence.dto';
import { ProcessRNASequenceDto } from '../model/dto/process-rnaSequence.dto';
import { RNASequencesService } from '../services/rnaSequences.service';

@Controller('rnaSequences')
export class RNASequencesController {
  constructor(private rnaSequencesService: RNASequencesService) {}
  
  @Get()
  getHelp(): string {
    return this.rnaSequencesService.getHelp();
  }

  @Post("selectFile")
  postSelectFile(@Body() fileRNASequenceDto: FileRNASequenceDto): void {
    this.rnaSequencesService.setSelectFile(fileRNASequenceDto.rnafilepath);
  }

  @Get("nextGen")
  getNextGen(): ProcessRNASequenceDto {
    return this.rnaSequencesService.getNextGen();
  }
}