/**
@module
@author iAmMichaelConnor
@desc Run from within nightfall/zkp/code
*/

import { argv } from 'yargs';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { generateZokratesFiles } from 'nightlite_yqb';

const isDirectory = source => fs.lstatSync(source).isDirectory();
const getDirectories = source =>
  fs
    .readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory);

/**
 * Trusted setup for Nightfall. Either compiles all directories in /code/zkpScheme, or a single directory using the -f flag.
 * Calls zokrates' compile, setup, and export-verifier on all (or a specified) directories in `/zkp/code/zkpScheme`.
 */
async function main() {
  // -f being the name of the .code file (i.e., 'ft-mint')
  const { f } = argv;
  // -s being the scheme of zkp (g16, gm17)
  let zkpScheme = argv.s;
  if (!zkpScheme) {
    zkpScheme = "g16";
  }
  console.log(`Proving scheme ${zkpScheme} will be used.`)

  if (!f) {
    console.log(
      "The '-f' option has not been specified.\nThat's OK, we can go ahead and loop through every .code file.\nHOWEVER, if you wanted to choose just one file, cancel this process, and instead use option -f (see the README-trusted-setup)",
    );
    console.log('Be warned, this could take up to an hour!');

    const carryOn = await inquirer.prompt([
      {
        type: 'yesno',
        name: 'continue',
        message: 'Continue?',
        choices: ['y', 'n'],
      },
    ]);
    if (carryOn.continue !== 'y') return;

    try {
      // Array of all directories in the above directory.
      const codeDirectories = getDirectories(`${process.cwd()}/code/${zkpScheme}`);

      // The files don't compile correctly when we Promise.all these, so we're doing sequentially.
      // Maybe too much processing.
      for (let j = 0; j < codeDirectories.length; j += 1) {
        // eslint-disable-next-line no-await-in-loop
        await generateZokratesFiles(codeDirectories[j], zkpScheme);
      }
    } catch (err) {
      throw new Error(`Trusted setup failed: ${err}`);
    }
  } else {
    await generateZokratesFiles(`${process.cwd()}/code/${f}`, zkpScheme);
  }
}

// RUN
main().catch(err => {
  console.log(err);
  process.exit(1);
});
