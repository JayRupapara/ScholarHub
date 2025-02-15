import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface ScholarshipDeadline {
  date: string;
  title: string;
  amount: number;
  description: string;
}

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Sample scholarship deadlines data
  const scholarshipDeadlines: ScholarshipDeadline[] = [
    { 
      date: '2024-03-15', 
      title: 'STEM Excellence Scholarship', 
      amount: 10000,
      description: 'For outstanding students in STEM fields'
    },
    { 
      date: '2024-03-20', 
      title: 'Global Leaders Fund', 
      amount: 15000,
      description: 'Supporting future international leaders'
    },
    { 
      date: '2024-03-25', 
      title: 'Creative Arts Grant', 
      amount: 7500,
      description: 'For talented artists and performers'
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const hasDeadline = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return scholarshipDeadlines.some(deadline => 
      new Date(deadline.date).toDateString() === date.toDateString()
    );
  };

  const getDeadlinesForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return scholarshipDeadlines.filter(deadline => 
      new Date(deadline.date).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={prevMonth}
                className="btn btn-ghost btn-circle text-accent hover:bg-neutral"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-primary">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <button
                onClick={nextMonth}
                className="btn btn-ghost btn-circle text-accent hover:bg-neutral"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="rounded-lg overflow-hidden bg-base-100 border border-base-200">
              <div className="grid grid-cols-7 border-b border-base-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-2 text-center text-sm font-medium text-accent">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="p-4 border-b border-r border-base-200" />
                ))}
                {Array.from({ length: days }).map((_, index) => {
                  const day = index + 1;
                  const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                  const deadlinesForDay = getDeadlinesForDay(day);
                  
                  return (
                    <div
                      key={day}
                      className={`min-h-[120px] p-2 border-b border-r border-base-200 ${
                        isToday ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          isToday ? 'bg-primary text-white' : ''
                        }`}>
                          {day}
                        </span>
                      </div>
                      
                      {deadlinesForDay.length > 0 && (
                        <div className="mt-2">
                          {deadlinesForDay.map((deadline, idx) => (
                            <div
                              key={idx}
                              className="mb-1 p-1.5 rounded bg-error/10 hover:bg-error/20 transition-colors cursor-pointer"
                            >
                              <div className="text-xs font-medium text-error truncate">
                                {deadline.title}
                              </div>
                              <div className="text-[10px] text-error/80 flex items-center gap-1 mt-0.5">
                                <Clock className="h-3 w-3" />
                                <span>Ends Today</span>
                                <span className="ml-auto font-medium">
                                  ₹{deadline.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-primary mb-4">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {scholarshipDeadlines
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((deadline, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-base-100 border border-base-200 rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-lg bg-error/10">
                          <Clock className="h-5 w-5 text-error" />
                        </div>
                        <div>
                          <p className="font-medium text-accent">{deadline.title}</p>
                          <p className="text-sm text-base-content/70">{deadline.description}</p>
                          <div className="flex items-center space-x-2 text-sm text-error">
                            <span>Deadline: {new Date(deadline.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-success/10 text-success">
                        ₹{deadline.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 