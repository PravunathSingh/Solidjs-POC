import classNames from 'classnames';
import { Component } from 'solid-js';

export interface SpinnerProps {
  h?: number;
  w?: number;
}

const Spinner: Component<SpinnerProps> = (props) => {
  return (
    <div class='flex justify-center mt-6 items-center'>
      <div
        class={classNames(
          'animate-spin rounded-full',
          'border-t-2 border-b-2 border-gray-900',
          {
            [`h-${props.h}`]: props.h,
            [`w-${props.w}`]: props.w,
          }
        )}
      ></div>
    </div>
  );
};

export default Spinner;
