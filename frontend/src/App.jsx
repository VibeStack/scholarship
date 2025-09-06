import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginForms/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import TableView from "./components/TableView/TableView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/table-view" element={<TableView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
