#! /usr/bin/env node

import { checkArgs, extractToDirectory } from './lib/lib';

checkArgs()
  .then((target) => {
    return extractToDirectory(target);
  })
  .then((directory) => {
    console.log('\x1b[32m%s\x1b[0m', `✨ Images have been extracted to folder ${directory} !`);
  })
  .catch((err) => {
    console.error(`\x1b[31m${err}\x1b[0m`);
    process.exit(1);
  });
