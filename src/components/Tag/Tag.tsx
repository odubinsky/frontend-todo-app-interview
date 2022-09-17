import s from "./Tag.module.scss";

export const Tag = ({
  tag,
  onClick
}: {
  tag: string;
  onClick: (tag: string) => void;
}) => {
  return (
    <span
      onClick={() => onClick(tag)}
      className={s.tag}
    >
      {tag}
    </span>
  );
};
