import React, { useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import WebSocketService from "../services/WebSocketService";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const addMessage = useCallback((message) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }, [setState]);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    WebSocketService.connect();

    // Set up message handler
    const unsubscribe = WebSocketService.onMessage((response) => {
      // Format the message with proper line breaks
      const formattedMessage = response.message
        .split('\\n')
        .join('\n')
        .replace(/\n{3,}/g, '\n\n'); // Replace multiple line breaks with double line break
      
      const botMessage = createChatBotMessage(formattedMessage);
      addMessage(botMessage);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe();
      WebSocketService.ws?.close();
    };
  }, [createChatBotMessage, addMessage]);

  const handleMessage = (message) => {
    // Only send the message, no loading state
    if (WebSocketService.ws?.readyState === WebSocket.OPEN) {
      WebSocketService.sendMessage(message);
    } else {
      const errorMessage = createChatBotMessage(
        "Sorry, I can't connect to the server at the moment.",
        { error: true }
      );
      addMessage(errorMessage);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleMessage,
          },
        });
      })}
    </div>
  );
};

ActionProvider.propTypes = {
  createChatBotMessage: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ActionProvider;
