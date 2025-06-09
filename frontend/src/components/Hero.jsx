import React, { useEffect, useState } from "react";
import { getHero } from "../service";
import { Link } from "react-router-dom";

const Hero = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const res = getHero();
    console.log(res);
    res.then((items) => {
      setData(items.data.results);
    });
  }, []);

  return (
    <div className=" container mx-auto relative grid grid-cols-3 h-[35rem] items-end justify-center overflow-hidden bg-blue-gray-800 gap-2">
      <div
        className="relative row-span-3 inset-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center transition-transform duration-700 hover:scale-95 rounded-md border border-blue-gray-200/75"
        style={{
          backgroundImage: `url(${
            data.length == 0 ? "loading" : data[0].poster
          })`,
        }}
      >
        <Link to={data.length == 0 ? "Loading ..." : "/movies/" + data[0].id}>
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/75"></div>
          <div
            className="relative text-center items-center justify-center py-56"
            key={data.length == 0 ? "Loading ... " : data[0].id}
          >
            <h2 className="mb-6 text-3xl font-medium text-gray-200">
              {data.length == 0 ? "Loading ... " : data[0].title}
            </h2>
            <h5 className="mb-4 text-xl font-semibold text-gray-600">
              {data.length == 0 ? "Loading ... " : data[0].genres[0]}
            </h5>
          </div>
        </Link>
      </div>
      <div
        className="relative col-span-2 inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center transition-transform duration-700 hover:scale-95  rounded-md border border-blue-gray-200/75"
        style={{
          backgroundImage: `url(${
            data.length == 0 ? "loading" : data[1].poster
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Link to={data.length == 0 ? "Loading ..." : "/movies/" + data[1].id}>
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/75"></div>
          <div
            className="relative text-center items-center justify-center py-24"
            key={data.length == 0 ? "Loading ..." : data[1].id}
          >
            <h2 className="mb-6 text-3xl font-medium text-gray-200">
              {data.length == 0 ? "Loading ... " : data[1].title}
            </h2>
            <h5 className="mb-4 text-xl font-semibold text-gray-600">
              {data.length == 0 ? "Loading ... " : data[1].genres[0]}
            </h5>
          </div>
        </Link>
      </div>
      <div
        className="relative col-start-2 inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-cover bg-center transition-transform duration-700 hover:scale-95  rounded-md border border-blue-gray-200/75"
        style={{
          backgroundImage: `url(${
            data.length == 0 ? "loading" : data[2].poster
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Link to={data.length == 0 ? "Loading ..." : "/movies/" + data[2].id}>
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/75"></div>
          <div
            className="relative text-center items-center justify-center py-24"
            key={data.length == 0 ? "Loading ..." : data[2].id}
          >
            <h2 className="mb-6 text-3xl font-medium text-gray-200">
              {data.length == 0 ? "Loading ... " : data[2].title}
            </h2>
            <h5 className="mb-4 text-xl font-semibold text-gray-600">
              {data.length == 0 ? "Loading ... " : data[2].genres[0]}
            </h5>
          </div>
        </Link>
      </div>
      <div
        className="relative inset-0 m-0 h-full w-full  bg-transparent bg-cover bg-center overflow-hidden transition-transform duration-700 hover:scale-95  rounded-md border border-blue-gray-200/75"
        style={{
          backgroundImage: `url(${
            data.length == 0 ? "loading" : data[3].poster
          })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Link to={data.length == 0 ? "Loading ..." : "/movies/" + data[3].id}>
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/75"></div>
          <div
            className="relative text-center items-center justify-center py-24"
            key={data.length == 0 ? "Loading ..." : data[3].id}
          >
            <h2 className="mb-6 text-3xl font-medium text-gray-200">
              {data.length == 0 ? "Loading ... " : data[3].title}
            </h2>
            <h5 className="mb-4 text-xl font-semibold text-gray-600">
              {data.length == 0 ? "Loading ... " : data[3].genres[0]}
            </h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
