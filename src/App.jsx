import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <Routes>
          <Route path="/tasks" element={<TaskList token={token} />} />
          <Route path="/new" element={<TaskForm token={token} />} />
          <Route path="/edit/:id" element={<TaskForm token={token} />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
