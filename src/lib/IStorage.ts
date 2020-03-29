import { File } from './File';

export interface IStorage {
  list(dir: string, level: number): Promise<File[]>;
  copy(source: File, targetPath: string): string;
  move(source: File, targetPath: string): string;
  compress(files: File[], targetPath: string): string;
  download(file: File): ReadableStream;
  downloadDir(dirPath: string): ReadableStream;
  downloadArchive(files: File[]): ReadableStream;
}
