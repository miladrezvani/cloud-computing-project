import React, { useEffect, useState } from "react";
import Moviebox from "../components/Moviebox";
import { ButtonGroup, Button } from "@material-tailwind/react";
import { useSearchParams, Link } from "react-router-dom";
import { SearchMovieUser, getData } from "../service";

const MoviesPage = () => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [pagenumber, setPagenumber] = useState(1);
  const [totalpage, setTotalpage] = useState(0);
  const [filter, setFilter] = useSearchParams();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (filter.get("filter")) {
      const url = "/movies/" + filter.get("filter");
      var res = getData({ url });
    } else {
      const url = "/movies/";
      var res = getData({ url });
    }
    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      setPagenumber(1);
      setTotalpage(Math.ceil(items.data.count / 12));
    });
  }, [filter]);

  const nextPage = async () => {
    // console.log();
    if (filter.get("filter")) {
      const url = "/movies/" + filter.get("filter") + next.split("/")[6];
      var res = getData({ url });
    } else {
      const url = "/movies/" + next.split("/")[5];
      var res = getData({ url });
    }
    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      setPagenumber(pagenumber + 1);
    });
    console.log(res);
  };

  const previosPage = async () => {
    // console.log(previosPage)
    if (filter.get("filter")) {
      const url = "/movies/" + filter.get("filter") + previous.split("/")[6];
      var res = getData({ url });
    } else {
      const url = "/movies/" + previous.split("/")[5];
      var res = getData({ url });
    }
    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      setPagenumber(pagenumber - 1);
    });
  };

  return (
    <div>
      <div className="container mx-auto bg-blue-gray-900">
        <div className="w-full max-w-sm min-w-[200px] mb-4">
          <div className="relative flex flex-row items-center">
            <input
              className="w-96 bg-transparent placeholder:text-slate-400 text-gray-200 text-sm border border-slate-200 pl-1 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-400 hover:border-blue-400 shadow-sm focus:shadow"
              placeholder="The movie"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />

            <button
              className=" bg-blue-700 py-2 px-4 border border-transparent text-center text-sm text-gray-200 transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
              onClick={() => {
                const res = SearchMovieUser({ search });
                res.then((item) => {
                  setData(item.data.results);
                });
              }}
            >
              Search
            </button>
            <ButtonGroup className="ml-56">
              <Link to="?filter=highscore/">
                <Button
                  className="bg-neutral-900 w-40 hidden lg:block"
                  type="button"
                >
                  Highest Score
                </Button>
              </Link>
              <Link to="?filter=newmovies/">
                <Button
                  className="bg-neutral-900 w-40 hidden lg:block"
                  type="button"
                >
                  Recent
                </Button>
              </Link>
              <Link to="?filter=alphabeticorder/">
                <Button
                  className="bg-neutral-900 w-40 hidden lg:block"
                  type="button"
                >
                  Alphabetic
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-2 gap-2 bg-blue-gray-900 border border-x-4 border-y-8 border-blue-gray-900 sm:grid-cols-4">
        {data.map((item) => {
          return (
            <div key={item.id}>
              <Link to={`${item.id}`}>
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
      </div>
      <div className="container mx-auto justify-center flex items-center gap-8 pt-4">
        <button
          className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          value={previous}
          onClick={() => {
            previosPage();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-gray-500">
          Page <strong className="text-gray-200">{pagenumber}</strong> of&nbsp;
          <strong className="text-gray-200">{totalpage}</strong>
        </p>

        <button
          className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          value={next}
          onClick={() => {
            nextPage();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
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

export default MoviesPage;
