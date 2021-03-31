import { SelectFileUseCase } from "./selectFile.use-case";
import { FileNotFoundException } from "../../exceptions/fileNotFound.exception";
import { ReadStream } from "fs";

describe('SelectFileUseCase', () => {
  let selectFile: SelectFileUseCase;
  const invalidPath = "#:notexist\t\\fakefile.txt";
  const validPath: string = "./test/rnaSequences/files/simpleSequence.txt";
  const fileText: string = "aaa uag ccc uag uuu uag";

  it('Try to set a file that not exist.', () => {
    selectFile = new SelectFileUseCase();
    const error: FileNotFoundException = new FileNotFoundException(invalidPath)
    expect(
      () => selectFile.createReadStream(invalidPath)
    ).toThrow(error);
  });

  it('Set a valid file and read it byte to byte until the end.', async () => {
    selectFile = new SelectFileUseCase();
    const readStream: ReadStream = selectFile.createReadStream(validPath);
    await delay(1000);
    const res = readAllFile(readStream);
    expect(
      res
    ).toBe(fileText);
  });

  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  function readAllFile(readStream: ReadStream): string {
    let res: string = ""
    let br: string | Buffer;
    while (null !== (br = readStream.read(1))) {
      res += br.toString();
    }
    return res;
  }
});
