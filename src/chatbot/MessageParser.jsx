import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleMessage(message,"sender1" );
    console.log(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
