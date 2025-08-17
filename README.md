# IMDB

This project is a web application similar to IMDB, where users can score movies they have watched on a scale from 0 to 10. Users can also view new movie releases and sort them alphabetically or by year of release.

## Features

- **User Authentication**: Users can sign up and log in to their accounts.
- **Movie Scoring**: Users can rate movies from 0 to 10.
- **Movie Browsing**: View all new movie releases and sort them by title or release year.
- **Friend Following**: Users can follow their friends and see the scores and movies they have watched.
- **Backend**: Built with Django, handling user authentication and movie scoring functionalities.
- **Docker Support**: Each service has its own Docker files for easy deployment.

## Project Structure

The project is organized into several folders, each containing the necessary files for different components:

- **/backend**: Contains the Django backend server files, including user login, signup, and scoring functionalities.
- **/frontend**: Contains the React frontend application.
- **/deployment**: Contains deployment configurations for various services.

## Services Used

This project utilizes the following services:

- **Django**: Backend framework for handling user authentication and movie scoring.
- **React**: Frontend framework for building the user interface.
- **MySQL**: Database for storing user and movie data.
- **Redis**: In-memory data structure store, used for caching.
- **Adminer**: A database management tool for MySQL.
