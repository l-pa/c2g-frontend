import React from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";

class Coub extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countPlayed: 0, loadedCoub: false };
  }
  // http://coub.com/embed/um0um0?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false
  render() {
    return (
      <div className="coub">
        <iframe
          src="http://coub.com/embed/um0um0?muted=false&autostart=true&originalSize=false&hideTopBar=false&startWithHD=false"
          onLoad={console.log("xdddddd")}
        />
      </div>
    );
  }
}

export default Coub;
