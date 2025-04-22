import { createContext, useState, useEffect, useContext } from 'react';

const mockProposals = [
  {
    id: 1,
    title: 'Increase Developer Grants Budget',
    description: 'Allocate an additional 50,000 tokens to the developer grants program to support new projects.',
    proposer: '0x1234...5678',
    status: 'active',
    votesFor: 230000,
    votesAgainst: 45000,
    votesAbstain: 25000,
    quorum: 250000,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
  },
  {
    id: 2,
    title: 'Protocol Upgrade v2.5',
    description: 'Implement proposed protocol changes to improve security and reduce gas costs.',
    proposer: '0xabcd...efgh',
    status: 'active',
    votesFor: 180000,
    votesAgainst: 120000,
    votesAbstain: 10000,
    quorum: 300000,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: 'Treasury Diversification',
    description: 'Convert 15% of treasury holdings to stablecoins to reduce volatility.',
    proposer: '0x7890...1234',
    status: 'passed',
    votesFor: 420000,
    votesAgainst: 180000,
    votesAbstain: 50000,
    quorum: 400000,
    deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), 
  },
  {
    id: 4,
    title: 'Community Events Budget',
    description: 'Allocate 20,000 tokens for community events and meetups in Q3.',
    proposer: '0xdef0...9876',
    status: 'failed',
    votesFor: 150000,
    votesAgainst: 350000,
    votesAbstain: 30000,
    quorum: 400000,
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), 
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), 
  },
];

const mockHistory = [
  {
    id: 101,
    title: 'Governance Parameter Update',
    description: 'Reduced proposal threshold from 100,000 to 50,000 tokens',
    result: 'passed',
    votesFor: 680000,
    votesAgainst: 120000,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), 
  },
  {
    id: 102,
    title: 'Strategic Partnership with ChainLink',
    description: 'Approved strategic partnership to integrate oracle services',
    result: 'passed',
    votesFor: 720000,
    votesAgainst: 80000,
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), 
  },
  {
    id: 103,
    title: 'Emergency Fund Creation',
    description: 'Created 1M token emergency fund for protocol vulnerabilities',
    result: 'passed',
    votesFor: 810000,
    votesAgainst: 190000,
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), 
  },
  {
    id: 104,
    title: 'Fee Structure Revision',
    description: 'Proposal to increase transaction fees by 0.1%',
    result: 'failed',
    votesFor: 320000,
    votesAgainst: 680000,
    date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), 
  },
];

const mockStats = {
  totalProposals: 27,
  activeProposals: 2,
  passRate: 78,
  tokensLocked: 1450000,
  tokenSymbol: 'DAO',
  treasuryBalance: 4500000,
  memberCount: 3782,
  votingPower: 35000 
};

const DaoContext = createContext();

export function DaoProvider({ children }) {
  const [userAccount, setUserAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [proposals, setProposals] = useState(mockProposals);
  const [history, setHistory] = useState(mockHistory);
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const connectWallet = async () => {
    try {
      setIsLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUserAccount('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
      setUserBalance(35000);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setUserAccount(null);
    setUserBalance(0);
  };

  const submitProposal = (proposal) => {
    const newProposal = {
      id: Date.now(),
      proposer: userAccount,
      status: 'active',
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      quorum: 300000,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
      createdAt: new Date().toISOString(),
      ...proposal
    };
    
    setProposals(prev => [newProposal, ...prev]);
    return newProposal;
  };

  const castVote = (proposalId, voteType) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        const votePower = userBalance;
        
        if (voteType === 'for') {
          return { ...p, votesFor: p.votesFor + votePower };
        } else if (voteType === 'against') {
          return { ...p, votesAgainst: p.votesAgainst + votePower };
        } else {
          return { ...p, votesAbstain: p.votesAbstain + votePower };
        }
      }
      return p;
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProposals(prev => prev.map(p => {
        if (p.status === 'active') {
          const forIncrease = Math.floor(Math.random() * 1000);
          const againstIncrease = Math.floor(Math.random() * 500);
          const abstainIncrease = Math.floor(Math.random() * 200);
          
          return {
            ...p,
            votesFor: p.votesFor + forIncrease,
            votesAgainst: p.votesAgainst + againstIncrease,
            votesAbstain: p.votesAbstain + abstainIncrease
          };
        }
        return p;
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DaoContext.Provider 
      value={{
        userAccount,
        userBalance,
        proposals,
        history,
        stats,
        isLoading,
        error,
        darkMode,
        connectWallet,
        disconnectWallet,
        submitProposal,
        castVote,
        toggleDarkMode
      }}
    >
      {children}
    </DaoContext.Provider>
  );
}

export function useDao() {
  return useContext(DaoContext);
}
