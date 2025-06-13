import React from "react";
import "./App.css";
import AppRouter from "./router";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <AppRouter />
      </AnimatePresence>
    </div>
  );
}

export default App;