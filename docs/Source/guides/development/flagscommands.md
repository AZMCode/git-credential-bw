## Terminology
| Term | Meaning |
| ---- | ------- |
| `Flag`| `-`-prepended CLI argument|
| `FlagFn`| Unique function called by a flag|
| `Command`| First CLI argument not prepended by `-`|
| `CommandFn` | Unique function called by a command, if no flags are given|

## FlagFns

They can either be located inline in the flags.ts file, where all FlagFns can be imported from either way, or inside the `flags` folder under src/.

They're meant to be called without input, and return no output.

## CommandFns

They can either be located inline in the commands.ts file, where all CommandFns can be imported from either way, or inside the `flags` folder under src/.

They're meant to be called with all of stdin, and return some specified value.
They're meant to correlate 1-1 and implement git-credential commands.

## Which one is called when?

In a single program invocation, only a single FlagFn or CommandFn will be called, with preference to FlagFns
