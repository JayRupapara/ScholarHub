import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

const AlertMessage = ({ type, message, duration = 5000, onClose }: AlertMessageProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircle className="h-6 w-6" />,
    error: <XCircle className="h-6 w-6" />,
    warning: <AlertCircle className="h-6 w-6" />,
    info: <AlertCircle className="h-6 w-6" />
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`alert alert-${type} shadow-lg`}>
        <div>
          {icons[type]}
          <span>{message}</span>
        </div>
        <div className="flex-none">
          <button onClick={() => {
            setIsVisible(false);
            onClose?.();
          }} className="btn btn-ghost btn-sm">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage; 