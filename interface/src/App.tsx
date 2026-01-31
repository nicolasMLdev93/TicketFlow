import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/layout";
import Event from "./pages/event";
import Login from "./pages/login";
import NotFound404 from "./pages/not_found";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="event/:title" element={<Event />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
