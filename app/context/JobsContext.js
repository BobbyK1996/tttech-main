'use client';

import { createContext, useContext, useMemo } from 'react';

const JobsContext = createContext();

function JobsProvider({ children }) {
  const jobs = [
    {
      title: 'Golang Engineer 1',
      category: 'devdesign',
      salaryMin: 50000,
      salaryMax: 60000,
      location: 'London',
      tags: ['Fulltime', 'Remote', 'Development'],
    },
    {
      title: '2nd Line Support 1',
      category: 'supinf',
      salaryMin: 50000,
      salaryMax: 60000,
      location: 'London',
      tags: ['Fulltime', 'Hybrid', 'Support'],
    },
  ];

  const categories = [
    { categoryTitle: 'Development & Design', categoryTag: 'devdesign' },
    { categoryTitle: 'Support & Infrastructure', categoryTag: 'supinf' },
    // { categoryTitle: 'Data & SaaS', categoryTag: 'datasaas' },
  ];

  const value = useMemo(() => ({ jobs, categories }), [jobs, categories]);

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}

function useJobs() {
  const context = useContext(JobsContext);

  if (context === undefined)
    throw new Error('Context was used outside of JobsProvider');

  return context;
}

export { JobsProvider, useJobs };
