import React from "react";

const CastDetail = ({ realName, biography, age }) => {
  return (
    <div className="relative flex flex-col my-6 bg-blue-gray-700 shadow-sm border border-blue-gray-200/75 rounded-lg mb-4">
      <div className="mx-3 mb-0 border-b border-gray-200 pt-3 pb-2 px-1">
        <span className="text-sm font-medium text-gray-200">{realName}</span>
      </div>

      <div className="p-4">
        <h5 className="mb-2 text-gray-200 text-xl font-semibold">Biography</h5>
        <p className="text-gray-400 leading-normal font-light">{biography}</p>
      </div>
      <div className="mx-3 border-t border-gray-200 pb-3 pt-2 px-1">
        <span className="text-sm text-gray-400 font-medium">Age: {age}</span>
      </div>
    </div>
  );
};

export default CastDetail;
