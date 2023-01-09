import { execSync, spawn } from 'child_process';
import { argv, cwd } from 'process';
import { PathLike, statSync, readdirSync, copyFileSync, mkdirSync, rmdirSync, rmSync } from 'fs';
import { join, extname, basename, dirname, sep } from 'path';
import { randomUUID } from 'crypto';
import * as decompress from 'decompress';
import { fileTypeFromFile } from 'file-type';

/**
 * Check if path passed as argument is set
 * @returns Promise<string> Path
 */
export const checkArgs = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const target = argv[2];
    if (!target) reject('Please specify which XD file you want to extract.');

    const file = join(cwd(), target);
    if (extname(file) !== '.xd') reject('Please specify a valid XD file.');

    resolve(target);
  });
};

export const extractToDirectory = (target: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const randomFolderName = randomUUID();
    const destinationFolder = randomUUID();
    mkdirSync(join(cwd(), destinationFolder));

    decompress(target, randomFolderName)
      .then(() => {
        return findFilesInFolder(join(randomFolderName, 'resources'));
      })
      .then(async (files) => {
        for (let file of files) {
          const mime = await fileTypeFromFile(file);
          copyFileSync(file, join(cwd(), destinationFolder, `${basename(file)}.${mime.ext}`));
        }
        rmSync(join(cwd(), randomFolderName), { recursive: true, force: true });
        resolve(destinationFolder);
      });
  });
};

export const findFilesInFolder = (folder: string): Promise<string[]> => {
  return new Promise((resolve) => {
    const path = join(cwd(), folder);
    const files = readdirSync(path)
      .filter((file) => !isDirectory(join(path, file)))
      .map((file) => join(cwd(), folder, file));
    resolve(files);
  });
};

/**
 * Check if a path is a directory
 * @param target Path to check
 * @returns boolean True if path is a directory
 */
export const isDirectory = (target: string): boolean => {
  return statSync(target).isDirectory();
};
