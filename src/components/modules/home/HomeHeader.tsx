import classNames from 'classnames';
import { Component } from 'solid-js';

export interface HomeHeaderProps {
  title?: string;
  showOnlyEnabled?: boolean;
  onToggleShowOnlyEnabled?: () => void;
  onReset?: () => void;
}

const HomeHeader: Component<HomeHeaderProps> = (props) => {
  return (
    <header class='flex justify-between items-center gap-4'>
      <h1 class='text-2xl font-semibold'>{props.title}</h1>

      <div class='flex gap-4 items-center'>
        <button
          disabled={props.showOnlyEnabled}
          onClick={props.onToggleShowOnlyEnabled}
          class={classNames(
            'px-4 py-2 rounded-md text-white font-medium',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900',
            'bg-gray-900 hover:bg-gray-800',

            {
              'opacity-50 cursor-not-allowed': props.showOnlyEnabled,
            }
          )}
        >
          Show only enabled notes
        </button>

        <button
          disabled={!props.showOnlyEnabled}
          onClick={props.onReset}
          class={classNames(
            'px-4 py-2 rounded-md text-white font-medium',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900',
            'bg-gray-900 hover:bg-gray-800',

            {
              'opacity-50 cursor-not-allowed': !props.showOnlyEnabled,
            }
          )}
        >
          Reset
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;
