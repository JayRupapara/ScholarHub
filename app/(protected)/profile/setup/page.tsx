'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PersonalInfoForm } from '@/app/components/profile/PersonalInfoForm';

const steps = ['Personal Info', 'Education', 'Achievements', 'Financial Info'];

export default function ProfileSetupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      citizenship: '',
      gender: '',
    },
    education: [{
      level: 'undergraduate',
      school: '',
      major: '',
      gpa: '',
      graduationYear: '',
    }],
    achievements: {
      awards: [''],
      extracurricular: [''],
      volunteer: [''],
    },
    financialInfo: {
      needsBasedAid: false,
      householdIncome: '',
      dependents: '',
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // TODO: Submit profile data to backend
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm formData={formData} setFormData={setFormData} />;
      // Add other form components for remaining steps
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex-1 ${
                index < steps.length - 1 ? 'relative' : ''
              }`}
            >
              <div
                className={`h-2 ${
                  index <= currentStep
                    ? 'bg-indigo-600'
                    : 'bg-gray-200'
                }`}
              />
              <div className="mt-2 text-sm text-center">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">{steps[currentStep]}</h2>
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
} 