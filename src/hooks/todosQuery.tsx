import React, { useEffect, useState } from 'react';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { api } from 'api/ToDoApi';
import { AppContext, useAppContext } from 'context/AppContext';
import { useToast } from 'context/ToastContext';

export const useGetTodos = () => {
  const { filter } = useAppContext();
  const [todos, setTodos] = useState<ToDo[]>();
  const { triggerToast  } = useToast();
  const query = useQuery('todos', api.fetchTodos, {
    onError: (error) => {
      console.error(error);
      triggerToast({skin: 'error', content: 'Failed to get tasks'});
    },
  })

  const filterTodos = (todos: ToDo[], filter: ToDoFilter) => {
    return todos.filter((todo) => {
      const { Text, Tags } = todo.fields;
      const textMatch = Text.toLowerCase().startsWith(filter.prefix.toLowerCase());
      const tagsMatch = Tags.some((tag) => filter.tags.includes(tag));
      return textMatch && tagsMatch;
    });
  };
  
  useEffect(() => {
    query.data?.data.records && setTodos(filterTodos(query.data?.data.records, filter));
  }, [filter, query.data]);

  return { todos, query };
}


export const useCreateTodo = () => {  
  const queryClient = useQueryClient();
  const { triggerToast  } = useToast();
  const mutation = useMutation((payload: ToDoCreatePayload) => api.createTodo(payload), {
    onSuccess: () => {
      triggerToast({skin: 'success', content: 'Task created successfully'});
      queryClient.invalidateQueries('todos')
    },
    onError: () => {
      triggerToast({skin: 'error', content: 'Failed to create task'});
    }
  })

  return mutation;
}


export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { triggerToast  } = useToast();

  const mutation = useMutation((payload: ToDoUpdatePayload) => api.updateTodo(payload), {
    onSuccess: () => {
      triggerToast({skin: 'success', content: 'Task updated successfully'});
      queryClient.invalidateQueries('todos')
    }, 
    onError: () => {
      triggerToast({skin: 'error', content: 'Failed to update task'});
    }
  })

  return mutation;
}

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();
  const { triggerToast  } = useToast();
  const mutation = useMutation((payload: ToDoDeletePayload) => api.deleteTodo(payload), {
    onSuccess: () => {
      triggerToast({skin: 'success', content: 'Task deleted successfully'});
      queryClient.invalidateQueries('todos')
    }, 
    onError: () => {
      triggerToast({skin: 'error', content: 'Failed to delete task'});
    }
  })

  return mutation;
}


