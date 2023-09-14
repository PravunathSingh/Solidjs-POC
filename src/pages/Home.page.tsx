import {
  Component,
  For,
  Show,
  Suspense,
  createEffect,
  createSignal,
} from 'solid-js';
import HomeHeader from '../components/modules/home/HomeHeader';
import { useNotes } from '../api/queries/notes.queries';
import { createAutoAnimate } from '@formkit/auto-animate/solid';
import NoteCard from '../components/modules/notes/NoteCard';
import { INote } from '../types/entities';

const HomePage: Component = () => {
  const notes = useNotes();
  const [showOnlyEnabled, setShowOnlyEnabled] = createSignal(false);
  const [notesData, setNotes] = createSignal<INote[]>([]);
  const [enabledNotes, setEnabledNotes] = createSignal<INote[]>([]);

  const [parent] = createAutoAnimate(/* optional config */);

  createEffect(() => {
    if (showOnlyEnabled()) {
      setNotes(enabledNotes());
    } else {
      setNotes(notes.data as INote[]);
    }
  });

  const toggleShowOnlyEnabled = () => {
    setShowOnlyEnabled(!showOnlyEnabled());

    setEnabledNotes((notes.data as INote[]).filter((note) => !note.isDisabled));
  };

  return (
    <main class='my-10 max-w-4xl mx-auto px-4'>
      <HomeHeader
        title='All Notes'
        showOnlyEnabled={showOnlyEnabled()}
        onToggleShowOnlyEnabled={toggleShowOnlyEnabled}
        onReset={() => setShowOnlyEnabled(false)}
      />

      <Suspense
        fallback={
          <div class='flex justify-center max-w-max mx-auto mt-6 items-center'>
            loading...
          </div>
        }
      >
        <div class='flex gap-4 mt-6 flex-wrap' ref={parent}>
          <For
            each={notesData()}
            fallback={
              <div class='flex justify-center max-w-max mx-auto mt-6 items-center'>
                <p>No notes found</p>
              </div>
            }
          >
            {(note) => <NoteCard note={note} />}
          </For>
        </div>
      </Suspense>
    </main>
  );
};

export default HomePage;
