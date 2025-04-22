import { useDao } from '../context/DaoContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { userAccount } = useDao();
  
  const navigation = [
    { name: 'Dashboard', key: 'dashboard', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )},
    { name: 'Proposals', key: 'proposals', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )},
    { name: 'Create Proposal', key: 'create-proposal', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ), requiresAuth: true },
    { name: 'Governance History', key: 'history', icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )}
  ];

  return (
    <aside className="bg-gray-100 dark:bg-gray-800 w-16 md:w-64 hidden sm:block">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => {
            if (item.requiresAuth && !userAccount) return null;
            
            return (
              <li key={item.key}>
                <button
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center p-2 w-full text-base font-normal rounded-lg ${
                    activeTab === item.key
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-700 dark:text-white'
                      : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="text-indigo-500 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  <span className="ml-3 hidden md:block">{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
