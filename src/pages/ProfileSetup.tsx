import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const steps = ['Personal Info', 'Education', 'Achievements', 'Financial Info'];

export function ProfileSetup() {
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

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      handleSubmit();
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // TODO: Submit profile data to backend
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save profile', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm formData={formData} setFormData={setFormData} />;
      case 1:
        return <EducationForm formData={formData} setFormData={setFormData} />;
      case 2:
        return <AchievementsForm formData={formData} setFormData={setFormData} />;
      case 3:
        return <FinancialForm formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4">
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
    </div>
  );
} 