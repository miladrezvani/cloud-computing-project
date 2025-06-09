import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const createUser = async ({
  first_name,
  last_name,
  username,
  email,
  password,
}) => {
  const res = await api.post("/user/signup/", {
    first_name: first_name,
    last_name: last_name,
    username: username,
    email: email,
    password: password,
  });
  return res;
};

export const loginUser = async ({ usernameORemail, password }) => {
  const res = await api.post("/user/login/", {
    usernameORemail: usernameORemail,
    password: password,
  });
  return res;
};

export const logoutUser = async () => {
  const res = await api.post("/user/logout/", {});
  return res;
};

export const getHero = async () => {
  const res = await api.get("/movies/hero/");
  return res;
};

export const getMovieInformation = async ({ id }) => {
  const res = await api.get("/movies/" + id + "/");
  return res;
};

export const getData = async ({ url }) => {
  const res = await api.get(url);
  return res;
};

export const postScore = async ({ id, currentscore }) => {
  const res = await api.post("/movies/setscore/", {
    movie_id: id,
    score: currentscore,
  });
  if (res.status == 200) {
    console.log("done");
  }
};

export const getMovieCast = async ({ url }) => {
  const res = await api.get(url);
  return res;
};

export const getWatchedMovies = async ({ id }) => {
  const res = await api.get("/movies/" + id + "/watched/");
  return res;
};

export const getUserbyID = async ({ id }) => {
  const res = await api.get("/user/" + id + "/");
  return res;
};

export const postFollow = async ({ id }) => {
  const res = await api.post("/user/" + id + "/addfriend/", {});
  return res;
};

export const getUserFriends = async ({ id }) => {
  const res = await api.get("/user/" + id + "/getfriends/");
  return res;
};

export const getUserID = async () => {
  const res = await api.post("/user/getuserid/", {});
  return res;
};

export const SearchMovieUser = async ({ search }) => {
  const res = await api.get("/movies/search/?search=" + search);
  return res;
};

export const getCast = async ({ id }) => {
  const res = await api.get("/movies/" + id + "/cast/");
  return res;
};

export const searchFriend = async ({ search }) => {
  const res = await api.post("/user/search/", {
    search: search,
  });
  return res;
};
