import { TagsList } from "components/Tag/TagsList";
import { AppContext } from "context/AppContext";
import { useContext } from "react";




export const TagFilter = ({}) => {
  const {filter, setFilter} = useContext(AppContext)

  return (
    <div>
      <span>Filter by tags: </span>
      {filter.tags.length > 0 ? <TagsList tags={filter.tags} onClick={(tag) => {
        setFilter({...filter, tags: filter.tags.filter(t => t !== tag)})
      }} /> : <span>{`(Click on tag to add)`}</span>}
    </div>
  );
};