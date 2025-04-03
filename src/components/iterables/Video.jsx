import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import playButton from "../../assets/img/play-button.png";
import { useModal } from '../../contexts/ModalContext';
import axios from "axios";

export default function Video({ video: { json_url, title, nasa_id, create_date, description, preview_image } }) {
  const { openModal } = useModal();
  const [state, setState] = useState({ showTruncatedText: true, videoUrl: "" });

  useEffect(() => {
    getVideoFile();
  }, []);

  const getVideoFile = async () => {
    await axios.get(json_url).then(({ data }) => {
      let videoUrl = data.filter(clip => {
        return (clip.substring(clip.length - 9) == '~orig.mp4' || clip.substring(clip.length - 11) == '~medium.mp4' || clip.substring(clip.length - 4) == '.mp4' || clip.substring(clip.length - 4) == '.mov');
      });
      setState({ ...state, videoUrl: videoUrl[0].replaceAll(' ', '%20') });
    }).catch(error => {
      console.log(error);
    });
  }

  const togglePostText = () => {
    setState({ ...state, showTruncatedText: !state.showTruncatedText });
  }

  const getVideoComponent = () => {
    return (
      <video id="video" width="840" height="auto" controls autoPlay>
        <source src={state.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video> 
    );
  }

  return (
    <div className="video-container">
      <div className="video-image-wrapper" onClick={() => openModal(getVideoComponent())}>
        <div 
          className="video-image-box" 
          style={{ backgroundImage: `url(${preview_image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}  
        >
        </div>
        <div className="video-overlay" style={{ backgroundImage: `url(${playButton})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} ></div>
      </div>

      <div className="video-text-box">
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
  );
}

Video.propTypes = {
  video: PropTypes.shape({
    json_url: PropTypes.string, 
    title: PropTypes.string, 
    nasa_id: PropTypes.string, 
    create_date: PropTypes.string, 
    description: PropTypes.string,
    preview_image: PropTypes.string
  }),
};