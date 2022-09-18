import { createPortal } from "react-dom";
import { useState } from "react";
import s from "./FieldsModal.module.scss";
import { TagsList } from "components/Tag/TagsList";
import { useCreateTodo, useUpdateTodo } from "hooks/todosQuery";
import cx from 'classnames';

export const FieldsModal = ({
  fieldsmodalData,
  onClose,
}: 
{
  fieldsmodalData: ToDo | newToDo;
  onClose: () => void;
}) => {
  const [tags, setTags] = useState(fieldsmodalData.fields.Tags);
  const [text, setText] = useState(fieldsmodalData.fields.Text);
  const [tagInput, setTagInput] = useState("");

  const isNew = !(fieldsmodalData as ToDo).id;
  const createMutation = useCreateTodo();
  const updateMutation = useUpdateTodo();

  return createPortal(
    <div className={s.modalBackground} onClick={onClose}>
      <div
        className={s.modal}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={s.modalHeader}>
          <h1 className={s.modalTitle}>
            {isNew ? "Add New Task" : "Edit Task"}
          </h1>
          <button onClick={onClose} className={cx(s.closeButton, s.button)}>
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
              className={cx(s.addTagButton, s.button)}
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
              const payload = {
                id: (fieldsmodalData as ToDo).id,
                fields: {
                  Text: text,
                  Tags: tags,
                  Status: fieldsmodalData.fields.Status,
                },
              };
              isNew
                ? createMutation.mutate(payload)
                : updateMutation.mutate(payload);
              onClose();
            }}
            className={cx(s.saveButton, s.button)}
          >
            {isNew ? "Add Task" : "Save"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
