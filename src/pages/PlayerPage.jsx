import MusicNote from "../assets/images/music_note.png";

export const PlayerPage = () => {
  return (
    <div className="player-page">
      <img src={MusicNote} alt="" className="music-note-img" />
      <h2>Waiting for next song...</h2>
    </div>
  );
};
