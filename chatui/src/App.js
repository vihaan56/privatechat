import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/Login'
import DisplayUser from './components/chat/DisplayUser'
import UserItem from './components/chat/UserItem';
import Chatbox from './components/chat/Chatbox'
function App() {
  return (
    <div className="App">
     <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/displayuser" element={<DisplayUser />} />
      <Route path="/useritem" element={<UserItem />} />
      <Route path="/chatbox/:id" element={<Chatbox />} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
