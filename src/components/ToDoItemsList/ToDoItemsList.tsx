import { ToDoItem } from "../ToDoItem";
import { useQuery, useQueryClient } from "react-query";
import s from "./ToDoItemsList.module.scss";
import { useContext } from "react";
import { AppContext } from "context/AppContext";
import { api } from "api/ToDoApi";
import { todos } from "utils/mockData";
import { SearchField } from "../SearchField";
import { TagFilter } from "../TagFilter";
import { AddButton } from "../AddButton";


export const ToDoItemsList = ({}) => {
  const queryClient = useQueryClient();
  const { apiKey } = useContext(AppContext);
  // const query = useQuery('todos', api.fetchTodos)

  // console.log(query)
  // const todos = query.data?.records || []

  if(!apiKey) {
    return <span>No api key</span>
  }

  return (
    <div className={s.todoListContainer}>
      <div className={s.header}>
        <SearchField />
        <TagFilter />
      </div>
      <ul className={s.todoList}>
          {todos.map((todo: ToDo) => (
            <ToDoItem todo={todo} />
          ))}
          <AddButton />
      </ul>
    </div>
  );
};
