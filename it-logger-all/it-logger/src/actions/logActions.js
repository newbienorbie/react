import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
} from "./types";

// export const getLogs = () => {
//   // thunk allows us to return function instead of an object. that function gets passed in a dispatch method that we can use to then dispatch to our reducer at any point, meaning we can make the request to our backend and then wait, get the response and then dispatch to the reducer.

//   return async (dispatch) => {
//     setLoading();

//     const res = await fetch("/logs");
//     const data = await res.json();
//     dispatch({
//       type: GET_LOGS,
//       payload: data,
//     });
//   };
// };

// shorter version of the top + trycatch
// get logs from server
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/logs");
    const data = await res.json();
    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

// add log to server
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

// delete log from server
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

// update log on server
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

// search server logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/logs");
    const data = await res.json();

    const filteredData = data.filter(
      (log) =>
        log.message.toLowerCase().includes(text.toLowerCase()) ||
        log.tech.toLowerCase().includes(text.toLowerCase())
    );

    dispatch({
      type: SEARCH_LOGS,
      payload: filteredData,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response?.statusText || "Search error",
    });
  }
};

// set current log when log is edited
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
