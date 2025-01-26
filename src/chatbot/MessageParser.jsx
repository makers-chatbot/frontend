import React from "react";
import PropTypes from 'prop-types';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.trim() === '') return;
    
    // Send message to ActionProvider which will handle WebSocket communication
    if (actions && actions.handleMessage) {
      actions.handleMessage(message);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

MessageParser.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.shape({
    handleMessage: PropTypes.func,
  }),
};

MessageParser.defaultProps = {
  actions: {
    handleMessage: () => console.warn('handleMessage not implemented'),
  },
};

export default MessageParser;
