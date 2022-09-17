import { api } from "api/ToDoApi";
import { ApiKeyInput } from "components/ApiKeyInput";
import { AppHeader } from "components/AppHeader/AppHeader";
import { ToDoItemsList } from "components/ToDoItemsList";
import { AppContext } from "context/AppContext";
import React, { useContext, useEffect, useState} from "react";
import { useMutation, useQueryClient } from "react-query";
import st from './App.module.scss';

export const App = ({}) => {
  const { openFieldsModal } = useContext(AppContext);
  // const [todos, setTodos] = useState([])



  // useEffect(() => {
  //   const apiKeyFromLocalStorage = localStorage.getItem(apiKeyLocalStorageKey);
    
  //   if (apiKeyFromLocalStorage) {
  //     localStorage.setItem(apiKeyLocalStorageKey, apiKeyFromLocalStorage);
  //     setApiKey(apiKeyFromLocalStorage);
  //   }
  // }, []);

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
    <div className={st.app}>
      <AppHeader />
      <ToDoItemsList />
    </div>
  );
}

export default App;
