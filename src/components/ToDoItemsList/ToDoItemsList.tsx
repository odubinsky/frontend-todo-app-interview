import s from "./ToDoItemsList.module.scss";
import { AppContext, useAppContext } from "context/AppContext";
import { api } from "api/ToDoApi";
import { ToDoItem } from "components/ToDoItem";
import { SearchField } from "../SearchField";
import { TagFilter } from "../TagFilter";
import { AddButton } from "../AddButton";
import {  useGetTodos } from "hooks/todosQuery";


export const ToDoItemsList = ({}) => {
  const { apiKey } = useAppContext();

  const { query, todos} = useGetTodos()

  
  if(!apiKey) {
    return <span>No api key</span>
  }

  if(query.isError) {
    return <span>Error, try again later</span>
  }

  
  return (
    <div className={s.todoListContainer}>
      <div className={s.header}>
        <SearchField />
        <TagFilter />
      </div>
      {query.isLoading ? <div>Loading...</div> : <ul className={s.todoList}>
          {todos && todos.map((todo: ToDo) => (
            <ToDoItem todo={todo} />
          ))}
          <AddButton />
      </ul>}
    </div>
  );
};
