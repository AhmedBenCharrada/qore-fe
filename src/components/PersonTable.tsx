import { useState, useEffect } from "react";
import { Person } from "../types";
import getPersons from "../actions/getPersons";
import { toast } from "react-toastify";

function PersonTable() {
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<Person[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    loadData(page, pageSize);
  }, [page, pageSize]);

  const loadData = async (page: number, limit: number) => {
    try {
      const persons = await getPersons(page, limit);
      setItems(persons);
    } catch (e: any) {
      const err = e?.response?.data?.message ?? "failed to load  the data";
      toast.error(err);
      setError(err);
    } finally {
      setIsLoaded(true);
    }
  };

  const changePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(event.target.value) || 10);
  };

  const nextPage = () => {
    setPage((p) => p + 1);
  };

  const prevPage = () => {
    if (page === 0) {
      return;
    }
    setPage((p) => p - 1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibod capitalize">Persons table</h1>
      <div className="mt-8 rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr
                key={p.id}
                className={` hover:cursor-pointer ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="w-12 p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {p.id}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {p.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                  {p.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full h-24 pt-8 justify-between items-center">
        <div>page: {page + 1}</div>
        <div className="flex items-stretch gap-4 w-64 h-12">
          <button
            className="flex-1 bg-zinc-200 hover:bg-zinc-300 focus:ring-4 focus:outline-none focus:ring-zinc-50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={prevPage}
          >
            Prev
          </button>
          <select
            className="flex-2 rounded-lg w-full p-2.5"
            onChange={changePageSize}
            value={`${pageSize}`}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <button
            className="flex-1 bg-zinc-200 hover:bg-zinc-300 focus:ring-4 focus:outline-none focus:ring-zinc-50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonTable;
