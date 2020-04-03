
# liri-node-app
LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

### How LIRI works?
Liri can do search based on your command. Liri can find your favorite artist upcoming concerts, information about the song that you like or movie that you want to watch.

- movie-this and movie's name, Liri will give you these information:
  - Title of the movie.
  - Year the movie came out.
  - IMDB Rating of the movie.
  - Rotten Tomatoes Rating of the movie.
  - Country where the movie was produced.
  - Language of the movie.
  - Plot of the movie.
  - Actors in the movie.

- spotify-this-song and song's name:
  - Artist(s)
  - The song's name
  - A preview link of the song from Spotify
  - The album that the song is from

- concert-this and artist's name
  - Name of the venue
  - Venue location
  - Date of the Event

- Or, do-what-it-says command to pull out the command from random.txt.

### How my code is built?

My app is using these API:
  - Node-Spotify-API
  - Axios
    - OMDB API
    - Bands In Town API
  - Moment
  - DotEnv

The structure is divided into 3 main parts:

- Require & Local Linked files section which required installation of several npm packages and links to local files.

- App engine that direct the command 
  - Switch Statement

- Command functions where APIs search is occur
  - getArtistInfo()
  - getMovieInfo()
  - getSongInfo()
  - doWhatItSays()

### Demo
[Demo Video](https://youtu.be/xv6gHpz46CU)

### Contact me 
Github: (https://github.com/thuynguyen-nht)
Email: thuynguyen.nht20@gmail.com
