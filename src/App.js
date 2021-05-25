import Video from "./Video";
import { useStyles } from "./materialStyle";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <div className={classes.appVid}>
        <Video
          url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          song="Smells Like Teen Spirit - Nirvana"
          description="new post on tictok #foryou"
          channel="helina"
          liked={2300}
          shared={230}
          comments={90}
        />
        <Video
          url="https://v16-web.tiktok.com/video/tos/alisg/tos-alisg-pve-0037c001/438cd6add0934e5ca791a6dc249a0e0c/?a=1988&br=1866&bt=933&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&expire=1621966056&l=202105251206380101890730450906041D&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&policy=2&qs=0&rc=amV1OnJteW00NDMzPDczM0ApZDQzZDczNmQ0N2llZzkzOmdpbG1ibW0tazFgLS0uMTRzcy9iNF9iLi0tYzM1XzMtLTU6Yw%3D%3D&signature=3d10989f4d7a64fc6abbb3239aae8f75&tk=tt_webid_v2&vl=&vr="
          song="Billie Jean - Michael Jackson"
          description="new post on tictok #foryou"
          channel="abeba"
          liked={145}
          shared={3}
          comments={4}
        />
        <Video
          url="http://icecast-choi.rncm.ca/choi.mp3"
          song="I Can't Get No Satisfaction - Rolling Stones"
          description="new post on tictok #foryou"
          channel="lensa-"
          liked={400}
          shared={12}
          comments={30}
        />
      </div>
    </div>
  );
}

export default App;
