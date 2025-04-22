// App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProposalForm from './components/ProposalForm';
import ProposalList from './components/ProposalList';
import GovernanceHistory from './components/GovernanceHistory';
import { DaoProvider } from './context/DaoContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <DaoProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-1">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main className="flex-1 p-4 md:p-6">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'proposals' && <ProposalList />}
            {activeTab === 'create-proposal' && <ProposalForm />}
            {activeTab === 'history' && <GovernanceHistory />}
          </main>
        </div>
      </div>
    </DaoProvider>
  );
}

export default App;
