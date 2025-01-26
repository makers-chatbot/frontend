import { Route, Routes } from "react-router-dom";
import {
  AuthLayout,
  ContractLayout,
  HomeLayout,
  ProductLayout,
} from "./layout";
import { useState } from "react";
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import MessageParser from "./chatbot/MessageParser";
import ActionProvider from "./chatbot/ActionProvider";
import "react-chatbot-kit/build/main.css";
import { Dashboard } from "./pages/dashboard";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  const [openChat, setOpenChat] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center ">
      <Routes>
        <Route path="/*" element={<HomeLayout />} />
        <Route path="/products/*" element={<ProductLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/contracts/*" element={<ContractLayout />} />
        <Route path="/layout/*" element={<DashboardLayout />} />
      </Routes>
      <button
        className="fixed bottom-10 right-24  w-12 h-12"
        size="md"
        onClick={() => {
          console.log(openChat);
          setOpenChat(!openChat);
        }}
      >
        <img
          src="public/img/chat.png"
          alt="Chat Icon"
          className="w-fit h-fit"
        />
      </button>

      <main className={` fixed right-12   ${openChat ? "" : "hidden"} `}>
        <Chatbot
          className="mr-0"
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </main>
    </div>
  );
}

export default App;
