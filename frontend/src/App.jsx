import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./components/LoginForms/SignUpPage";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
