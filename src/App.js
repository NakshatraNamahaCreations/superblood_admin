import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import User from "./Components/User";
import Bookinghistroy from "./Components/Bookinghistroy";
import Privacy from "./Components/Privacy";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/booking" element={<Bookinghistroy />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
