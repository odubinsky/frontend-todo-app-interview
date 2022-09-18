import s from "./ToDoItem.module.scss";
import { useState } from "react";
import { ReactComponent as CompletedIcon } from "../../assets/completed.svg";
import { ReactComponent as DeleteIcon } from "../../assets/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import cx from "classnames";
import { useAppContext } from "context/AppContext";
import { TagsList } from "components/Tag/TagsList";
import { useDeleteTodos, useUpdateTodo } from "hooks/todosQuery";
import { Status as StatusOptions } from "../../utils/consts";

export const ToDoItem = ({ todo }: { todo: ToDo }) => {
  const {
    id,
    fields: { Status, Tags, Text },
  } = todo;
  const [isCompleted, setIsCompleted] = useState(Status === StatusOptions.Done);
  const { openFieldsModal, filter, setFilter } = useAppContext();
  const deleteMutation = useDeleteTodos();
  const updateTodoMutation = useUpdateTodo();
  const currentStatus = isCompleted ? StatusOptions.Done : StatusOptions.Todo;

  return (
    <li key={id} className={cx(s.todoItem, { [s.completed]: isCompleted })}>
      <h5 className={s.title}>{Text}</h5>
      <div className={s.tagsList}>
        <TagsList
          tags={Tags}
          onClick={(tag) => {
            !filter.tags.includes(tag) &&
              setFilter({ ...filter, tags: [...filter.tags, tag] });
          }}
        />
      </div>
      <div className={s.id}>{`${id}`}</div>
      <div className={s.actions}>
        <EditIcon
          onClick={() => {
            openFieldsModal({
              ...todo,
              fields: { ...todo.fields, Status: currentStatus },
            });
          }}
          className={s.edit}
        />
        <DeleteIcon
          onClick={() => {
            deleteMutation.mutate({ id });
          }}
          className={s.delete}
        />
      </div>
      <CompletedIcon
        onClick={() => {
          setIsCompleted(!isCompleted);
          updateTodoMutation.mutate(
            {
              id,
              fields: {
                Status: isCompleted ? StatusOptions.Todo : StatusOptions.Done,
              },
            },
            { onError: () => setIsCompleted(isCompleted) }
          );
        }}
        className={cx(s.status, { [s.completed]: isCompleted })}
      />
    </li>
  );
};
