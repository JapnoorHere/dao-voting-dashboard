import { useState } from 'react';
import { useDao } from '../context/DaoContext';

const ProposalItem = ({ proposal, showVoting = false }) => {
  const { userAccount, userBalance, castVote } = useDao();
  const [expandDetails, setExpandDetails] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const totalVotes = proposal.votesFor + proposal.votesAgainst + proposal.votesAbstain;
  const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
  const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0;
  const abstainPercentage = totalVotes > 0 ? (proposal.votesAbstain / totalVotes) * 100 : 0;
  
  const quorumPercentage = proposal.quorum > 0 ? (totalVotes / proposal.quorum) * 100 : 0;
  
  const isExpired = new Date(proposal.deadline) < new Date();
  
  const formatDeadline = () => {
    const deadline = new Date(proposal.deadline);
    const now = new Date();
    const diffTime = Math.abs(deadline - now);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (deadline < now) {
      return 'Voting ended';
    }
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h left`;
    }
    
    return `${diffHours}h left`;
  };
  
  const handleVote = () => {
    if (!selectedVote || !userAccount || hasVoted) return;
    
    castVote(proposal.id, selectedVote);
    setHasVoted(true);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {proposal.title}
            </h3>
            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              proposal.status === 'active' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
              proposal.status === 'passed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
            </span>
          </div>
          <button
            onClick={() => setExpandDetails(!expandDetails)}
            className="ml-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            {expandDetails ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="mt-2">
          <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap items-center gap-4">
            <span>
              <span className="font-medium">Proposed by:</span> {proposal.proposer.substring(0, 6)}...{proposal.proposer.substring(proposal.proposer.length - 4)}
            </span>
            <span>
              <span className="font-medium">Deadline:</span> {formatDeadline()}
            </span>
            <span>
              <span className="font-medium">Total votes:</span> {totalVotes.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <div 
                style={{ width: `${forPercentage}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              ></div>
              <div 
                style={{ width: `${againstPercentage}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
              ></div>
              <div 
                style={{ width: `${abstainPercentage}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-400"
              ></div>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-3 text-xs text-gray-500 dark:text-gray-400">
            <div>For: {Math.round(forPercentage)}% ({proposal.votesFor.toLocaleString()})</div>
            <div className="text-center">Against: {Math.round(againstPercentage)}% ({proposal.votesAgainst.toLocaleString()})</div>
            <div className="text-right">Abstain: {Math.round(abstainPercentage)}% ({proposal.votesAbstain.toLocaleString()})</div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium">Quorum:</span> {Math.min(Math.round(quorumPercentage), 100)}% complete
          </div>
          <div className="mt-1 relative">
            <div className="overflow-hidden h-1 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
              <div 
                style={{ width: `${Math.min(quorumPercentage, 100)}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
          </div>
        </div>
        
        {expandDetails && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <p>{proposal.description}</p>
            </div>
          </div>
        )}
        
        {showVoting && proposal.status === 'active' && userAccount && !hasVoted && !isExpired && (
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedVote('for')}
                className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                  selectedVote === 'for'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                For
              </button>
              <button
                onClick={() => setSelectedVote('against')}
                className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                  selectedVote === 'against'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Against
              </button>
              <button
                onClick={() => setSelectedVote('abstain')}
                className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md ${
                  selectedVote === 'abstain'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Abstain
              </button>
              <button
                onClick={handleVote}
                disabled={!selectedVote}
                className="ml-auto inline-flex items-center px-4 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                Cast Vote ({userBalance.toLocaleString()} tokens)
              </button>
            </div>
          </div>
        )}
        
        {hasVoted && (
          <div className="mt-4 bg-green-50 dark:bg-green-900 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700 dark:text-green-200">
                  Your vote has been cast successfully!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalItem;
