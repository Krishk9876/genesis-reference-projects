import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./app/store";
import Login from "./components/Login";
import Register from "./components/Register";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function MainApp() {
  const [isRegister, setIsRegister] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return isRegister
      ? <Register onRegister={() => setIsRegister(false)} />
      : <div>
          <Login onLogin={() => {}} />
          <p>
            Don't have an account?{" "}
            <button onClick={() => setIsRegister(true)}>Register</button>
          </p>
        </div>
  }

  return (
    <div style={{display: "flex", height: "100vh"}}>
      <Sidebar />
      <div style={{flex: 1, padding: 20}}>
        <ChatWindow />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <MainApp />
  </Provider>
);