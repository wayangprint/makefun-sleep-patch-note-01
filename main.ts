// Changelog entry for the "Fix Human Sleep" make.fun bounty.
// Competition: u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27
//
// One dry changelog sentence: human sleep shipped as a bug fix.
// Pure and repeatable: nothing is fetched, nothing is random, and
// nothing is read from the environment except the output folder.
// The line is written to <dir>/entry.txt with no trailing newline
// and is also echoed on stdout.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const NOTE_LINE =
  "Fixed: humans now fall asleep in under 8 minutes; removed the 3 a.m. feature that replayed every embarrassing thing you have ever said.";

const DEFAULT_DIR = "output";

// The harness may point us at its own directory; otherwise we use
// a local ./output folder next to the working directory.
function destinationDir(): string {
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  return override !== undefined && override !== "" ? override : DEFAULT_DIR;
}

function publish(): void {
  const folder = destinationDir();
  mkdirSync(folder, { recursive: true });
  writeFileSync(resolve(folder, "entry.txt"), NOTE_LINE, "utf8");
  process.stdout.write(NOTE_LINE + "\n");
}

publish();
