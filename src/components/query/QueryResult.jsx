import React from "react";
import { useAppStore } from "@/store/store";

const QueryResult = () => {
  const { queryResult } = useAppStore();

  if (!queryResult) {
    return <p className="text-center text-gray-500">No results found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {queryResult.map((item) => (
          <li key={item.farmHouseCode} className="border rounded p-4 shadow-md">
            <h3 className="text-lg font-bold">{item.farmName}</h3>
            <p>{item.state}</p>
            <p>₹ {item.farmBookingPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueryResult;
