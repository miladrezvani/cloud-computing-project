import React from "react";
import Hero from "../components/Hero";
import MovieBars from "../components/MovieBars";

const HomePage = () => {
  return (
    <>
      <Hero />
      <MovieBars title={"New"} url={"/movies/new/"} />
      <MovieBars title={"Alphabetic"} url={"/movies/alphabetic/"} />
    </>
  );
};

export default HomePage;
