

import s from './Toast.module.scss';
import type { IToast } from './Toast.types';
import cx from 'classnames';

export const Toast = (toast: IToast) => {
  
  const toastSkin = toast.skin || 'info';

  return <div className={cx(s.toast, s[toastSkin])}>
    <span>{toast.content}</span>
</div>
}