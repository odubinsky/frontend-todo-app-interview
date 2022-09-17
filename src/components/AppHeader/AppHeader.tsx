import s from "./AppHeader.module.scss";

export const AppHeader = ({}) => {
  return (
    <header className={s.appHeader}>
      <div className={s.appTitle}>My Tasks</div>
    </header>
  );
};
