import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/student/HomePage";

function App() {
  const [count, setCount] = useState(0); // You can remove this if unused

  return (
    <h1>app</h1>
  );
}

export default App;
