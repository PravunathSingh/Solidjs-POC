import { NoteFormValues } from '../../components/modules/notes/NoteForm';
import { INote } from '../../types/entities';

const url = import.meta.env.VITE_API_URL;

export const getNotes = async (query?: string): Promise<INote[]> => {
  if (query) {
    const response = await fetch(`${url}/notes?q=${query}`);

    const data = await response.json();
    return data;
  } else {
    const response = await fetch(`${url}/notes`);

    const data = await response.json();
    return data;
  }
};

export const getNote = async (id: number): Promise<INote> => {
  const response = await fetch(`${url}/notes/${id}`);

  const data = await response.json();
  return data;
};

export const createNote = async (
  payload: NoteFormValues
): Promise<{ note: INote }> => {
  const response = await fetch(`${url}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
};

export const updateNote = async (payload: INote): Promise<INote> => {
  const response = await fetch(`${url}/notes/${payload.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
};

export const deleteNote = async (id: number): Promise<INote> => {
  const response = await fetch(`${url}/notes/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  return data;
};

export const disableNote = async (id: number): Promise<INote> => {
  const response = await fetch(`${url}/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isDisabled: true }),
  });

  const data = await response.json();
  return data;
};

export const enableNote = async (id: number): Promise<INote> => {
  const response = await fetch(`${url}/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isDisabled: false }),
  });

  const data = await response.json();
  return data;
};
