import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddJobPage from "./pages/AddJobPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { createContext, useState } from "react";

export const viewJobContext = createContext();
function App() {
  const [viewJob, setViewJob] = useState({});
  return (
    <div className="App">
      <viewJobContext.Provider value={[viewJob,setViewJob]}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/addJob" element={<AddJobPage />} />
          </Routes>
        </BrowserRouter>
      </viewJobContext.Provider>
    </div>
  );
}

export default App;
