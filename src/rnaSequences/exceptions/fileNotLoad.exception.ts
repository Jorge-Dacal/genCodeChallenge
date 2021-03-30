import { HttpException, HttpStatus } from "@nestjs/common";

export class FileNotLoadException extends HttpException {
  public static FILE_NOT_LOAD = "ERROR: The RNA File has not been charged.";

  constructor() {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: FileNotLoadException.FILE_NOT_LOAD
      },
      HttpStatus.BAD_REQUEST
    );
    process.stdout.write(FileNotLoadException.FILE_NOT_LOAD + "\n");
  }
}