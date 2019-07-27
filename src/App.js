import React, { useEffect } from "react";
import "./App.css";
import Coub from "./components/Coub";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

let socket = require("socket.io-client")("http://127.0.0.1:4000");
var room = "abc123";

socket.on("connect", function() {
  // Connected, let's sign-up for to receive messages for this room
  socket.emit("room", room);
});

socket.on("gotCoub", function(coub) {
  console.log(coub);
});

function App() {
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
          <Coub url="xd" />
        </Grid>
        <Grid item xs={4}>
          XD
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
