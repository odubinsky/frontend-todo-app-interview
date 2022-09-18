import { AppHeader } from "components/AppHeader/AppHeader";
import { ToDoItemsList } from "components/ToDoItemsList";
import { useAppContext } from "context/AppContext";
import st from './App.module.scss';

export const App = ({}) => {


  return (
    <div className={st.app}>
      <AppHeader />
      <ToDoItemsList />
    </div>
  );
}

export default App;
