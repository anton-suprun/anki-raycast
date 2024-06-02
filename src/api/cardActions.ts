import { Card } from "../types";
import { ankiReq } from "./ankiClient";

export const cardInfo = async (cardID: number): Promise<Card[] | undefined> => {
  try {
    return await ankiReq("cardsInfo", {
      cards: [cardID],
    });
  } catch (error) {}
};

export const findCards = async (deckName: string): Promise<number[] | any> => {
  try {
    return await ankiReq("findCards", {
      query: `deck:"*${deckName}"`, // TODO: figure out the correct format to pass query search string
    });
  } catch (error) {}
};
