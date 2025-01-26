import { createChatBotMessage } from "react-chatbot-kit";


const botname = "AIda"

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hola, soy AIda, estoy para servirte ¿en qué puedo ayudarte?`
    ),
  ],
  botname: botname,

  customStyles: {

    chatContainer: {
      backgroundColor: "", 
    },
  },
};

export default config;