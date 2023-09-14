## Random Notes: Note taking app created as a POC for SolidJS

### Feature list

- [x] Create a note
- [x] Edit a note
- [x] Delete a note
- [x] List all notes
- [ ] Search notes
- [ ] Add tags to notes
- [ ] Filter notes by tags
- [x] Disable / enable notes
- [x] Toggle between disabled / enabled notes

### Tech Stack

- SolidJS
- TailwindCSS
- Auto Animate
- Modular forms
- Tanstack Solid Query
- Typescript
- Zod
- Solid Router
- JSON Server

### How to run

- Clone the repo
- Run `pnpm i`
- Run `pnpm run dev` for dev server and `pnpm run start:db` for starting json server

### Concepts used

- Signals `createSignal`
- Effects `createEffect`
- Suspense boundary `Suspense`
- For loops `For`
- Lazy loading `lazy`
- Dynamic imports `import`

### Using Solid Query

- `createQuery` for creating a query

```tsx
import { createQuery } from '@tanstack/solid-query';

export const useNotes = (query?: string) =>
  createQuery(
    () => ['notes', query],
    async () => {
      const notes = await getNotes(query);
      return notes;
    },
    {
      keepPreviousData: true,
    }
  );
```

Here `notes` is the key for the query and `query` is the parameter for the query. `getNotes` is the function that returns the data for the query. `keepPreviousData` is used to keep the previous data when the query is refetched.
One point to keep in mind, while coming from a react background is that even though we can we the below pattern for defining a query, it is not recommended since `queryKey` is not available in the latest version of Solid Query.

```tsx
export const useNotes = (query?: string) =>
  createQuery({
    queryKey: ['notes', query],
    queryFn: async () => {
      const notes = await getNotes(query);
      return notes;
    },
  });

// the above pattern is not recommended
```

- `createMutation` for creating a mutation and `useQueryClient` for getting the query client

```tsx
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (payload: NoteFormValues) => {
      const note = await createNote({
        ...payload,
      });

      return note;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
      },
    }
  );
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return createMutation(
    async (payload: INote) => {
      const note = await updateNote({
        ...payload,
        isDisabled: false,
      });

      return note;
    },
    {
      onSuccess: (note) => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note', note.id]);
      },
    }
  );
};
```

### Using Modular Forms

- `createForm` for creating a form

```tsx
const [, { Form, Field }] = createForm({
  initialValues: {
    title: '',
    description: '',
  },
});
```

For more details on how to use modular forms, please refer to the [documentation](https://modularforms.dev/solid/guides/introduction)

### Using Solid Router

- `Router` for creating a router provider, `Routes` for creating the routes stack and `Route` for creating a route

```tsx
import { Router, Routes, Route } from '@solidjs/router';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/notes/:id' element={<Note />} /> // id is the param and
        this will be a dynamic route
      </Routes>
    </Router>
  );
};
```

We can also use the `A` component for creating links

```tsx
import { A } from '@solidjs/router';

const Home = () => {
  return (
    <div>
      <A href='/notes'>Notes</A>
    </div>
  );
};
```

The `A` component has a prop called `activeClass` which can be used to add a class to the active link.
For more info on how to use Solid Router, please refer to the [documentation](https://docs.solidjs.com/guides/how-to-guides/routing-in-solid/solid-router)
