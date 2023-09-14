import { Component, createMemo } from 'solid-js';
import classnames from 'classnames';
import { A } from '@solidjs/router';

const Navbar: Component = () => {
  // logo will be image from picsum photos
  const logo = createMemo(() => 'https://picsum.photos/300/300');

  const navLinks = createMemo(() => [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Add Note',
      href: '/add-note',
    },
  ]);

  return (
    <nav class='bg-gray-800'>
      <div class='max-w-4xl py-4 mx-auto flex items-center gap-8 px-4'>
        <div>
          <A href='/'>
            <img src={logo()} alt='' class='rounded-full h-12 w-auto' />
          </A>
        </div>
        <div>
          {navLinks().map((link) => (
            <A
              href={link.href}
              class={classnames(
                'text-white hover:text-gray-300 ml-4 px-3 py-2 rounded'
              )}
              activeClass='bg-gray-900'
              end
            >
              {link.name}
            </A>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
