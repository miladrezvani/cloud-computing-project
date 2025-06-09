import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto">
      <div className="relative flex flex-col mb-96 bg-blue-gray-600 shadow-sm border border-blue-gray-200/75 rounded-lg">
        <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
          <span className="text-xl text-gray-200">About Us</span>
        </div>

        <div className="p-4">
          <h5 className="mb-2 text-gray-400 text-xl font-semibold">
            Welcome to IMDB
          </h5>
          <p className="text-gray-200 text-sm leading-normal font-light">
            IMDB is your ultimate destination for all things cinema. We're
            passionate about bringing movie lovers together to share, discover,
            and celebrate the magic of film. At IMDB, we believe that cinema has
            the power to inspire, entertain, and bring people together. Our goal
            is to create a vibrant community where film enthusiasts can connect,
            share their passion, and explore the vast world of movies. Whether
            you're a casual viewer or a dedicated cinephile, IMDB is designed to
            enhance your movie-watching experience. Join us in celebrating the
            art of film and connecting with fellow movie lovers from around the
            globe. Start your IMDB journey today by creating an account, rating
            your first movie, and connecting with friends. Let's make every
            viewing experience count!
          </p>
          <br />
          <p className="text-gray-200 text-sm leading-normal font-light">
            We appreciate your interest in our project. Please note that IMDB is
            a work in progress and part of our academic journey. We welcome
            feedback and suggestions as we continue to refine and improve our
            platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
