import { Component } from 'solid-js';
import { A } from '@solidjs/router';

const NotFoundPage: Component = () => {
  return (
    <main class='my-10 max-w-3xl mx-auto px-4'>
      <h1 class='text-3xl font-bold text-center mb-4'>Nothing found here</h1>

      <div class='max-w-max mx-auto'>
        <A href='/' class='text-blue-500 text-center hover:underline'>
          Go back home
        </A>
      </div>
    </main>
  );
};

export default NotFoundPage;
