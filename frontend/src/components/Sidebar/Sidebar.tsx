import { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";

import { NavLink } from "react-router-dom";

import './Sidebar.css';

const Sidebar = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div id="wrapper" className={isToggled ? "toggled" : ""}>
      <aside id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/search" className={({ isActive }) => (isActive ? "active" : "")}>
              <FaSearch />
              Search
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" className={({ isActive }) => (isActive ? "active" : "")}>
              <IoMdCreate />
              Create
            </NavLink>
          </li>
        </ul>
      </aside>

      <div id="navbar-wrapper">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a href="#" className="navbar-brand" id="sidebar-toggle" onClick={handleToggle}>
                <FaBars />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;