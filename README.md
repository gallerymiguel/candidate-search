
# Candidate Search App

## Overview
This is a web application that allows users to search for GitHub profiles, filter them based on certain criteria, and save their favorite candidates. The app fetches data from the GitHub API and displays detailed information about candidates, including their avatar, name, email, company, bio, and location.

## Features
- **Search GitHub Profiles**: Search through GitHub profiles based on a specific query.
- **Filter Candidates**: Automatically filters profiles based on the presence of an email, location, and bio.
- **Save Candidates**: Save profiles that meet the criteria to a local storage.
- **Profile Details**: View detailed information about a candidate by clicking on their name.

## Tech Stack
- **React**: The frontend of the app is built using React.
- **TypeScript**: The app is written in TypeScript for type safety.
- **GitHub API**: Fetches data from the GitHub API to display profile information.
- **Local Storage**: Candidate profiles are saved locally in the browser.


## Deployed Application

You can view the live version of the application at [https://render.com/](https://candidate-search-kx1t.onrender.com/).


## Screenshots

![Screenshot](/02-Challenge/candidate-search/public/CandidateSearch.jpg) 

![Screenshot](/02-Challenge/candidate-search/public/SavedSearch.jpg)


## Installation

To run this project locally:

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The app should now be running at `http://localhost:5173/`.

## Usage

1. **Search**: Enter a username or keyword to search for GitHub profiles.
2. **Filter**: The app automatically filters profiles based on email, location, and bio.
3. **Save**: Click the "+" button to save a profile.
4. **View Details**: Click on a candidate's name to view more detailed information.

## API Rate Limiting

Please note that the GitHub API has rate limits. If you encounter a "403 Forbidden" error, the rate limit has been exceeded. You can try again after a reset period.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- GitHub API documentation for providing a rich set of data.
- React and TypeScript for making the development process smooth and efficient.
