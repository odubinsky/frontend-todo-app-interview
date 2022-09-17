import { createPortal } from "react-dom";
import { useState } from "react";
import s from "./FieldsModal.module.scss";
import { TagsList } from "components/Tag/TagsList";
import { useMutation, useQueryClient } from "react-query";
import { api } from "api/ToDoApi";
import { Status } from "utils/consts";

export const FieldsModal = ({
  fieldsmodalData,
  onClose,
}: {
  fieldsmodalData: ToDo | newToDo;
  onClose: () => void;
}) => {
  const [tags, setTags] = useState(fieldsmodalData.fields.Tags);
  const [text, setText] = useState(fieldsmodalData.fields.Text);
  const [tagInput, setTagInput] = useState("");

  const isNew = !(fieldsmodalData as ToDo).id;

  const queryClient = useQueryClient();

  const { mutate } = useMutation(api.createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return createPortal(
    <div className={s.modalBackground} onClick={onClose}>
      <div className={s.modal} onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
        <div className={s.modalHeader}>
          <h3 className={s.modalTitle}>
            {isNew ? "Add New Task" : "Edit Task"}
          </h3>
          <button onClick={onClose} className={s.closeButton}>
            X
          </button>
        </div>
        <div className={s.modalBody}>
          <div className={s.field}>
            <div className={s.label}>Task Description </div>
            <input
              type="text"
              className={s.input}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={s.field}>
            <div className={s.label}>Tags</div>
            <input
              type="text"
              className={s.input}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              onClick={() => {
                setTags([...tags, tagInput]);
                setTagInput("");
              }}
              className={s.addButton}
            >
              Add Tag
            </button>
          </div>
          <TagsList
            tags={tags}
            onClick={(tag: string) => {
              setTags(tags.filter((t) => t !== tag));
            }}
          />
        </div>
        <div className={s.modalFooter}>
          <button
            onClick={() => {
              mutate({
                Tags: tags,
                Text: text,
                Status: Status.Todo,
              });
              onClose();
            }}
            className={s.button}
          >
            {isNew ? "Add Task" : "Save"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
