import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import { ThemeProvider } from "@material-tailwind/react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import SignupPage from "./pages/SignupPage";
import MoviesPage from "./pages/MoviesPage";
import MoviePage from "./pages/MoviePage";
import UserPage from "./pages/UserPage";
import CastPage from "./pages/CastPage";
import AboutUsPage from "./pages/AboutUsPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/movies/:id/cast/" element={<CastPage />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Route>
    )
  );
  return (
    <div className="min-h-screen bg-blue-gray-800">
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
};

export default App;
