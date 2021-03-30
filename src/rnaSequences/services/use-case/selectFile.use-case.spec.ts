import { SelectFileUseCase } from "./selectFile.use-case";
import { FileNotFoundException } from "../../exceptions/fileNotFound.exception";

describe('SelectFileUseCase', () => {
  let selectFile: SelectFileUseCase;
  const invalidPath = "#:notexist\t\\fakefile.txt"

  it('Try to set a file that not exist', () => {
    selectFile = new SelectFileUseCase();
    const error: FileNotFoundException = new FileNotFoundException(invalidPath)
    expect(
      () => selectFile.createReadStream(invalidPath)
    ).toThrow(error);
  });
});
