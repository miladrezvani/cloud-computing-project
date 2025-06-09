import React, { useEffect, useState } from "react";
import Moviebox from "./Moviebox";
import { Link } from "react-router-dom";
import { getData } from "../service";

const MovieBars = ({ title, url }) => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    var res = getData({ url });
    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
    });
  }, [url]);

  const nextMovies = async () => {
    url = url + next.split("/")[6];
    var res = getData({ url });
    console.log(res);

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
    });
  };

  const previosMovies = async () => {
    url = url + previous.split("/")[6];
    var res = getData({ url });

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
    });
  };

  return (
    <div>
      <h6 className=" container mx-auto text-gray-200 text-xl font-semibold pt-2 bg-blue-gray-800 text-center py-2">
        {title}
      </h6>
      <div className="container mx-auto rounded-md relative grid grid-cols-2 gap-2 bg-blue-gray-900 border border-x-8 border-blue-gray-900 border-y-8 sm:grid-cols-4">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/movies/${item.id}`}>
                <Moviebox
                  title={item.title}
                  poster={item.poster}
                  score={item.score}
                  year={item.year}
                />
              </Link>
            </div>
          );
        })}
        <button
          className="bg-gradient-to-r  from-blue-gray-800 absolute left-0 top-0 bottom-0 backdrop-blur-md  border-r border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 focus:text-blue-700 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-blue-700 active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          value={previous}
          onClick={() => {
            previosMovies();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          className="bg-gradient-to-l from-blue-gray-800 absolute right-0 top-0 bottom-0 backdrop-blur-md  border-l border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 focus:text-blue-700 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-blue-700 active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          value={next}
          onClick={() => {
            nextMovies();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieBars;
