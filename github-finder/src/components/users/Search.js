import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  // won't be using this since we're using useState
  //  state = {
  //   text: "",
  // };

  const [text, setText] = useState("");

  // if we're not using arrow function we have to add e.preventDefault or else it's going to submit to a file
  // onSubmit(e) {
  //   e.preventDefault();
  //   console.log(this.state.text);
  // }

  // add const to add function within a function
  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alertContext.setAlert("Please enter something", "light");
    } else {
      // this is sent to App.js
      githubContext.searchUsers(text);
      setText("");
    }
  };

  const onChange = (e) => {
    // get what we type in
    // this is only for text input, but we might have other input names (email, etc) so it's better to use e.target.name
    // this.setState({ text: e.target.value });
    setText(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search users"
          value={text}
          // because the input is attached to the state, we need onChange
          onChange={onChange}
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {githubContext.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          onClick={githubContext.clearUsers}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
