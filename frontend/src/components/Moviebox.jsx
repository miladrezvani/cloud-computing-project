import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const Moviebox = ({ title, poster, score, year }) => {
  return (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible hover:text-blue-700">
      <figure className="relative w-full h-96">
        <img
          className="object-cover object-center w-full h-full  rounded-md"
          src={poster}
        />
        <figcaption className="absolute bottom-8 rounded-md left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
          <div>
            <h5 className="text-xl font-medium text-slate-800 py-2 px-1">
              {title}
            </h5>
            <p className="mt-2 text-slate-600">{year}</p>
          </div>
          <h5 className="text-2xl font-medium text-slate-800">
            {Number(score).toFixed(2)}
            <StarIcon />
          </h5>
        </figcaption>
      </figure>
    </div>
  );
};

export default Moviebox;
