/**
 * Check if path passed as argument is set
 * @returns Promise<string> Path
 */
export declare const checkArgs: () => Promise<string>;
export declare const extractToDirectory: (target: string) => Promise<string>;
export declare const findFilesInFolder: (folder: string) => Promise<string[]>;
/**
 * Check if a path is a directory
 * @param target Path to check
 * @returns boolean True if path is a directory
 */
export declare const isDirectory: (target: string) => boolean;
