import { TagsList } from "components/Tag/TagsList";
import { useAppContext } from "context/AppContext";

export const TagFilter = ({}) => {
  const {filter, setFilter} = useAppContext();

  return (
    <div>
      <span>Filter by tags: </span>
      {filter.tags.length > 0 ? <TagsList tags={filter.tags} onClick={(tag) => {
        setFilter({...filter, tags: filter.tags.filter(t => t !== tag)})
      }} /> : <span>{`(Click on tag to add)`}</span>}
    </div>
  );
};