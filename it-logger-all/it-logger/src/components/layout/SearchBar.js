import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../actions/logActions";
import { getLogs } from "../../actions/logActions";

const SearchBar = ({ searchLogs, getLogs }) => {
  const text = useRef("");

  const onChange = (e) => {
    e.preventDefault();
    const searchText = text.current.value;
    if (searchText === "") {
      getLogs();
    } else {
      searchLogs(searchText);
    }
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <div className="input-field">
          <input
            id="search"
            type="search"
            placeholder="Search Logs"
            ref={text}
            onChange={onChange}
          />
          <label className="label-icon" htmlFor="search">
            <i className="material-icons">search</i>
          </label>
          <i className="material-icons">close</i>
        </div>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired,
  getLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs, getLogs })(SearchBar);
