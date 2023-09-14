import { Component } from 'solid-js';
import NoteForm, { NoteFormValues } from '../components/modules/notes/NoteForm';
import { useCreateNote } from '../api/queries/notes.queries';
import { useNavigate } from '@solidjs/router';

const AddNotePage: Component = () => {
  const navigate = useNavigate();
  const createNote = useCreateNote();

  const createNoteHandler = (data: NoteFormValues) => {
    createNote.mutate(data, {
      onSuccess: () => {
        navigate('/', { replace: true });
      },
    });
  };

  return (
    <main class='my-10 max-w-3xl mx-auto px-4'>
      <h1 class='text-3xl font-bold'>Add Note</h1>

      <NoteForm
        onSubmit={createNoteHandler}
        isSubmitting={createNote.isLoading}
      />
    </main>
  );
};

export default AddNotePage;
