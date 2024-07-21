/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Anki Path - Typically found in /Users/antonsuprun/Library/Application Support/Anki2/User 1/ */
  "ankiPath": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `decks` command */
  export type Decks = ExtensionPreferences & {}
  /** Preferences accessible in the `browseCards` command */
  export type BrowseCards = ExtensionPreferences & {}
  /** Preferences accessible in the `addCard` command */
  export type AddCard = ExtensionPreferences & {}
  /** Preferences accessible in the `test` command */
  export type Test = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `decks` command */
  export type Decks = {}
  /** Arguments passed to the `browseCards` command */
  export type BrowseCards = {}
  /** Arguments passed to the `addCard` command */
  export type AddCard = {}
  /** Arguments passed to the `test` command */
  export type Test = {}
}


