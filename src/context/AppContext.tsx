import { FieldsModal } from "components/FieldsModal";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../api/ToDoApi";
type AppContextProps = {};

type AppContextValue = {
  apiKey: string;
  setApiKey: (key: string) => void;
  openFieldsModal: (todo?: ToDo) => void;
  filter: ToDoFilter;
  setFilter: (filter: ToDoFilter) => void;
};

export const AppContext = React.createContext({} as AppContextValue);

export const AppProvider = ({
  children,
}: React.PropsWithChildren<AppContextProps>) => {
  const [apiKey, setApiKey] = useState("");
  const [fieldsmodalData, setFieldsmodalData] = useState<ToDo | newToDo>();
  const [filter, setFilter] = useState({ prefix: "", tags: [] as string[] });

  const openFieldsModal = (todo?: ToDo) => {
    setFieldsmodalData(todo || { fields: { Tags: [], Text: "" } });
  };

  const closeFieldsModal = () => {
    setFieldsmodalData(undefined);
  };

  useEffect(() => {
    api.setApiKey(apiKey);
    // TODO: fetch Todos
  }, [apiKey]);

  const state: AppContextValue = {
    apiKey,
    setApiKey,
    openFieldsModal,
    filter,
    setFilter,
  };

  return (
    <AppContext.Provider value={state}>
      {children}
      {fieldsmodalData && (
        <FieldsModal
          fieldsmodalData={fieldsmodalData}
          onClose={closeFieldsModal}
        />
      )}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
