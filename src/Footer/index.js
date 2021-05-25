import React from "react";
import { useStyles } from "./Style";
import MusicNoteRoundedIcon from "@material-ui/icons/MusicNoteRounded";
import Ticker from "react-ticker";

export default function Index({ song, description, channel }) {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.footerText}>
        <h4>@{channel}</h4>
        <p> {description} </p>
        <div className={classes.sliderText}>
          <MusicNoteRoundedIcon className={classes.iconMusic} />
          <Ticker mode="smooth">
            {({ index }) => (
              <>
                <p>{song}</p>
              </>
            )}
          </Ticker>
        </div>
      </div>
      <img
        src={"https://static.thenounproject.com/png/934821-200.png"}
        className={classes.imageFooter}
      />
    </div>
  );
}
