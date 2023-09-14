import { INote } from '../../types/entities';
import {
  createQuery,
  useQueryClient,
  createMutation,
} from '@tanstack/solid-query';

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  disableNote,
  enableNote,
} from '../requests/notes.requests';
import { NoteFormValues } from '../../components/modules/notes/NoteForm';

export const useNotes = (query?: string) =>
  createQuery(
    () => ['notes', query],
    async () => {
      const notes = await getNotes(query);
      return notes;
    },
    {
      keepPreviousData: true,
    }
  );

export const useNote = (id: number) =>
  createQuery(
    () => ['note', id],
    async () => {
      const note = await getNote(id);
      return note;
    },
    {
      keepPreviousData: true,
    }
  );

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (payload: NoteFormValues) => {
      const note = await createNote({
        ...payload,
      });

      return note;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
      },
    }
  );
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (payload: INote) => {
      const note = await updateNote({
        ...payload,
        isDisabled: false,
      });

      return note;
    },
    {
      onSuccess: (note) => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note', note.id]);
      },
    }
  );
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (id: number) => {
      const note = await deleteNote(id);

      return note;
    },
    {
      onSuccess: (note) => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note', note.id]);
      },
    }
  );
};

export const useDisableNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (id: number) => {
      const note = await disableNote(id);

      return note;
    },
    {
      onSuccess: (note) => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note', note.id]);
      },
    }
  );
};

export const useEnableNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (id: number) => {
      const note = await enableNote(id);

      return note;
    },
    {
      onSuccess: (note) => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note', note.id]);
      },
    }
  );
};
