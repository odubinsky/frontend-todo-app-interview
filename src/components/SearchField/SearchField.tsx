import s from "./SearchField.module.scss";
import { AppContext } from "context/AppContext";
import { useContext } from "react";

export const SearchField = ({}) => {
  const { filter, setFilter } = useContext(AppContext);

  return (
    <div>
      <span>Search: </span>
      <input
        value={filter.prefix}
        onChange={(e) => setFilter({ ...filter, prefix: e.target.value })}
        className={s.input}
        type="text"
      />
    </div>
  );
};
