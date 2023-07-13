import { Box, Fab, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const RulesModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45%",
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <QuestionMarkIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game rules:
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Take turns playing with the computer. Starting at number 1, count
            higher untill you encounter: <br />
            <br />- A number that can be dividable by <b>3</b>, then instead say{" "}
            <b>Fizz.</b>
            <br />- A number that can be dividable by <b>5</b>, then instead say{" "}
            <b>Buzz.</b>
            <br />- A number that can be dividable by <b>both</b>, then say{" "}
            <b>FizzBuzz.</b>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default RulesModal;
