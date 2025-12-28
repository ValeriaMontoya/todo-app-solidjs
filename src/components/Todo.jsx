import { Show } from 'solid-js';
import { DeleteIcon } from './Icons';

export function Todo(props) {
  return (
    <>
      <input
        type="checkbox"
        className="w-5 h-5 cursor-pointer accent-blue-500 hover:accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 rounded-md"
        checked={props.todo.completed}
        onChange={props.onInputChange}
      />
      <span
        className={`flex-1 ${
          props.todo.completed
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-gray-900 dark:text-gray-100'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 rounded-md`}
        onDblClick={(e) => {
          e.target.setAttribute('contenteditable', true);
          e.target.focus();
        }}
        onBlur={(e) => {
          e.target.setAttribute('contenteditable', false);
          props.onTextChange(e.target.textContent);
        }}
      >
        <Show when={props.todo.completed} fallback={props.children}>
          <s style="pointer-events: none">{props.children}</s>
        </Show>
      </span>
      <Show when={props.remove}>
        <button
          className="p-2 bg-red-500 dark:bg-red-600 text-white border-0 cursor-pointer rounded-md hover:bg-red-600 dark:hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
          onClick={props.onRemove}
        >
          <DeleteIcon />
        </button>
      </Show>
    </>
  );
}
