import s from "./AppHeader.module.scss";
import { ApiKeyInput } from "components/ApiKeyInput";

export const AppHeader = ({}) => {
  return (
    <header className={s.appHeader}>
      <div className={s.apiKeyInput}><ApiKeyInput /></div>
      <div className={s.appTitle}>My Tasks</div>
    </header>
  );
};
