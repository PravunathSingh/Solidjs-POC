## Key concepts Solid JS:

- Signals: These are the cornerstone of solid's reactivity. They represent values which change over time and are responsible for updating the UI which they are binded to.
  `createSignal` is used to create a signal. It takes in an initial value and returns a getter and a setter function like so:

```tsx
const [count, setCount] = createSignal(0);
```

One point to note here is that the count is not the actual value of the count but the getter function which returns the signal.
This is how it is used

```tsx
<div>{count()}</div>
```

The setter function is used to update the value of the signal. This is how it is used:

```tsx
<button onClick={() => setCount(count() + 1)}>Increment</button>
```

or

```tsx
<button onClick={() => setCount((count) => count + 1)}>Increment</button>
```

- Effects: They are observers which are updated by change in signals. The effect reruns whenever the signal changes and is run only when the rendering has been completed. They are mostly used to schedule DOM updates
  `createEffect` is used to create an effect.
  This is how it is used:

```tsx
createEffect(() => {
  console.log('The count is now', count());
});
```

- Derived Signals: Although the view automatically changes whenever the signal updates, the component runs only once. We can also create a new function expression that depends on a signal by wrapping that signal in a function. This effectively converts the function into a derived signal. This is how it is done:

```tsx
const [count, setCount] = createSignal(0);
const doubleCount = () => count() * 2;

createEffect(() => {
  console.log('The count is now', doubleCount());
});
```

The derived signal themselves don't store any value but they'll update any effects that depend on them, and they'll trigger a rerender if included in a view.

- Memos: They are cached values that are updated only when the signals they depend on change. They are used to optimize the performance of the application. They are created using `createMemo`.
  Memos are observers and are a read only signal. Since they are aware of both their dependencies and their observers, they can ensure that they run only once for any change. This makes them preferable to registering effects that write to signals. Generally, what can be derived, should be derived. They are used like this:

```tsx
const [count, setCount] = createSignal(0);
const fib = createMemo(() => {
  if (count() < 2) return count();
  return fib(count() - 1) + fib(count() - 2);
});
```

- Show component: Although Solid's compiler can optimally handle ternaries and conditionals, the `show` component can be used to conditionally render a component. It takes in a boolean value and a component to render. This is how it is used:

The fallback prop acts as the else and will show when the condition passed to when is not truthy.

```tsx
<Show when={condition} fallback={<div>Not true</div>}>
  <div>True</div>
</Show>
```

- For component: This is used to loop over an array of objects. Whenever the array changes the `For` component updates or moves items in the DOM rather than recreating them.
  It takes in an `each` prop which is the array used to iterate. Now instead of directly rendering the elements between the `For` block, we pass a callback similar to the `map` method and then render our view inside of it. Please note that the second argument to the callback is the index of the element in the array and is a **signal**.

```tsx
<For each={array}>{(item, index) => <div>{item}</div>}</For>
```

NOTE: the `each` prop can take not only an array but any iterable item.

- Index component: This is used to create lists for primitive values like numbers and strings. The signature is same as that of the `For` component but the difference here is that, the second argument (index) is not a signal and is fixed.

```tsx
<Index each={array}>{(item, index) => <div>{item}</div>}</Index>
```

- Switch component: Modelled after the `switch/case` statement. Paired with the `Match` component it eliminates the need of a nested `Show` component, the `fallback` prop is used to render the default case.

```tsx
<Switch fallback={<div>Default</div>}>
  <Match when={condition1}>Case 1</Match>
  <Match when={condition2}>Case 2</Match>
</Switch>
```

- Dynamic component: Useful when we have to render from data. Eliminates the need for multiple `Switch` or `Show` component. We can either pass a string or a component function to it `component` prop and it will render that with the rest of the provided props.

```tsx
<Dynamic component={component} {...props} />
```

- Portals: Solid has a `portal` element whose child elements will be inserted at a location of our choosing. It render the elements inside of a div

- Error Boundary: The idea of this element is that any Javascript error occurring in the UI shouldn't break the app. Error boundaries catch the error, log them and display a fallback UI. This is how it is used:

```tsx
<ErrorBoundary fallback={(error) => error}>
  <Component /> // this component causes error
</ErrorBoundary>
```

- onMount: Although everything in Solid is based on reactivity and to run side effects we use `createEffect` but incase we want an effect to run only once when all the initial rendering is done, we use `onMount` which is a lifecycle hook. It takes in a callback function which is run only once when the component is mounted.

```tsx
onMount(() => {
  console.log('Mounted');
});
```

- onCleanup: This is another lifecycle hook which is run when the component is unmounted. It is used to clean up any side effects that we might have created. It takes in a callback function which is run when the component is unmounted. They can be called anywhere and are not necessarily called binded to an effect.

```tsx
onCleanup(() => {
  console.log('Unmounted');
});
```

- Style prop: Similar to how we use it react but with the key difference being keys take the dash-case form, like "background-color" rather than "backgroundColor", and that any units must be explicitly provided (e.g., width: 500px rather than width: 500).

```tsx
<div style={{ color: 'red', 'background-color': 'blue' }} />
```

- classList prop: Solid uses `class` to set the `className` property on an element. But in case we need to conditionally apply classes we can use `classList`. For example this

