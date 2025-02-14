import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ApplicationModal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <button 
          onClick={onClose}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal; 