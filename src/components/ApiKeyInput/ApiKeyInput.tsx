import { useAppContext } from "context/AppContext";
import React, { useEffect, useState } from "react";
import { api } from "../../api/ToDoApi";
import s from "./ApiKeyInput.module.scss";

const apiKeyLocalStorageKey = "apiKey";

export const ApiKeyInput = ({}) => {
  const { apiKey, setApiKey } = useAppContext();

  useEffect(() => {
    const apiKeyFromLocalStorage = localStorage.getItem(apiKeyLocalStorageKey);

    if (apiKeyFromLocalStorage) {
      localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);
      setApiKey(apiKeyFromLocalStorage);
      api.setApiKey(apiKeyFromLocalStorage);
    }
  }, []);

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
