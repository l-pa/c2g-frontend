import React from "react";

var Iframe = React.createClass({
  render: function() {
    return (
      <div>
        <iframe
          src={this.props.src}
          height={this.props.height}
          width={this.props.width}
        />
      </div>
    );
  }
});

export default Iframe;
