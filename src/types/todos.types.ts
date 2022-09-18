//@ts-ignore
type ToDoFields = {
  Text: string;
  Status: string;
  Tags: string[] | [];
};

interface ToDo {
  id: string;
  fields: ToDoFields;
  createdTime: string;
}
type newToDo = { fields: { Tags: []; Text: ""; Status: "Todo" } };

type ToDoCreatePayload = Pick<ToDo, "fields">;

type ToDoDeletePayload = Pick<ToDo, "id">;

type ToDoUpdatePayload = {
  id: string;
  fields: Partial<ToDoFields>;
};

type ToDosFetchResponse = {
  data: {
    records: ToDo[];
  };
};

type ToDoCreateResponse = {
  records: ToDo[];
};

type ToDosDeleteResponse = {
  records: ToDo[];
};

type ToDosUpdateResponse = {
  records: ToDo[];
};

type ToDoFilter = { prefix: string; tags: string[] };
