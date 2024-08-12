import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await axios(
        `http://localhost:5000/scraper?url=${encodeURIComponent(url)}`
      );
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Web Scraper</h1>
      <div className="mb-4 flex items-center justify-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={fetchData}
          className={`bg-brand text-white px-4 py-2 rounded ml-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Scrape!"}
        </button>
      </div>
      <ul>
        {data.map((item, index) => (
          <li
            key={index}
            className="list-disc mb-1 p-2 border-b border-gray-200 hover:bg-gray-100"
          >
            <strong>{item.text}</strong> -
            <a
              href={item.href}
              className="text-blue-500 hover:text-blue-700 break-all"
            >
              {item.href}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
