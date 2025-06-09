import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { getWatchedMovies, getData } from "../service";
import { StarIcon } from "@heroicons/react/20/solid";

const MovieList = ({ id }) => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [pagenumber, setPagenumber] = useState(1);
  const [totalpage, setTotalpage] = useState(1);

  useEffect(() => {
    var res = getWatchedMovies({ id });
    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      if (items.data.count != 0) {
        setTotalpage(Math.ceil(items.data.count / 10));
      }
    });
  }, [id]);

  const nextMovies = async () => {
    var url = "/movies/" + id + "/watched/" + next.split("/")[7];
    var res = getData({ url });
    console.log(res);

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      setPagenumber(pagenumber + 1);
    });
  };

  const previosMovies = async () => {
    var url = "/movies/" + id + "/watched/" + previous.split("/")[7];
    var res = getData({ url });

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      setPagenumber(pagenumber - 1);
    });
  };

  return (
    <Card className="bg-blue-gray-700 h-full">
      <CardBody>
        <div className="mb-4 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="text-gray-200">
            Movies Watched
          </Typography>
        </div>
        <div className="divide-y divide-gray-200 pb-10">
          {data.map((items) => (
            <div
              key={items.id}
              className="flex items-center justify-between pb-3 pt-3 last:pb-0"
            >
              <Link to={`/movies/${items.id}/`}>
                <div className="flex items-center gap-x-3">
                  <Avatar size="sm" src={items.poster} alt={items.title} />
                  <div>
                    <Typography
                      color="blue-gray"
                      variant="h6"
                      className=" text-gray-200"
                    >
                      {items.title}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-gray-400"
                    >
                      {items.genres} - {items.year}
                    </Typography>
                  </div>
                </div>
              </Link>
              <Typography
                color="blue-gray"
                variant="h6"
                className="text-gray-200"
              >
                <StarIcon />
                {items.user_score}.00
              </Typography>
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center gap-2 justify-center mb-2 absolute bottom-0 left-0 right-0">
          <button
            className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
            Page <strong className="text-gray-200">{pagenumber}</strong>{" "}
            of&nbsp;
            <strong className="text-gray-200">{totalpage}</strong>
          </p>

          <button
            className="rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-gray-200 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
      </CardBody>
    </Card>
  );
};

export default MovieList;
