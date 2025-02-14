import { toast, Toast } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'info';

export const useToast = () => {
  const showToast = (message: string, type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message, {
          duration: 3000,
          position: 'top-right',
        });
        break;
      case 'error':
        toast.error(message, {
          duration: 3000,
          position: 'top-right',
        });
        break;
      default:
        toast(message, {
          duration: 3000,
          position: 'top-right',
        });
    }
  };

  return { showToast };
}; 