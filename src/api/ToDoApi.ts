
import axios from 'axios';

export const API_BASE_PATH = 'https://zyh0ypgh08.execute-api.eu-west-1.amazonaws.com/prod/todos'



class ToDoAPI {
  apiKey: string = '';
  constructor() {
    this.fetchTodos = this.fetchTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  getHeaders() {
    return {
      "X-Api-Key": this.apiKey,
    }
  }

  fetchTodos(): Promise<ToDosFetchResponse> {
    return axios.get(API_BASE_PATH, { headers: this.getHeaders() })
  }

  createTodo(params: ToDoCreatePayload) {
    return axios.post(API_BASE_PATH, { records: [params]}, { headers: this.getHeaders() })
  }

  updateTodo(params: ToDoUpdatePayload) {
    return axios.patch(API_BASE_PATH, { records: [params]}, { headers: this.getHeaders() })
  }

  deleteTodo(params: ToDoDeletePayload): Promise<any> {
    return axios.delete(API_BASE_PATH + '?records[]=' + params.id, { headers: this.getHeaders() })
  }
}


export const api = new ToDoAPI();