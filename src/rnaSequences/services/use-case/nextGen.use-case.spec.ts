import { NextGenUseCase } from "./nextGen.use-case";
import { Codon } from "./../../model/codon";
import { Gen } from "./../../model/gen";
import { CommentAndIgnoreCharacters } from "./../../model/commentAndIgnoreCharacters";
import { ProcessRNASequenceDto } from "./../../model//dto/process-rnaSequence.dto";
import { FileNotLoadException } from "../../exceptions/fileNotLoad.exception";
import { RNASequenceDataException } from "../../exceptions/invalidRNASequenceData.exception";
import { createReadStream, ReadStream } from "fs";

describe('NextGenUseCase', () => {
  let nextGen: NextGenUseCase;
  
  const invalidCharacter: string = "j";
  
  const invalidCharacterPath: string = "./test/rnaSequences/files/invalidCharacter-j.txt"
  const invalidCommentInMidSequencePath: string = "./test/rnaSequences/files/invalidCommentInMidSequence.txt"
  const simpleSequencePath: string = "./test/rnaSequences/files/simpleSequence.txt"

  it('Try to use getNextGen before to set the file to be analyzed', () => {
    nextGen = new NextGenUseCase();
    expect(
      () => {
        nextGen.getNextGen()
      }
    ).toThrow(new FileNotLoadException());
  });

  it('Try to use getNextGen after to set a File that contains a not valid character', async () => {
    selectFile(invalidCharacterPath);
    await delay(1000);
    expect(
      () => nextGen.getNextGen()
      ).toThrow(
        rnaSequenceDataException(invalidCharacter)
      );
  });

  it('Try to use getNextGen after to set a File that contains a comment character in middle of the line', async () => {
    selectFile(invalidCommentInMidSequencePath);
    await delay(1000);
    expect(
      () => nextGen.getNextGen()
    ).toThrow(
      rnaSequenceDataException(CommentAndIgnoreCharacters.COMMENT_CHARACTER)
    );
  });

  it('use getNextGen to obtain the next', async () => {
    selectFile(simpleSequencePath);
    const rnaSequence: ProcessRNASequenceDto =  new ProcessRNASequenceDto(
      new Gen([
        new Codon("aaa"),
        new Codon("uag")
      ]),
      true
    )
    await delay(1000);
    const res: ProcessRNASequenceDto = nextGen.getNextGen();
    expect(res).toStrictEqual(rnaSequence);
  });

  function selectFile(filePath: string) {
    const readStream: ReadStream = createReadStream(filePath);
    readStream.pause();
    nextGen.setGeneratorSecuence(readStream);
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
