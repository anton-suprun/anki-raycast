/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** anki-connect port - Port that anki-connect uses. (Default: 8765) */
  "port"?: string,
  /**  - If selected, duplicate cards can be created */
  "allow_dup_cards"?: boolean,
  /** Duplicate Scope - Can be used to specify the scope for which duplicates are checked */
  "dup_scope": "deck" | "collection"
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `decks` command */
  export type Decks = ExtensionPreferences & {}
  /** Preferences accessible in the `browseCards` command */
  export type BrowseCards = ExtensionPreferences & {}
  /** Preferences accessible in the `addCard` command */
  export type AddCard = ExtensionPreferences & {
  /**  - Enabling this will allow you to create cards with empty fields */
  "allow_empty_card_fields"?: boolean
}
  /** Preferences accessible in the `viewStats` command */
  export type ViewStats = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `decks` command */
  export type Decks = {}
  /** Arguments passed to the `browseCards` command */
  export type BrowseCards = {}
  /** Arguments passed to the `addCard` command */
  export type AddCard = {}
  /** Arguments passed to the `viewStats` command */
  export type ViewStats = {}
}



