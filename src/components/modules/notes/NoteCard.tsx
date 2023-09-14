import { Component, Show } from 'solid-js';
import { INote } from '../../../types/entities';
import { A } from '@solidjs/router';
import {
  useDeleteNote,
  useDisableNote,
  useEnableNote,
} from '../../../api/queries/notes.queries';
import classNames from 'classnames';

export interface NoteCardProps {
  note: INote;
}

const NoteCard: Component<NoteCardProps> = (props) => {
  const deleteNote = useDeleteNote();

  const disableNote = useDisableNote();
  const enableNote = useEnableNote();

  const deleteNoteHandler = () => {
    deleteNote.mutate(props.note.id);
  };

  const disableNoteHandler = () => {
    disableNote.mutate(props.note.id);
  };

  const enableNoteHandler = () => {
    enableNote.mutate(props.note.id);
  };

  return (
    <div class='p-5 rounded-lg shadow-md border border-gray-200'>
      <div class='flex justify-between items-center gap-4 flex-wrap'>
        <h2 class='text-xl font-semibold'>{props.note.title}</h2>
        <A
          href={`/notes/${props.note.id}`}
          class='text-blue-500 text-sm hover:underline'
        >
          Edit
        </A>
      </div>
      <p class='text-gray-500'>{props.note.content}</p>
      <div>
        <Show
          when={props.note.isDisabled}
          fallback={
            <button
              onClick={disableNoteHandler}
              disabled={disableNote.isLoading}
              class={classNames(
                'px-2 py-1 text-xs rounded-md hover:cursor-pointer bg-gray-800 text-white mt-2',
                {
                  'opacity-50 cursor-not-allowed': disableNote.isLoading,
                }
              )}
            >
              Disable
            </button>
          }
        >
          <button
            onClick={enableNoteHandler}
            disabled={enableNote.isLoading}
            class={classNames(
              'px-2 py-1 text-xs rounded-md hover:cursor-pointer bg-green-500 text-white mt-2 ml-2',
              {
                'opacity-50 cursor-not-allowed': enableNote.isLoading,
              }
            )}
          >
            Enable
          </button>
        </Show>

        <button
          onClick={deleteNoteHandler}
          disabled={deleteNote.isLoading}
          class={classNames(
            'px-2 py-1 text-xs rounded-md hover:cursor-pointer bg-red-500 text-white mt-2 ml-2',
            {
              'opacity-50 cursor-not-allowed': deleteNote.isLoading,
            }
          )}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
