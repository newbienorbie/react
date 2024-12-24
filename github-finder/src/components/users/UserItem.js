import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// destructure in arg to replace this line
// const { login, avatar_url, html_url } = props.user;
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  // state = {
  //   id: "id",
  //   login: "mojombo",
  //   avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  //   html_url: "https://github.com/mojombo",
  // };

  // destructuring
  // this.props is only used in class. if it's in function, we can pass in the props in the argument
  // const { login, avatar_url, html_url } = this.props.user;

  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        className="round-img"
        alt="avatar"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>

      <div>
        <Link to={`user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
