//@ts-ignore
type ToDoFields = {
  Text: string;
  Status: string;
  Tags: string[];
};

interface ToDo {
  id: string;
  fields: ToDoFields;
  createdTime: string;
}
type newToDo = { fields: { Tags: []; Text: "" } };

type ToDoCreatePayload = ToDoFields;

type ToDoDeletePayload = Pick<ToDo, "id">;

type ToDoUpdatePayload = {
  id: string;
  fields: Partial<ToDoFields>;
};

type ToDosFetchResponse = {
  records: ToDo[];
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
