import { HttpException, HttpStatus } from "@nestjs/common";

export class FileNotFoundException extends HttpException {
  public static FILE_NOT_FOUND = "ERROR: The RNA File not found in path: $path";

  constructor(path: string) {
    const errorMessage = FileNotFoundException.FILE_NOT_FOUND.replace("$path",path);
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: errorMessage
      },
      HttpStatus.NOT_FOUND
    );
    process.stdout.write(errorMessage + "\n");
  }
}