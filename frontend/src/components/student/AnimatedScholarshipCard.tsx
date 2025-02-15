import React from 'react';
import { Award, Calendar, DollarSign } from 'lucide-react';

interface ScholarshipCardProps {
  title: string;
  amount: number;
  deadline: string;
  description: string;
  requirements: any;
  onApply: () => void;
}

const AnimatedScholarshipCard = ({
  title,
  amount,
  deadline,
  description,
  requirements,
  onApply
}: ScholarshipCardProps) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-primary">{title}</h2>
          <div className="badge badge-secondary animate-pulse">New</div>
        </div>

        <p className="text-base-content/70">{description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {requirements.academic && (
            <div className="badge badge-outline">Academic: {requirements.academic.highestQualification.join(', ')}</div>
          )}
          {/* {requirements.category && requirements.category.map((cat, idx) => (
            <div key={idx} className="badge badge-outline">Category: {cat}</div>
          ))} */}
          <div className="badge badge-outline">Disability: {requirements.disability ? 'Yes' : 'No'}</div>
          <div className="badge badge-outline">Max Income: ₹{requirements.maxIncome}</div>
          <div className="badge badge-outline">Other Requirements: {requirements.otherRequirements}</div>
        </div>

        <div className="divider"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-success">
              ₹{amount.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-warning" />
            <span className="text-sm">Due: {new Date(deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-primary btn-outline"
            onClick={() => onApply()}
          >
            Learn More
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onApply()}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedScholarshipCard; 