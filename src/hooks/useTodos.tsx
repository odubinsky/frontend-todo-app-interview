import React from 'react';
import { useQueryClient, useQuery } from 'react-query';
import { api } from 'api/ToDoApi';


export const useTodos = () => {
  // const queryClient = useQueryClient()

  const query = useQuery('todos', api.fetchTodos, {
    enabled: false,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // query.data?.records.forEach((todo: {fields: any, id: number}) => {
  //   queryClient.setQueryData(['todo', todo.id], todo);
  // });

  console.log(query.data?.records);
  return query.data?.records;
}


