import { DeckStats } from "../types";
import { ankiReq } from "./ankiClient";
import apiClient from "./axios";
export const getDeckNames = async (): Promise<string[]> => {
  try {
    return await ankiReq("deckNames", null);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getDeckStats = async (deckNames: string[]): Promise<DeckStats[]> => {
  try {
    const response = await apiClient.get("", {
      data: {
        action: "getDeckStats",
        version: 6,
        params: {
          decks: deckNames,
        },
      },
    });
    const data = response.data;

    if (data.error) {
      console.error(data.error);
      return [];
    }
    return Object.values(data.result);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createDeck = async (deckName: string): Promise<void> => {
  try {
    await ankiReq("createDeck", { deck: deckName });
  } catch (error) {
    console.log("Could not create deck", error);
  }
};

export const deleteDeck = async (values: { deckName: string }): Promise<void> => {};
