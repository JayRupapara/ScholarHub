import React from 'react';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert alert-${type}`}>
        <div>
          <span>{message}</span>
          <button onClick={onClose} className="btn btn-circle btn-xs">✕</button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 