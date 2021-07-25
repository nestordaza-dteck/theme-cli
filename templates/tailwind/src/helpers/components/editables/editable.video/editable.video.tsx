import React, { FC, useRef } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import "./editable.video.styles.scss";

interface EditableVideoComponent extends ReactPlayerProps {
  dataFor: "video" | "background-video";
  dataType: string;
}

/**
 * @description display any type of editable video.
 * @learn https://www.npmjs.com/package/react-player
 */
const EditableVideo: FC<EditableVideoComponent> = ({ ...rest }) => {
  const { dataFor, dataType, ...restPlayer } = rest;
  return (
    <div
      className="player-wrapper"
      onMouseEnter={(e) => {
        const iframe = e.currentTarget.querySelector(
          "iframe, .react-player__preview"
        );
        iframe?.setAttribute("data-for", dataFor);
        iframe?.setAttribute("data-type", dataType);
      }}
    >
      {rest.url ? (
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          {...restPlayer}
        />
      ) : typeof rest.light === "string" ? (
        <img
          className="editable-no__video"
          src={rest.light}
          alt="Video thumbnail"
        />
      ) : null}
    </div>
  );
};

export default EditableVideo;
