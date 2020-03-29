import { promises as fs, existsSync } from 'fs';
import * as path from 'path';

import { File } from './File';
import { IStorage } from './IStorage';
import { IOException } from './errors/IOException';

export class LocalStorage implements IStorage {
  //#region Private methods
  private async *spreadDir(dir: string, level = 0): AsyncGenerator<File> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    let count = 0;
    for await (const dirent of dirents) {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory() && count < level) {
        count++;
        yield* this.spreadDir(res);
      } else {
        if (dirent.isFile()) {
          yield {
            path: dir,
            name: dirent.name,
          };
        }
      }
    }
  }
  //#endregion

  //#region Public methods
  public async list(dir: string, level = 0): Promise<File[]> {
    if (!existsSync(dir)) {
      throw new IOException(`Directory (${dir}) does not exists in the local filesystem`);
    }
    const result: File[] = [];
    for await (const file of this.spreadDir(dir, level)) {
      result.push(file);
    }
    return result;
  }

  public copy(source: File, targetPath: string): string {
    throw new Error('Method not implemented.');
  }
  public move(source: File, targetPath: string): string {
    throw new Error('Method not implemented.');
  }
  public compress(files: File[], targetPath: string): string {
    throw new Error('Method not implemented.');
  }
  public download(file: File): ReadableStream<any> {
    throw new Error('Method not implemented.');
  }
  public downloadDir(dirPath: string): ReadableStream<any> {
    throw new Error('Method not implemented.');
  }
  public downloadArchive(files: File[]): ReadableStream<any> {
    throw new Error('Method not implemented.');
  }
  //#endregion
}
