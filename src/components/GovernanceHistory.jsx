import { useDao } from '../context/DaoContext';

const GovernanceHistory = () => {
  const { history } = useDao();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Governance History</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Timeline of past governance decisions and their outcomes
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Past Proposals
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            Record of all previous proposals and their results
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              {history.map((item, index) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {index < history.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true"></span>
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                          item.result === 'passed' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                          {item.result === 'passed' ? (
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                            {new Date(item.date).toLocaleDateString()} • 
                            <span className={`ml-1 ${
                              item.result === 'passed' ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {item.result.charAt(0).toUpperCase() + item.result.slice(1)}
                            </span>
                          </p>
                        </div>
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                          <p>{item.description}</p>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>For: {item.votesFor.toLocaleString()}</span>
                            <svg className="flex-shrink-0 ml-4 mr-1.5 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>Against: {item.votesAgainst.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernanceHistory;
