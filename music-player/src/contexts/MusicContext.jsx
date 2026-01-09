import { createContext, useState, useContext, useEffect } from "react";

export const MusicContext = createContext();

const songs = [
  {
    id: 1,
    title: "Sparks",
    artist: "Coldplay",
    url: "/songs/Coldplay - Sparks.wav",
    duration: "3:47",
  },
  {
    id: 2,
    title: "Yellow",
    artist: "Coldplay",
    url: "/songs/Coldplay - Yellow.wav",
    duration: "4:26",
  },
  {
    id: 3,
    title: "Die For You",
    artist: "Joji",
    url: "/songs/Joji - Die For You.wav",
    duration: "3:31",
  },
  {
    id: 4,
    title: "SLOW DANCING IN THE DARK",
    artist: "Joji",
    url: "/songs/Joji - SLOW DANCING IN THE DARK.wav",
    duration: "3:29",
  },
  {
    id: 5,
    title: "Line Without a Hook",
    artist: "Ricky Montgomery",
    url: "/songs/Ricky Montgomery - Line Without a Hook.wav",
    duration: "4:09",
  },
  {
    id: 6,
    title: "I Thought I Saw Your Face Today",
    artist: "She & Him",
    url: "/songs/She & Him - I Thought I Saw Your Face Today.wav",
    duration: "2:50",
  },
  {
    id: 7,
    title: "Love Like You",
    artist: "Steven Universe",
    url: "/songs/Steven Universe - Love Like You.wav",
    duration: "2:23",
  },
  {
    id: 8,
    title: "Freaks",
    artist: "Surf Curse",
    url: "/songs/Surf Curse - Freaks.wav",
    duration: "2:27",
  },
  {
    id: 9,
    title: "I Love You So",
    artist: "The Walters",
    url: "/songs/The Walters - I Love You So.wav",
    duration: "2:27",
  },
];

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState(songs);
  const [currentTrack, setCurrentTrack] = useState(songs[0]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const savedPlaylists = localStorage.getItem("musicPlayerPlaylist");
    if (savedPlaylists) {
      const playlists = JSON.parse(savedPlaylists);
      setPlaylists(playlists);
    }
  }, []);

  useEffect(() => {
    if (playlists.length > 0) {
      localStorage.setItem("musicPlayerPlaylist", JSON.stringify(playlists));
    }
  }, [playlists]);

  const handlePlaySong = (song, index) => {
    setCurrentTrack(song);
    setCurrentTrackIndex(index);
    setIsPlaying(false);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = (prev + 1) % allSongs.length;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => {
      const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
      setCurrentTrack(allSongs[nextIndex]);
      return nextIndex;
    });
    setIsPlaying(false);
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === undefined) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now,
      name: name,
      songs: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists((prev) =>
      prev.filter((playlist) => playlist.id !== playlistId)
    );
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id === playlistId) {
          return { ...playlist, songs: [...playlist.songs, song] };
        } else {
          return playlist;
        }
      })
    );
  };

  const play = () => {
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        handlePlaySong,
        currentTrack,
        setCurrentTime,
        currentTrackIndex,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume,
        createPlaylist,
        deletePlaylist,
        playlists,
        addSongToPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const contextValue = useContext(MusicContext);
  if (!contextValue) {
    throw new Error("useMusic needs to be inside of MusicProvider");
  }
  return contextValue;
};
