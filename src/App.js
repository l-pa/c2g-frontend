import React, { useEffect, useState } from "react";
import "./App.css";
import Coub from "./components/Coub";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import SocketContext from "./SocketContext";
import LinearProgress from "@material-ui/core/LinearProgress";

import Noty from "noty";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/metroui.css";

let socket = require("socket.io-client")("http://127.0.0.1:4000");
var room = "abc123";

socket.on("connect", function() {
  // Connected, let's sign-up for to receive messages for this room
  socket.emit("room", room);
});

socket.on("userLeft", function(userId) {
  // Connected, let's sign-up for to receive messages for this room
  new Noty({
    theme: "metroui",
    type: "error",
    layout: "centerRight",
    timeout: 1000,
    text: "User " + userId + " left"
  }).show();
});

socket.on("userJoined", function(userId) {
  // Connected, let's sign-up for to receive messages for this room
  new Noty({
    theme: "metroui",
    type: "info",
    layout: "centerRight",
    timeout: 1000,
    text: "User " + userId + " joined"
  }).show();
});

socket.on("notification", function(object) {
  // Connected, let's sign-up for to receive messages for this room
  new Noty({
    theme: "metroui",
    type: object.type,
    layout: "centerRight",
    timeout: 1000,
    text: object.text
  }).show();
});

function App() {
  const [loading, setLoading] = useState(false);
  setLoadingProp = setLoadingProp.bind(this);
  function setLoadingProp(value) {
    setLoading(value);
  }

  useEffect(() => {
    console.log(socket);
  }, []);

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setLoading(true);
              socket.emit("latest");
            }}
          >
            Latest
          </Button>
          <br />
          <Button variant="contained" color="primary">
            Hot
          </Button>
        </Grid>
        <Grid item xs={6}>
          <SocketContext.Provider value={socket}>
            <Coub setLoading={setLoadingProp} />
          </SocketContext.Provider>
          {loading && (
            <LinearProgress style={{ marginTop: 10 }} variant="query" />
          )}
        </Grid>
        <Grid item xs={4}>
          XD
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
