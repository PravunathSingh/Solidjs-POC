import z from 'zod';
import {
  createForm,
  zodForm,
  SubmitHandler,
  reset,
} from '@modular-forms/solid';
import { Component, createEffect } from 'solid-js';
import { useParams } from '@solidjs/router';
import classNames from 'classnames';
import { INote } from '../../../types/entities';

const schema = z.object({
  title: z
    .string()
    .trim()
    .nonempty('Title is required')
    .min(3, 'Title must be at least 3 characters long')
    .max(50, 'Title must be at most 50 characters long'),
  content: z
    .string()
    .trim()
    .nonempty('Content is required')
    .min(3, 'Content must be at least 3 characters long')
    .max(100, 'Content must be at most 100 characters long'),
});

export type NoteFormValues = z.infer<typeof schema>;

export interface NoteFormProps {
  onSubmit?: (data: NoteFormValues) => void;
  isSubmitting?: boolean;
  noteId?: number;
  note?: INote;
}

const NoteForm: Component<NoteFormProps> = (props) => {
  const [form, { Form, Field }] = createForm<NoteFormValues>({
    validate: zodForm(schema),
  });

  createEffect(() => {
    if (props.note) {
      reset(form, {
        initialValues: {
          title: props.note.title,
          content: props.note.content,
        },
      });
    }
  });

  const handleSubmit: SubmitHandler<NoteFormValues> = (values) => {
    props?.onSubmit?.(values);
  };

  return (
    <div class='p-5 rounded-lg shadow-md border border-gray-200 my-6'>
      <Form onSubmit={handleSubmit}>
        <div class='flex flex-col gap-4'>
          <Field name='title'>
            {(field, props) => (
              <div class='mb-5'>
                <label class='block mb-2 font-medium text-gray-700'>
                  Title <span class='text-red-500'>*</span>
                </label>
                <input
                  {...props}
                  class='focus:ring-gray-900 focus:border-gray-900 block w-full px-4 py-2 border-gray-300 border rounded-md'
                  type='text'
                  required
                  value={field.value}
                />
                {field.error && (
                  <p class='mt-2 text-sm text-red-600'>{field.error}</p>
                )}
              </div>
            )}
          </Field>

          <Field name='content'>
            {(field, props) => (
              <div class='mb-5'>
                <label class='block mb-2 font-medium text-gray-700'>
                  Content <span class='text-red-500'>*</span>
                </label>
                <textarea
                  {...props}
                  class='focus:ring-gray-900 focus:border-gray-900 block w-full px-4 py-2 border-gray-300 border rounded-md'
                  required
                  value={field.value}
                />
                {field.error && (
                  <p class='mt-2 text-sm text-red-600'>{field.error}</p>
                )}
              </div>
            )}
          </Field>
        </div>

        <div class='mt-4 flex justify-end'>
          <button
            disabled={props.isSubmitting}
            type='submit'
            class={classNames(
              'px-4 py-2 rounded-md text-sm text-white font-medium bg-gray-800 hover:bg-gray-600 duration-300 transition-all',
              {
                'opacity-50 cursor-not-allowed': props.isSubmitting,
              }
            )}
          >
            {props.noteId ? 'Update' : 'Create'}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NoteForm;
