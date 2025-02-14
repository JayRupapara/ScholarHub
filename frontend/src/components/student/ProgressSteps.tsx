import React from 'react';

interface Step {
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal w-full">
      {steps.map((step, index) => (
        <li 
          key={index} 
          className={`step 
            ${index < currentStep ? 'step-primary' : ''} 
            ${index === currentStep ? 'step-primary animate-pulse' : ''}
          `}
          data-content={index < currentStep ? "✓" : (index + 1)}
        >
          <div className="hidden md:block">
            <p className="text-sm font-medium">{step.title}</p>
            <p className="text-xs text-base-content/70">{step.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProgressSteps; 