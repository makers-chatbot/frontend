import { createChatBotMessage } from "react-chatbot-kit";

const botName = "AIda";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi! I'm ${botName}, how can I help you with our computer inventory?`
    ),
  ],
  botName,
  customStyles: {
    chatButton: {
      backgroundColor: "#2898ec",
    },
    chatContainer: {
      backgroundColor: "#fff",
    },
  },
  state: {
    messages: [],
  },
  widgets: [],
};

export default config;