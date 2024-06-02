import { Note } from "../types";
import { ankiReq } from "./ankiClient";
import apiClient from "./axios";

export const addCard = async (values: { front: string; back: string; deck: string; tags: string }): Promise<void> => {
  try {
    const response = await apiClient.post("", {
      action: "addNote",
      version: 6,
      params: {
        note: {
          deckName: values.deck,
          modelName: "Basic",
          fields: {
            Front: values.front,
            Back: values.back,
          },
          options: {
            allowDuplicate: false,
            duplicateScope: "deck",
            duplicateScopeOptions: {
              deckName: "Default",
              checkChildren: false,
              checkAllModels: false,
            },
          },
          tags: values.tags.split(","),
        },
      },
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const notesInfo = async (noteID: number): Promise<Note[] | undefined> => {
  try {
    return await ankiReq("notesInfo", {
      notes: [noteID],
    });
  } catch (error) {}
};

export const findNotes = async (deckName: string): Promise<number[] | any> => {
  try {
    return await ankiReq("findNotes", {
      query: `deck:${deckName}`,
    });
  } catch (error) {}
};
