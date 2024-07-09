import "./App.css";
import Followers from "./components/Followers/Followers";
import UserForm from "./components/UserForm/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/"  element={<UserForm/>} />
        
        <Route path="/followers/:username" element={<Followers/>}/>
      </Routes>
    </Router>
  );
}

export default App;
