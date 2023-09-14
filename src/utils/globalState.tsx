import { createSignal, createRoot } from 'solid-js';
import { INote } from '../types/entities';

const globalState = () => {
  const [notesData, setNotesData] = createSignal<INote[]>([]);
  return {
    notesData,
    setNotesData,
  };
};

export default createRoot(globalState);
