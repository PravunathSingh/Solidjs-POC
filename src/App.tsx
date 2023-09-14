import { Component, lazy } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query';

import Navbar from './components/layout/Navbar';

const HomePage = lazy(() => import('./pages/Home.page'));
const AddNotePage = lazy(() => import('./pages/AddNote.page'));
const NotFoundPage = lazy(() => import('./pages/404.page'));
const NotesIdPage = lazy(() => import('./pages/NotesId.page'));

const queryClient = new QueryClient();

const App: Component = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/add-note' element={<AddNotePage />} />
          <Route path='/notes/:id' element={<NotesIdPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
