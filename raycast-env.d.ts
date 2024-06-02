/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `decks` command */
  export type Decks = ExtensionPreferences & {}
  /** Preferences accessible in the `addCard` command */
  export type AddCard = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `decks` command */
  export type Decks = {}
  /** Arguments passed to the `addCard` command */
  export type AddCard = {}
}


declare module "swift:*" {
  function run<T = unknown, U = any>(command: string, input?: U): Promise<T>;
  export default run;
	export class SwiftError extends Error {
    stderr: string;
    stdout: string;
  }
}
