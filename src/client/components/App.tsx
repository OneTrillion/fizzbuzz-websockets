import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";
import RulesModal from "./RulesModal";
import ReplayIcon from "@mui/icons-material/Replay";
import { generateSessionId, getSessionData, setSessionData } from "./Session";

const socket = io({ path: "/chat", transports: ["websocket"] });

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [opponentResponse, setOpponentResponse] = useState("0");
  const [showRestart, setShowRestart] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const makePlay = () => {
    socket.emit("make_play", userInput, sessionId);
    setUserInput("");
    setShowRestart(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      makePlay();
    }
  };

  const restartGame = () => {
    setShowRestart(false);
    setOpponentResponse("0");
  };

  useEffect(() => {
    let sessionId = getSessionData("sessionId");
    if (!sessionId) {
      sessionId = generateSessionId();
      setSessionData("sessionId", sessionId);
    }
    setSessionId(sessionId);

    socket.on("response", (res) => {
      setOpponentResponse(res);
      if (res === "You lose") {
        setShowRestart(true);
      }
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "25vh",
        }}
      >
        <Typography
          variant="h2"
          color="primary"
          style={{
            textShadow: "1px 2px 2px gray",
            paddingBottom: "5vh",
          }}
        >
          FizzBuzz
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "5vh",
          }}
        >
          <Typography
            variant="h2"
            style={{
              textAlign: "center",
              textShadow: "1px 1px 2px gray",
            }}
          >
            {opponentResponse}
          </Typography>
          {showRestart && (
            <IconButton size="large" onClick={restartGame}>
              <ReplayIcon />
            </IconButton>
          )}
        </div>
        <div>
          <Paper
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
              backgroundColor: "#ebebeb",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
            <IconButton color="primary" sx={{ p: "10px" }} onClick={makePlay}>
              <SendIcon />
            </IconButton>
          </Paper>
          <Typography variant="caption">
            tip: !highscore to show current highscore
          </Typography>
        </div>
      </div>
      <RulesModal />
    </div>
  );
};

export default App;
