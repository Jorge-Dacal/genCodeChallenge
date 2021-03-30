import { NextGenUseCase } from "./nextGene.use-case";
import { Codon } from "./../../model/codon";
import { Gene } from "../../model/gene";
import { CommentAndIgnoreCharacters } from "./../../model/commentAndIgnoreCharacters";
import { ProcessRNASequenceDto } from "./../../model//dto/process-rnaSequence.dto";
import { FileNotLoadException } from "../../exceptions/fileNotLoad.exception";
import { RNASequenceDataException } from "../../exceptions/invalidRNASequenceData.exception";
import { createReadStream, ReadStream } from "fs";

describe('NextGenUseCase', () => {
  let nextGene: NextGenUseCase;
  
  const invalidCharacter: string = "j";
  
  const invalidCharacterPath: string = "./test/rnaSequences/files/invalidCharacter-j.txt"
  const invalidCommentInMidSequencePath: string = "./test/rnaSequences/files/invalidCommentInMidSequence.txt"
  const simpleSequencePath: string = "./test/rnaSequences/files/simpleSequence.txt"

  it('Try to use getNextGene before to set the file to be analyzed', () => {
    nextGene = new NextGenUseCase();
    expect(
      () => {
        nextGene.getNextGene()
      }
    ).toThrow(new FileNotLoadException());
  });

  it('Try to use getNextGene after to set a File that contains a not valid character', async () => {
    selectFile(invalidCharacterPath);
    await delay(1000);
    expect(
      () => nextGene.getNextGene()
      ).toThrow(
        rnaSequenceDataException(invalidCharacter)
      );
  });

  it('Try to use getNextGene after to set a File that contains a comment character in middle of the line', async () => {
    selectFile(invalidCommentInMidSequencePath);
    await delay(1000);
    expect(
      () => nextGene.getNextGene()
    ).toThrow(
      rnaSequenceDataException(CommentAndIgnoreCharacters.COMMENT_CHARACTER)
    );
  });

  it('use getNextGene to obtain the next', async () => {
    selectFile(simpleSequencePath);
    const rnaSequence: ProcessRNASequenceDto =  new ProcessRNASequenceDto(
      new Gene([
        new Codon("aaa"),
        new Codon("uag")
      ]),
      true
    )
    await delay(1000);
    const res: ProcessRNASequenceDto = nextGene.getNextGene();
    expect(res).toStrictEqual(rnaSequence);
  });

  function selectFile(filePath: string) {
    const readStream: ReadStream = createReadStream(filePath);
    readStream.pause();
    nextGene.setGeneratorSecuence(readStream);
  }

  function rnaSequenceDataException(nucleotide: string): RNASequenceDataException {
    const e: string = NextGenUseCase.ERROR_PROCESS_RNA_SEQUENCE.replace(
      "$e",
      Codon.ERROR_NOT_NUCLEOTIDE.replace("$nucleotide", nucleotide)
    )
    const error: Error = new Error(e);
    return new RNASequenceDataException(error)
  }

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
});
