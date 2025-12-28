export function TodoForm(props) {
  return (
    <>
      <input
        type="text"
        className="flex-1 px-4 py-3 mr-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 outline-none rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus-visible:bg-white dark:focus-visible:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        value={props.value}
        onInput={(e) => props.onInput(e.target.value)}
      />
      <button
        className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white border-0 cursor-pointer font-medium rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        onClick={props.onAdd}
      >
        Add
      </button>
    </>
  );
}
