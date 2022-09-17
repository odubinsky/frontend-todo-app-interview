
import { AppContext } from 'context/AppContext';
import { useContext } from 'react';
import s from './AddButton.module.scss'

export const AddButton = ({}) => {
  const { openFieldsModal } = useContext(AppContext);
  

  return (
    <li onClick={() => openFieldsModal()} className={s.addButton}>
      +
      Add Task
    </li>
  );
}