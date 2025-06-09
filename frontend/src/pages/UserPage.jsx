import React from "react";
import MovieList from "../components/MovieList";
import FriendsList from "../components/FriendsList";
import UserCard from "../components/UserCard";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto grid grid-cols-1 gap-2 mt-2 sm:grid-cols-3">
      <div className="grid grid-rows-3 gap-2">
        <UserCard id={id} />
        <div className="row-span-2">
          <FriendsList id={id} />
        </div>
      </div>
      <div className="col-span-2">
        <MovieList id={id} />
      </div>
    </div>
  );
};

export default UserPage;
