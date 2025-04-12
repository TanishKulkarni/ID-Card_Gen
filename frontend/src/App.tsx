import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import Create from "./components/Create/Create";
import Search from "./components/Search/Search";

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
};

export default App;