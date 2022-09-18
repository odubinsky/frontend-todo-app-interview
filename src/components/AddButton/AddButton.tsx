
import { AppContext, useAppContext } from 'context/AppContext';
import s from './AddButton.module.scss'

export const AddButton = ({}) => {
  const { openFieldsModal } = useAppContext();
  

  return (
    <li onClick={() => openFieldsModal()} className={s.addButton}>
      +
      Add Task
    </li>
  );
}