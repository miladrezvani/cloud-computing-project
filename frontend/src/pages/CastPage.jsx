import React, { useEffect, useState } from "react";
import CastDetail from "../components/CastDetail";
import { getCast } from "../service";
import { useParams } from "react-router-dom";
import MovieBars from "../components/MovieBars";

const CastPage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    var res = getCast({ id });
    res.then((items) => {
      setData(items.data);
    });
  }, [id]);

  return (
    <div className="container mx-auto">
      <CastDetail
        realName={data.realName}
        biography={data.biography}
        age={data.age}
      />
      <MovieBars
        title={"Movies played"}
        url={`/movies/${id}/castmoviesplayed/`}
      />
    </div>
  );
};

export default CastPage;
