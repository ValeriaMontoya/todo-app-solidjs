import { createSignal, createEffect, createMemo, For, Show } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { ThemeToggle } from './components/ThemeToggle';
import { TodoForm } from './components/TodoForm';
import { Todo } from './components/Todo';

function App() {
  const todosLS = JSON.parse(window.localStorage.getItem('todos'));
  const [todos, setTodos] = createStore(
    todosLS ?? [
      { text: '5 min read 📖', completed: true },
      { text: 'Inbox sweep 📧', completed: false },
      { text: 'Water plant 🌱', completed: false },
    ]
  );

  const [newItem, setNewItem] = createSignal('');

  function addTodo() {
    if (newItem()) {
      setTodos(
        produce((todos) => todos.push({ text: newItem(), completed: false }))
      );
      setNewItem('');
    }
  }

  function removeTodo(index) {
    setTodos(produce((todos) => todos.splice(index, 1)));
  }

  const completedCount = createMemo(() => todos.filter((todo) => todo.completed).length);

  createEffect(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  });

  return (
    <>
      <div className="w-full h-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeToggle />

        <div className="w-full max-w-lg px-6 py-8">
          <h1 className="text-4xl font-light text-center mb-12 text-gray-900 dark:text-gray-100">
            Solid Todo App
          </h1>

          <div className="flex gap-2 mb-8">
            <TodoForm value={newItem()} onInput={setNewItem} onAdd={addTodo} />
          </div>

          <h2 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            To do
          </h2>
          <ul className="bg-gray-50 dark:bg-gray-800 rounded-md mb-8">
            <For
              each={todos}
              fallback={
                <li className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No todos yet!
                </li>
              }
            >
              {(todo, index) => (
                <Show when={!todo.completed}>
                  <li className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <Todo
                      todo={todo}
                      index={index()}
                      remove={false}
                      onInputChange={() => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].completed =
                              !todos[index()].completed;
                          })
                        );
                      }}
                      onTextChange={(text) => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].text = text;
                          })
                        );
                      }}
                    >
                      {todo.text}
                    </Todo>
                  </li>
                </Show>
              )}
            </For>
          </ul>
          
          <h2 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Completed
          </h2>
          <ul className="bg-gray-50 dark:bg-gray-800 rounded-md mb-8">
            <For
              each={todos}
              fallback={
                <li className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No completed tasks yet!
                </li>
              }
            >
              {(todo, index) => (
                <Show when={todo.completed}>
                  <li className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <Todo
                      todo={todo}
                      index={index()}
                      remove={true}
                      onInputChange={() => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].completed =
                              !todos[index()].completed;
                          })
                        );
                      }}
                      onTextChange={(text) => {
                        setTodos(
                          produce((todos) => {
                            todos[index()].text = text;
                          })
                        );
                      }}
                      onRemove={() => removeTodo(index())}
                    >
                      {todo.text}
                    </Todo>
                  </li>
                </Show>
              )}
            </For>
          </ul>

          <p className="text-sm mt-8 text-center text-gray-500 dark:text-gray-400">
            Completed: {completedCount()} out of {todos.length}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
