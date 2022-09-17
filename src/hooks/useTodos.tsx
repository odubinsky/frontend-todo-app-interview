import React, { useContext } from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { api } from 'api/ToDoApi';
import { todos } from "utils/mockData";
import { AppContext } from 'context/AppContext';

export const useTodos = () => {

  const { filter } = useContext(AppContext);

  return todos.filter((todo) => {
    if (filter.prefix) {
      if (!todo.fields.Text.toLowerCase().startsWith(filter.prefix.toLowerCase())) {
        return false;
      }
    }

    if (filter.tags.length > 0) {
      if (!todo.fields.Tags.some((tag) => filter.tags.includes(tag))) {
        return false;
      }
    }

    return true;
  });
  // const queryClient = useQueryClient()

  // const query = useQuery('todos', api.fetchTodos, {
  //   enabled: false,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });

  // query.data?.records.forEach((todo: {fields: any, id: number}) => {
  //   queryClient.setQueryData(['todo', todo.id], todo);
  // });

  // console.log(query.data?.records);
  // return query.data?.records;
}


