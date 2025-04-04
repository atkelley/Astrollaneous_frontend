import PropTypes from "prop-types";

export default function Youtube({ src }) {

  return (
    <video id="video" width="840" height="auto" controls autoPlay>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video> 
  );
}

Youtube.propTypes = {
  src: PropTypes.string
};