import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function ProjectRegistrationPage() {
  const [formData, setFormData] = useState({
    title: '',
    type: 'BTP (B.Tech Project)',
    supervisor: 'Dr. Sharma - Computer Science',
    description: '',
    teamMembers: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter a project title');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Please provide a project description');
      return;
    }

    // Simulate submission
    toast.success('Project registered successfully!', {
      description: `Your ${formData.type} has been registered with ${formData.supervisor.split(' - ')[0]}`
    });
    
    // Reset form
    setFormData({
      title: '',
      type: 'BTP (B.Tech Project)',
      supervisor: 'Dr. Sharma - Computer Science',
      description: '',
      teamMembers: ''
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Project Registration</h2>
          <p className="text-sm text-gray-500 mt-1">Register your project details</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
              <input 
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>BTP (B.Tech Project)</option>
                <option>Internship Project</option>
                <option>Research Project</option>
                <option>Independent Study</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor</label>
              <select 
                value={formData.supervisor}
                onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Dr. Sharma - Computer Science</option>
                <option>Dr. Verma - Artificial Intelligence</option>
                <option>Dr. Gupta - Data Science</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
              <textarea 
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Provide a brief description of your project..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team Members (if any)</label>
              <input 
                type="text"
                value={formData.teamMembers}
                onChange={(e) => setFormData({ ...formData, teamMembers: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter student IDs separated by commas"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setFormData({ title: '', type: 'BTP (B.Tech Project)', supervisor: 'Dr. Sharma - Computer Science', description: '', teamMembers: '' })}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800">
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}