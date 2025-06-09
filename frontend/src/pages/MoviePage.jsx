import { useEffect, useState } from "react";
import Moviebox from "../components/Moviebox";
import MovieBars from "../components/MovieBars";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Rating, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { getMovieInformation, postScore } from "../service";
import { StarIcon } from "@heroicons/react/20/solid";
import MovieBarsCast from "../components/MovieBarsCast";

const MoviePage = () => {
  const [data, setData] = useState("");
  const [rate, setRate] = useState(false);
  const [score, setScore] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const res = getMovieInformation({ id });
    res.then((item) => {
      console.log(item.data.genres);
      setData(item.data);
    });
  }, [id, rate]);

  return (
    <div className="container mx-auto bg-blue-gray-900">
      <Moviebox
        title={data.title}
        score={data.score}
        year={data.year}
        poster={data.poster}
      />
      <div
        className="grid grid-rows-1 border-dashed rounded-md border-2 border-slate-300 h-auto p-2 m-2 shadow-inner "
        key={data.id}
      >
        <h1 className="text-center text-5xl text-blue-700">synopsis</h1>
        <p className="border-t border-slate-200 mt-5 shadow-md"></p>

        <p className="text-start text-xl text-gray-300 p-2">{data.synopsis}</p>
        <button
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-36 mb-2 focus:outline-none focus:shadow-outline justify-center items-center mx-auto mt-5 sm:px-52"
          type="button"
          onClick={() => setRate(true)}
        >
          Rate
        </button>
      </div>
      <MovieBarsCast title={"cast"} url={`/movies/${id}/moviecast/`} />
      <MovieBars
        title={"similar Movies"}
        url={`/movies/${data ? data.genres.at(0) : "loading"}/`}
      />
      <Dialog open={rate} onClose={setRate} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:size-10">
                    <StarIcon className="text-blue-500" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Set Score
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please set your score based on the stars below. The
                        maximum score is 10, so each star is 2 points.
                      </p>
                      <Rating
                        className="mt-2"
                        unratedColor="blue"
                        value={score}
                        onChange={(e) => {
                          setScore(e);
                        }}
                        ratedColor="blue"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    var currentscore = score * 2;
                    postScore({ id, currentscore });
                    setRate(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                >
                  Save
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setRate(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MoviePage;
