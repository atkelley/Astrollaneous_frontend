import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function Audio({ audio: { json_url, title, nasa_id, create_date, description } }) {
  const [state, setState] = useState({
    showTruncatedText: true,
    audioUrl: ''
  });

  useEffect(() => {
    getAudioFile();
  }, []);

  const getAudioFile = async () => {
    await axios.get(json_url).then(({ data }) => {
      let audioUrl = data.filter(clip => {
        return (clip.substring(clip.length - 9) == '~orig.mp3' || clip.substring(clip.length - 4) == '.mp3');
      });
      setState({ ...state, audioUrl: audioUrl[0].replaceAll(' ', '%20') });
    }).catch(error => {
      console.log(error);
    });     
  }

  const togglePostText = () => {
    setState({ ...state, showTruncatedText: !state.showTruncatedText });
  }

  return (
    <div className="audio-container">
      <audio controls src={state.audioUrl} type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>

      <div className="audio-text-box">
        <p className="title">Title: {title || nasa_id}</p>
        <p className="date">Date Created: { create_date }</p>
        {state.showTruncatedText ?
          <> 
            {description.length > 200 ? (
              <>
                <p className="description">{description.substring(0, 200) + "..."}</p>
                <span className="toggle-click" onClick={togglePostText}>Show More</span>
              </>
            ) : (
              <p className="description">{description}</p>
            )}            
          </>
        :
          <>
            <p className="description">{description}</p>
            <span className="toggle-click" onClick={togglePostText}>Show Less</span>
          </>
        }
      </div>
    </div>
  )
}

Audio.propTypes = {
  audio: PropTypes.shape({
    json_url: PropTypes.string, 
    title: PropTypes.string, 
    nasa_id: PropTypes.string, 
    create_date: PropTypes.string, 
    description: PropTypes.string
  })
};