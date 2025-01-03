import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/*
export class Navbar extends Component {
  // set defaultProps if there's nothing passed in
  static defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github",
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };
*/

const Navbar = ({ title = "Github Finder", icon = "fab fa-github" }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Github Finder",
  icon: "fab fa-github",
};

Navbar.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
};

export default Navbar;
