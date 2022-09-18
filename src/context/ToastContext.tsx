import { Toast } from 'components/Toast';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { IToast } from 'components/Toast';

const ToastContext = React.createContext({} as ToastContextValue);

type ToastContextValue = {
  triggerToast: (toast: IToast) => void;
};


export interface IToastData extends IToast {
  isShown: boolean;
}

export const ToastProvider = ({
  children,
}: {
  children: any;
}) => {
  const [toastData, setToastData] = useState<IToastData>({ isShown: false });

  const showToast = (newToastData?: IToast) => {
    setToastData({ ...(newToastData || toastData), isShown: true });
  };

  const hideToast = useCallback(() => {
    if (toastData.isShown) {
      setToastData({ ...toastData, isShown: false });
    }
  }, [toastData]);

  const triggerToast = (toast: IToast) => {
    showToast(toast);
  };

  const { content, skin, isShown } = toastData;

  useEffect(() => {
    const timer = setTimeout(() => {
      hideToast();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [toastData.isShown, hideToast]);

  return (
    <ToastContext.Provider
      value={{
        triggerToast,
      }}
    >
      {isShown &&
        createPortal(
          <Toast content={content} skin={skin} />,
          document.body,
        )}
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};