import { useState } from 'react';
import { useDao } from '../context/DaoContext';
import ProposalItem from './ProposalItem';

const ProposalList = () => {
  const { proposals, userAccount } = useDao();
  const [activeFilter, setActiveFilter] = useState('active');
  
  const filteredProposals = proposals.filter(proposal => {
    if (activeFilter === 'active') return proposal.status === 'active';
    if (activeFilter === 'passed') return proposal.status === 'passed';
    if (activeFilter === 'failed') return proposal.status === 'failed';
    return true;
  });
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Proposals</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and vote on governance proposals
        </p>
      </div>
      
      {!userAccount && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                Connect your wallet to vote on proposals.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap">
            {['all', 'active', 'passed', 'failed'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm ${
                  activeFilter === filter
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {filteredProposals.length > 0 ? (
            <div className="space-y-4">
              {filteredProposals.map(proposal => (
                <ProposalItem 
                  key={proposal.id} 
                  proposal={proposal} 
                  showVoting={activeFilter === 'active' || activeFilter === 'all'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-200">No proposals found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                There are no {activeFilter !== 'all' ? activeFilter : ''} proposals at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProposalList;
