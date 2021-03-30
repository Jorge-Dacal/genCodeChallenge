import { Module } from '@nestjs/common';
import { RNASequencesModule } from './rnaSequences/rnaSequences.module';

@Module({
  imports: [RNASequencesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
