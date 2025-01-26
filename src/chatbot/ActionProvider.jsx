import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    
  const handleMessage = (message, sender) => {
    //TODO: conectar a la API que se encarga de mandar la respuesta al chat
    //Para mostrar el mensaje en el chat se usa el metodo  createChatBotMessage
    console.log(message, sender);

    
    const botMessage = createChatBotMessage("Must implement connection to API");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
    
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

export default ActionProvider;
