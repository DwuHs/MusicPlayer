import { useMusic } from "../hooks/useMusic"
import { useEffect, useRef } from "react";

export const MusicPlayer = () => {
    const {
        currentTrack, 
        currentTime, 
        formatTime, 
        duration, 
        setDuration, 
        setCurrentTime,
        nextTrack,
        prevTrack,
        play,
        pause,
        isPlaying,
    } = useMusic(); 
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;

        const handleLoadedMetaData = () => {
            setDuration(audio.duration);
        }

        const handleTimeUpdate = () => {

        }

        const handleEnded = () => {

        }

        audio.addEventListener("loadedmetadata", handleLoadedMetaData);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
        }
    }, [setDuration, setCurrentTime, currentTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.play().catch((err) => console.error(err));
        } else {
            audio.pause();
        };
    }, [isPlaying]);

    return (
        <div className="music-player">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous"/>

            <div className="track-info">
                <h3 className="track-title">{currentTrack.title}</h3>
                <p className="track-artist">{currentTrack.artist}</p>
            </div>

            <div className="progress-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration || 0} step="0.1" value={currentTime || 0} className="progress-bar" /*style={{}}*//>
                <span className="time">{formatTime(duration)}</span>
            </div>

            <div className="controls">
                <button className="control-btn" onClick={prevTrack}>⏮</button>
                <button className="control-btn play-btn" onClick={() => isPlaying ? pause() : play()}>{isPlaying ? "⏸" : "▶"}</button>
                <button className="control-btn" onClick={nextTrack}>⏭</button>
            </div>
        </div>
    )
}