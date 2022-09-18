import s from "./SearchField.module.scss";
import { useAppContext } from "context/AppContext";
import { useQueryClient } from "react-query";

export const SearchField = ({}) => {
  const { filter, setFilter } = useAppContext();
  const queryClient = useQueryClient();
  return (
    <div>
      <span>Search: </span>
      <input
        value={filter.prefix}
        onChange={(e) => {
          setFilter({ ...filter, prefix: e.target.value });
        }}
        className={s.input}
        type="text"
      />
    </div>
  );
};
