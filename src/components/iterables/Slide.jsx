import { useEffect, useState } from "react";
import { useModal } from '../../contexts/ModalContext';
import PropTypes from "prop-types";
import Image from "./Image";
import axios from "axios";

export default function Slide({ index, total, image: { json_url, author, title, description, preview_image }, handleNextSlide }) {
  const [state, setState] = useState({ showTruncatedText: true, imageUrl: '' });
  const { openModal } = useModal();

  useEffect(() => {
    getImageFile(json_url);
  }, [json_url]);

  const getImageFile = async (url) => {
    await axios.get(url).then(({ data }) => {
      let imageUrl = data.filter(clip => {
        return (clip.substring(clip.length - 9) == '~orig.jpg' || clip.substring(clip.length - 10) == '~large.jpg' || clip.substring(clip.length - 11) == '~medium.jpg' || clip.substring(clip.length - 4) == '.jpg');
      });

      setState({ showTruncatedText: true, imageUrl: imageUrl[0].replaceAll(' ', '%20') });
    }).catch(error => console.log(error));
  }
  
  const togglePostText = () => {
    setState({ ...state, showTruncatedText: !state.showTruncatedText });
  }

  const fetchNextSlide = (num) => {
    setState({ ...state, showTruncatedText: true })
    handleNextSlide(num);
  }

  return (
    <div className="images" value={index}>
      <div className="images-content">
        <div className="images-counter">{index + 1} / {total}</div>
        <img src={preview_image} alt={title} onClick={() => openModal(<Image data={{ src: state.imageUrl, alt: title, caption: `${author ? author : title} © 2025` }} />)} />
        <span className="prev" onClick={() => fetchNextSlide(-1)}>&#10094;</span>
        <span className="next" onClick={() => fetchNextSlide(1)}>&#10095;</span> 
      </div>
      <div className="images-text">
        {(state.showTruncatedText && description.length > 150) ? description.substring(0, 150) + "... " : description}
        {description.length > 150 && <span className="toggle-click" onClick={togglePostText}> Show {state.showTruncatedText ? "More" : "Less"}</span>}
      </div>
    </div>
  )
}

Slide.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number,
  image: PropTypes.shape({
    json_url: PropTypes.string, 
    author: PropTypes.string,
    title: PropTypes.string,  
    description: PropTypes.string,
    preview_image: PropTypes.string
  }),
  handleNextSlide: PropTypes.func
};