import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function Sidebar() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div style={{width: 200, borderRight: "1px solid #ccc", padding: 10}}>
      <h3>Chats</h3>
      <div>User: {user?.username}</div>
      {/* In a real app: list conversations here */}
    </div>
  );
}