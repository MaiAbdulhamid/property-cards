const Sort = ({ sortAscending, sortDescending, label }: any) => {
  return (
    <div>
      <p>{label}:</p>
      <div className="flex gap-5">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={sortAscending}
        >
          Asc
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={sortDescending}
        >
          Des
        </button>
      </div>
    </div>
  );
};

export default Sort;
