import { Component } from 'solid-js';
import NoteForm, { NoteFormValues } from '../components/modules/notes/NoteForm';
import { useNavigate, useParams } from '@solidjs/router';
import { useNote, useUpdateNote } from '../api/queries/notes.queries';

const NotesIdPage: Component = () => {
  const params = useParams();
  const navigate = useNavigate();

  const note = useNote(Number(params.id));
  const updateNote = useUpdateNote();

  const updateNoteHandler = (data: NoteFormValues) => {
    updateNote.mutate(
      {
        isDisabled: false,
        id: Number(params.id),
        ...data,
      },
      {
        onSuccess: () => {
          navigate('/', { replace: true });
        },
      }
    );
  };

  return (
    <main class='my-10 max-w-3xl mx-auto px-4'>
      <h1 class='text-3xl font-bold'>Edit Note</h1>

      <NoteForm
        note={note?.data}
        noteId={Number(params.id)}
        onSubmit={updateNoteHandler}
        isSubmitting={updateNote.isLoading}
      />
    </main>
  );
};

export default NotesIdPage;
