import React, { useEffect, useState } from "react";
import { getUserbyID, postFollow } from "../service";

const UserCard = ({ id }) => {
  const [data, setData] = useState();
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    var res = getUserbyID({ id });
    res.then((items) => {
      setData(items.data);
      setFollow(false);
    });
  }, [id]);

  return (
    <div className="bg-blue-gray-900 max-w-2xl shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-200">User</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-400">
          Details and informations
        </p>
      </div>
      <div className="bg-blue-gray-700">
        <dl>
          <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Full name</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              {data == undefined
                ? "Loading ..."
                : `${data.first_name} - ${data.last_name}`}
            </dd>
          </div>
          <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Username</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              {data == undefined ? "Loading ..." : data.username}
            </dd>
          </div>
          <div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-400">Email</dt>
            <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
              {data == undefined ? "Loading ..." : data.email}
            </dd>
          </div>
          <button
            className="bg-blue-700 hover:bg-blue-500 text-white text-center font-bold py-2 px-48 mb-2 focus:outline-none focus:shadow-outline justify-center items-center mx-auto mt-5"
            type="button"
            value={follow}
            onClick={() => {
              setFollow(!follow);
              postFollow({ id });
            }}
          >
            {follow == true ? "Unfollow" : "Follow"}
          </button>
        </dl>
      </div>
    </div>
  );
};

export default UserCard;
