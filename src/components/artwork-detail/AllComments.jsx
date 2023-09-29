import React, { useContext, useEffect } from "react";
import miniProfile from "../../images/profile-user.png";
import { Link } from "react-router-dom";
import { linkStyles } from "../../utils/styleSetter";
import { motion } from "framer-motion";
import { slideAnimation } from "../../utils/motion";
import moreIcon from "../../images/more.png";
import AuthContext from "../../providers/Auth";
import MenuItem from "@mui/material/MenuItem";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";





function AllComments({ comments }) {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  //   console.log(comments);
  const options = ["Edit", "Delete"];

  return (
    <>
      {comments && (
        <div className="comments">
          {comments.reverse().map((comment, index) => {
            return (
              <motion.div
                key={index}
                className="one-comment"
                style={{ ...slideAnimation("down") }}
              >
                <div className="mini-profile-img">
                  <img src={miniProfile} alt="" />
                </div>
                <div className="username-comment">
                  <div className="username-settings">
                    <Link
                      to={`/profile/${comment.userId}`}
                      style={{ ...linkStyles }}
                    >
                      <h4>{comment.userName}</h4>
                    </Link>
                    {currentUser.uid === comment.userId ? (
                      <>
                        <img
                          src={moreIcon}
                          alt=""
                          id="comment-setting"
                          ref={anchorRef}
                          aria-controls={open ? "composition-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        />

                        <Popper
                          open={open}
                          anchorEl={anchorRef.current}
                          role={undefined}
                          placement="bottom-start"
                          anchorOrigin={{
                            vertical: "bottom", // Adjust these values based on your use case
                            horizontal: "left", // Adjust these values based on your use case
                          }}
                          transformOrigin={{
                            vertical: "bottom", // Adjust these values based on your use case
                            horizontal: "left", // Adjust these values based on your use case
                          }}
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  //   placement === "bottom-start"
                                  //     ? "left top"
                                  // :

                                  placement === "bottom-start"
                                    ? "left top"
                                    : placement === "bottom"
                                    ? "left bottom"
                                    : placement === "top-start"
                                    ? "left top"
                                    : "left bottom", // Add any other placements you might use

                                // "left bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    <MenuItem onClick={handleClose}>
                                      Edit
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                      Delete
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <h5>{comment.text}</h5>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default AllComments;
