import React, { useReducer, useCallback } from "react";

// reference doc: https://reactjs.org/docs/hooks-reference.html#usereducer
// useCallback(()=>{}, [])  similar as shouldComponentUpdate

const httpReducer = (state, action) => {
  switch (action.type) {
    case "SEND":
      return { data: null, error: null, status: "pending" };
      break;
    case "SUCCESS":
      return { data: action.payload, error: null, status: "complete" };
      break;
    case "ERROR":
      return { data: null, error: action.payload, status: "complete" };
      break;
  }
};

const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });
      try {
        let response = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", payload: response });
      } catch (e) {
        dispatch({
          type: "ERROR",
          payload: e.message || "something went wrong",
        });
      }
    },
    [requestFunction]
  );
  return { sendRequest, ...httpState };
};

export default useHttp;
