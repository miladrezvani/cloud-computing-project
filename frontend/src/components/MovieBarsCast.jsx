import React, { useEffect, useState } from "react";
import Moviebox from "./Moviebox";
import { Link } from "react-router-dom";
import { getData } from "../service";
import Castbox from "./Castbox";

const MovieBarsCast = ({ title, url }) => {
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
    url = url + next.split("/")[7];
    var res = getData({ url });
    console.log(res);

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
    });
  };

  const previosMovies = async () => {
    url = url + previous.split("/")[7];
    var res = getData({ url });

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
    });
  };

  return (
    <div>
      <h6 className=" container mx-auto text-gray-200 text-xl font-semibold pt-2 bg-blue-gray-900 text-center py-2">
        {title}
      </h6>
      <div className="container mx-auto relative grid grid-cols-2 gap-2 bg-blue-gray-900 border border-x-8 border-blue-gray-900 border-y-8 sm:grid-cols-4">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`/movies/${item.id}/cast/`}>
                <Castbox
                  name={item.realName}
                  character={item.character.map((e) => e.character).join(", ")}
                  profile={item.profileIMG}
                />
              </Link>
            </div>
          );
        })}
        <button
          className="bg-gradient-to-r from-blue-gray-800 absolute left-0 top-0 bottom-0 backdrop-blur-md border-r border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 focus:text-blue-700 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-blue-700 active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          value={previous}
          onClick={() => {
            previosMovies();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className="bg-gradient-to-l from-blue-gray-800 absolute right-0 top-0 bottom-0 backdrop-blur-md border-l border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-blue-700 hover:bg-slate-800 hover:border-blue-700 focus:text-blue-700 focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-blue-700 active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          value={next}
          onClick={() => {
            nextMovies();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieBarsCast;
