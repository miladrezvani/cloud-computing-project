import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { getData, getUserFriends, searchFriend } from "../service";
import { Link } from "react-router-dom";

const FriendsList = ({ id }) => {
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [pagenumber, setPagenumber] = useState(1);
  const [totalpage, setTotalpage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    var res = getUserFriends({ id });
    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      if (items.data.count != 0) {
        setTotalpage(Math.ceil(items.data.count / 7));
      }
    });
  }, [id]);

  const nextMovies = async () => {
    var url = "/user/" + id + "/getfriends/" + next.split("/")[7];
    var res = getData({ url });

    res.then((items) => {
      setData(items.data.results);
      setNext(items.data.next);
      setPrevious(items.data.previous);
      setPagenumber(pagenumber + 1);
    });
  };

  const previosMovies = async () => {
    var url = "/user/" + id + "/getfriends/" + previous.split("/")[7];
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
      <List>
        <Typography
          variant="h5"
          color="blue-gray"
          className="p-4 text-gray-200"
        >
          Friends
        </Typography>
        <div className="justify-center items-center grid grid-cols-3">
          <input
            className="col-span-2 bg-transparent placeholder:text-slate-400 text-gray-200 text-sm border border-slate-200 pl-1 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-blue-400 hover:border-blue-400 shadow-sm focus:shadow"
            placeholder="Search your friend"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <button
            className="bg-blue-700 py-2 px-4 border border-transparent text-center text-sm text-gray-200 transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={() => {
              const res = searchFriend({ search });

              res.then((items) => {
                setData(items.data.results);
              });
            }}
          >
            Search
          </button>
        </div>
        {data.map((items) => {
          return (
            <Link to={"/user/" + items.id}>
              <ListItem className="hover:bg-blue-gray-900">
                <div>
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    className="text-gray-200"
                  >
                    {items.username}
                  </Typography>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal text-gray-400"
                  >
                    {items.email}
                  </Typography>
                </div>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <div className="flex flex-row items-center gap-2 justify-center pb-2 absolute bottom-0 left-0 right-0">
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
          Page <strong className="text-gray-200">{pagenumber}</strong> of&nbsp;
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
    </Card>
  );
};

export default FriendsList;
