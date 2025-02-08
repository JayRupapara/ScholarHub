'use client';

export default function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Resources</h1>
        <p className="text-gray-600">Helpful information for your scholarship journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resource Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Application Tips</h2>
          <p className="text-gray-600 mb-4">Learn how to create strong scholarship applications</p>
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Learn more →</a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Essay Writing Guide</h2>
          <p className="text-gray-600 mb-4">Tips for writing compelling scholarship essays</p>
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Learn more →</a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Aid Basics</h2>
          <p className="text-gray-600 mb-4">Understanding financial aid and scholarships</p>
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Learn more →</a>
        </div>
      </div>
    </div>
  );
} 