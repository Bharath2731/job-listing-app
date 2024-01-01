import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddJobPage from "./pages/AddJobPage";
import ViewJobPage from "./pages/ViewJobPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { createContext, useState } from "react";

export const viewJobContext = createContext();
export const editJobContext = createContext();
function App() {
  const [viewJob, setViewJob] = useState({});
  const [iseditjob, setIseditjob] = useState(false);
  return (
    <div className="App">
      <editJobContext.Provider value={[iseditjob, setIseditjob]}>
        <viewJobContext.Provider value={[viewJob, setViewJob]}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/addJob" element={<AddJobPage />} />
              <Route exact path="/viewjob" element={<ViewJobPage />} />
            </Routes>
          </BrowserRouter>
        </viewJobContext.Provider>
      </editJobContext.Provider>
    </div>
  );
}

export default App;
