import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

const Video = ({ media, width, height, muted, children }) => {
  const videoRef = useRef(null);
  console.log(media)

  useEffect(() => {
    let timeout = null;

    if (media) {
      timeout = setTimeout(() => {
        videoRef.current.srcObject = media;
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [media]);

  return (
    <video
      className="inline-block m-2 border-2 rounded-lg object-cover"
      height={height}
      width={width}
      muted={muted}
      autoPlay
      ref={videoRef}
    >
      {children}
    </video>
  );
};

Video.defaultProps = {
  children: null,
  height: 110,
  width: 160,
  muted: false,
  media: null,
};

Video.propTypes = {
  children: PropTypes.element,
  media: PropTypes.shape({
    active: PropTypes.bool,
    ended: PropTypes.bool,
    id: PropTypes.string,
  }),
  height: PropTypes.number,
  width: PropTypes.number,
  muted: PropTypes.bool,
};

export default Video;
