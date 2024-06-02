import apiClient from "./axios";
const VERSION = 6;
type AnkiAction =
  | "addNote"
  | "deckNames"
  | "createDeck"
  | "getDeckStats"
  | "cardsInfo"
  | "findCards"
  | "notesInfo"
  | "findNotes";

export const ankiReq = async (action: AnkiAction, params: any): Promise<any> => {
  const response = await apiClient.post("", {
    action: action,
    version: VERSION,
    params: params ? params : undefined,
  });
  const data = response.data;
  if (!data.error) return data.result;
  throw Error(`Could not perform action ${action}. Error: ${data.error}`);
};
