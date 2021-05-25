import React, { useRef, useState } from "react";
import VidFooter from "../Footer";
import VidSidebar from "../SideNav";
import { useStyles } from "./Style";

export default function Index({
  share,
  url,
  comments,
  liked,
  song,
  description,
  channel,
}) {
  const classes = useStyles();
  const [vidState, setVidState] = useState(false);
  const vidRef = useRef(null);
  const VideoControl = () => {
    console.log(vidRef);
    if (vidState) {
      vidRef.current.pause();
      setVidState(false);
    } else {
      vidRef.current.play();
      setVidState(true);
    }
  };
  return (
    <div className={classes.video}>
      <video
        // controls
        loop
        autoPlay
        ref={vidRef}
        onClick={() => VideoControl()}
        className={classes.videoCard}
        src={url}
        // "https://v16-web.tiktok.com/video/tos/alisg/tos-alisg-pve-0037c001/438cd6add0934e5ca791a6dc249a0e0c/?a=1988&br=1866&bt=933&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1621696149&l=202105220908110101890651405B74EDA8&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=2&qs=0&rc=amV1OnJteW00NDMzPDczM0ApZDQzZDczNmQ0N2llZzkzOmdpbG1ibW0tazFgLS0uMTRzcy9iNF9iLi0tYzM1XzMtLTU6Yw%3D%3D&signature=27e26172df5d17e962732cd269a10638&tk=tt_webid_v2&vl=&vr="
      />
      <VidSidebar liked={liked} shared={share} comments={comments} />
      <VidFooter song={song} description={description} channel={channel} />
    </div>
  );
}
