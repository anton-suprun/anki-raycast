import { DeckName, DeckStats } from '../types';
import { combineDeckInfo, delay } from '../util';
import { ankiReq } from './ankiClient';

export const createDeck = async (deckName: string): Promise<void> => {
  try {
    await ankiReq('createDeck', { deck: deckName });
  } catch (error) {
    throw new Error('Could not create deck');
  }
};

export const deleteDeck = async (deckName: string): Promise<void> => {
  try {
    await ankiReq('deleteDecks', { decks: [deckName], cardsToo: true });
  } catch (error) {
    throw new Error(`Could not delete deck: ${deckName}`);
  }
};

export const getDecks = async (): Promise<DeckStats[]> => {
  try {
    const deckNames: DeckName = await ankiReq('deckNamesAndIds');
    await delay(1); // socket times out without this; investigate why later
    const deckStats: { [key: string]: DeckStats } = await ankiReq('getDeckStats', {
      decks: deckNames,
    });
    return combineDeckInfo(deckStats, deckNames);
  } catch (error) {
    console.log(error);
    throw new Error('Could not retrieve deck. Is Anki on?');
  }
};
