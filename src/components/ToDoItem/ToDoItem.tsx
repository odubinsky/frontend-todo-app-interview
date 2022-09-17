import s from "./ToDoItem.module.scss";
import { useContext, useState } from "react";
import { ReactComponent as CompletedIcon } from "../../assets/completed.svg";
import { ReactComponent as DeleteIcon } from "../../assets/trash.svg";
import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import cx from "classnames";
import { AppContext } from "context/AppContext";
import { TagsList } from "components/Tag/TagsList";

export const ToDoItem = ({ todo }: { todo: ToDo }) => {
  const {
    id,
    fields: { Status, Tags, Text },
  } = todo;
  const [isCompleted, setIsCompleted] = useState(Status === "Completed");
  const { openFieldsModal, filter, setFilter } = useContext(AppContext);
  // const isCompleted = status === 'Completed'

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
            openFieldsModal(todo);
          }}
          className={s.edit}
        />
        <DeleteIcon
          onClick={() => {
            openFieldsModal();
          }}
          className={s.delete}
        />
      </div>
      <CompletedIcon
        onClick={() => {
          setIsCompleted(!isCompleted);
        }}
        className={cx(s.status, { [s.completed]: isCompleted })}
      />
    </li>
  );
};
