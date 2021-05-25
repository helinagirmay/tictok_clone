import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentRoundedIcon from "@material-ui/icons/CommentRounded";
import Slide from "@material-ui/core/Slide";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Comment from "./comment";
import { useStyles } from "./Style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Index({ liked, comments, shared }) {
  // const fullScreen = [theme.breakpoints.down("sm")];
  const classes = useStyles();
  const [likes, setLiked] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClickAway = () => {
    // if (dialog === false) {
    //   setDialog(false);
    // }
  };
  const handleComment = (e) => {
    console.log(e, "===");
    setDialog(true);
  };

  return (
    <div className={classes.Sidebar}>
      <div className={classes.iconSidebar}>
        {likes ? (
          <FavoriteIcon onClick={(e) => setLiked(false)} />
        ) : (
          <FavoriteBorderIcon onClick={(e) => setLiked(true)} />
        )}
        <p>{likes ? liked + 1 : liked}</p>
      </div>
      <div className={classes.iconSidebar}>
        <CommentRoundedIcon onClick={(e) => handleComment(e)} />
        <p>{comments}</p>
      </div>
      <div className={classes.iconSidebar}>
        <ShareIcon />
        <p>{shared}</p>
      </div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <Dialog
          // fullWidth={fullWidth}
          // maxWidth={maxWidth}

          TransitionComponent={Transition}
          className={classes.dialogComment}
          open={dialog}
          onClose={() => setDialog(false)}
          aria-labelledby="max-width-dialog-title"
        >
          {dialog ? <Comment /> : null}
        </Dialog>
      </ClickAwayListener>
    </div>
  );
}
