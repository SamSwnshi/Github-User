import "./App.css";
import UserForm from "./components/UserForm/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/"  element={<UserForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
