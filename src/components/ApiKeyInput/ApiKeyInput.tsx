import { AppContext } from "context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../api/ToDoApi";
import s from "./ApiKeyInput.module.scss";

const apiKeyLocalStorageKey = "apiKey";

export const ApiKeyInput = ({}) => {
  const { apiKey, setApiKey } = useContext(AppContext);

  useEffect(() => {
    const apiKeyFromLocalStorage = localStorage.getItem(apiKeyLocalStorageKey);

    if (apiKeyFromLocalStorage) {
      localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);
      setApiKey(apiKeyFromLocalStorage);
      api.setApiKey(apiKeyFromLocalStorage);
    }
  }, []);

  // useEffect(() => {
  //   async function callTodosApi() {
  //     const response = await fetch("http://zyh0ypgh08.execute-api.eu-west-1.amazonaws.com/prod/todos", {
  //       headers: {
  //         "X-Api-Key": apiKey,
  //       },
  //     });
  //     return await response.json();
  //   }
  //   if (apiKey) {
  //     callTodosApi()
  //       .then((res) => {
  //         setTodos(res.records);
  //       })
  //       .catch((e) => console.error(e));
  //   }
  // }, [apiKey]);

  return (
    <div className={s.apiKeyInputContainer}>
      <span className={s.apiKeyLabel}>Enter API key: </span>
      <input
        className={s.apiKeyInput}
        type="password"
        value={apiKey}
        onChange={(textEvent) => {
          localStorage.setItem(apiKeyLocalStorageKey, textEvent.target.value);
          setApiKey(textEvent.target.value);
        }}
      />
      {/* <button onClick={() => {
        api.setApiKey(apiKey);
      }}>submit</button> */}
    </div>
  );
};
