import { Note } from '../types';
import { delay } from '../util';
import { ankiReq } from './ankiClient';

interface AddCardArgs {
  front: string;
  back: string;
  deck: string;
  tags: string;
}
export const addCard = async (values: AddCardArgs): Promise<void> => {
  try {
    await ankiReq('addNote', {
      note: {
        deckName: values.deck,
        modelName: 'Basic',
        fields: {
          Front: values.front,
          Back: values.back,
        },
        options: {
          allowDuplicate: false,
          duplicateScope: 'deck',
          duplicateScopeOptions: {
            deckName: 'Default',
            checkChildren: false,
            checkAllModels: false,
          },
        },
        tags: values.tags.split(','),
      },
    });
  } catch (error) {
    throw new Error('Could not create new card');
  }
};

export const notesInfo = async (noteID: number): Promise<Note[] | undefined> => {
  try {
    return await ankiReq('notesInfo', {
      notes: [noteID],
    });
  } catch (error) {}
};

// TODO: update it to take query as arg
export const findNotes = async (query: string | undefined): Promise<Note[] | undefined> => {
  const defaultQuery = 'deck:_*';

  if (!query || query.trim().length == 0) {
    query = defaultQuery;
  }

  try {
    const noteIDs: number[] = await ankiReq('findNotes', {
      query: query,
    });
    await delay(2);
    const notesInfo: Note[] = await ankiReq('notesInfo', {
      notes: noteIDs,
    });
    return notesInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
