import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip = ({ text, children, position = 'top' }: TooltipProps) => {
  return (
    <div className={`tooltip tooltip-${position}`} data-tip={text}>
      {children}
    </div>
  );
};

export default Tooltip; 