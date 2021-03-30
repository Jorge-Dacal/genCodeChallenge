import { Injectable } from '@nestjs/common';
import { existsSync, createReadStream, ReadStream } from 'fs';
import { FileNotFoundException } from '../../exceptions/fileNotFound.exception';

@Injectable()
export class SelectFileUseCase {
  /**
   * A function to create a readStream of the selected file to be used in rnaSequences service.
   * @param rnafilepath the file path.
   */
  public createReadStream(rnafilepath: string): ReadStream {
    if (!existsSync(rnafilepath)) {
      throw new FileNotFoundException(rnafilepath);
    }
    const readStream: ReadStream = createReadStream(rnafilepath);
    readStream.pause();
    return readStream;
  }
}
