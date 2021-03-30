import { HttpException, HttpStatus } from "@nestjs/common";

export class RNASequenceDataException extends HttpException {
  public static ERROR_RNA_SEQUENCE = "ERROR: The RNA Sequence cannot be processed. DETAILS:\n  $e";

  constructor(e: Error) {
    const errorMessage = RNASequenceDataException.ERROR_RNA_SEQUENCE.replace("$e",e.message);
    super(
      {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: errorMessage
      },
      HttpStatus.UNPROCESSABLE_ENTITY
    );
    process.stdout.write(errorMessage + "\n");
  }
}