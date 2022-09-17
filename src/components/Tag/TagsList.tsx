import { Tag } from './Tag'
import s from './Tag.module.scss'

export const TagsList = ({ tags, onClick }: { tags: string[], onClick: (tag: string) => void }) => {
  return (
    <div className={s.tagsList}>
      {tags.map((tag) => (
        <Tag tag={tag} onClick={onClick} />
      ))}
    </div>
  )
}