```tsx
<button
  class={current() === 'foo' ? 'selected' : ''}
  onClick={() => setCurrent('foo')}
>
  foo
</button>
```

can be written as

```tsx
<button
  classList={{ selected: current() === 'foo' }}
  onClick={() => setCurrent('foo')}
>
  foo
</button>
```

- Refs: We can get reference to elements using the `ref` prop. It takes in a callback function which is called with the element as the argument. This is how it is used:

```tsx
<input ref={(el) => (inputEl = el)} />
```

To use forward refs we use the `props.ref` prop. This is how it is used:

- Spreads: We can use the spread operator to spread props on elements. This is how it is used:

```tsx
const props = { id: 'foo', class: 'bar' };
<CustomComponent {...props} />;
```

- Splitting props: `splitProps` can be used to split the props into groups of props that are meant for different elements. This is how it is used:

```tsx
const [inputProps, buttonProps] = splitProps(props, ['value']);
```

Here the `inputProps` will contain the `value` prop and the `buttonProps` will contain the rest of the props.
This maintains the reactivity of the props

- children method: The `children` method both creates a memo around the children prop and resolves any nested child reactive references so that you can interact with the children directly.

- createStore: This is used to create a store and is helpful for achieving nested reactivity. It takes in an initial value and returns a getter and a setter function like so:

```tsx
const [state, setState] = createStore({ count: 0 });
```

But let's a more practical example. Let's say we have a todo store like this:

```tsx
const [todos, setTodos] = createStore([
  { id: 1, text: 'Learn Solid', done: true },
  { id: 2, text: 'Learn React', done: false },
]);

const addTodo = (text) =>
  setTodos([...todos(), { text, done: false, id: ++todoId }]);

// for toggling the todo to completed / not completed state
const toggleTodo = (id) => {
  setTodos(
    (todo) => todo.id === id,
    'done',
    (done) => !done
  );
};
```

NOTE: The getter returned from the `createStore` method is a **read-only** value and a _getter function_. Also the way we are using `setTodos` in the `toggleTodo` function is that we are using the **path syntax**, For `createStore` is imported from `solid-js/store` and not from `solid-js`. The path syntax is used to update nested values in the store. The first argument is the value to be updated, the second argument is the path to the value and the third argument is the function that will be used to update the value. The function will be called with the current value of the path and the return value will be used to update the value.
For detailed info visit this [link](<https://raqueebuddinaziz.com/blog/comprehensive-guide-to-solid-js-stores/#:~:text=Path%20Syntax%20%2D%20Simple%20Key%20Value%20Updates&text=In%20the%20simplest%20case%20you,setStore(key%2C%20newValue)%20.>)

- Mutations using `produce`: Generally using shallow immutable patterns for updating state is recommended, but in case one wants to use a simple direct mutation pattern, Solid provides a `produce` method which is similar to the `immer` library. It takes in a callback function which is called with the current value of the store and the return value is used to update the store. This is how it is used:

```tsx
const [todos, setTodos] = createStore([
  { id: 1, text: 'Learn Solid', done: true },
  { id: 2, text: 'Learn React', done: false },
]);

const addTodo = (text) =>
  setTodos(
    produce((todos) => {
      todos.push({ text, done: false, id: ++todoId });
    })
  );

// for toggling the todo to completed / not completed state
const toggleTodo = (id) => {
  setTodos(
    (todo) => todo.id === id,
    produce((todo) => (todo.completed = !todo.completed))
  );
};
```

- Batching updates: Solid's `batch` method allows you to batch related signal updates and then apply them all at once. This is how it is used:

```tsx
batch(() => {
  setCount(count() + 1);
  setCount(count() + 2);
});
```

- `on` method: This is used to set explicit dependencies for effects. It takes in a signal and a callback function. The callback function is called whenever the signal changes. In addition, `on` provides a `defer` option that allows the computation not to execute immediately and only run on first change. This is how it is used:

```tsx
createEffect(
  on(
    a,
    (a) => {
      console.log(a, b());
    },
    { defer: true }
  )
);
```

- Lazy components: Solid provides a `lazy` method which defers lazy loading. The output is a Component that can be used as normal in our JSX template. This is how it is used:

```tsx
const LazyComponent = lazy(() => import('./LazyComponent'));
```

- Resources: They are a special type of signal that can be used to manage async resources, their loading and error states. They are created using `createResource` method. It takes in two parameters, one the dependent signal and the fetch function. It returns a `value`, a `mutatorFn` and a `refetchFn` This is how it is used:

```tsx
con [user, { mutate, refetch }] = createResource(
   userId
  fetchUser
);
```

## Pros and Cons of using Solid in our workflow:

### Pros:

- Fine grained reactivity
- No new syntax to learn
- Simple APIs and concepts
- A lot of helper functions, components and methods to handle data flow, state management, side effects and data fetching
- Fast and small
- No global and local state BS, so no footguns while controlling state
- Great support for handling animations without much hassle

### Cons:

- Support for server side rendering, SolidStart is shit.
- The ecosystem is relatively small.
- Requires separate understanding of solid router.
- No proper and stable UI component library.
