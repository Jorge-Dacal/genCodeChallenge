import { Module } from '@nestjs/common';
import { RNASequencesController } from './controllers/rnaSequences.controller';
import { RNASequencesService } from './services/rnaSequences.service';

@Module({
  controllers: [RNASequencesController],
  providers: [RNASequencesService],
})
export class RNASequencesModule {}