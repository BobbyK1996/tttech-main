import JobCard from '@components/JobCard';

const jobs = [
  {
    title: 'Golang Engineer 1',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 2',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 3',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 4',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 5',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: '2nd Line Support 1',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 2',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 3',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 4',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 5',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
];

// const jobs = [];
function JobList() {
  const { devDesignJobs, supInfJobs } = jobs.reduce(
    (acc, job) => {
      if (job.category === 'dev&design') {
        acc.devDesignJobs.push(job);
      } else if (job.category === 'sup&inf') {
        acc.supInfJobs.push(job);
      }
      return acc;
    },
    { devDesignJobs: [], supInfJobs: [] }
  );

  return (
    <div className="w-9/12 mx-auto min-w-[300px]">
      {jobs.length === 0 && (
        <p className="flex justify-center mt-24 mb-10 text-lg font-bold text-accent-50">
          There doesn't appear to be any jobs available at the moment. Please
          try again later.
        </p>
      )}

      {devDesignJobs.length > 0 && (
        <>
          <h1 className="pb-6 mb-10 text-5xl font-medium text-white border-b">
            Development <span className="text-accent-500">& Design</span>
          </h1>
          <div className="grid grid-cols-1 gap-8 mb-16">
            {devDesignJobs.map((job, index) => (
              <JobCard jobs={job} key={index} />
            ))}
          </div>
        </>
      )}

      {supInfJobs.length > 0 && (
        <>
          <h1 className="pb-6 mb-10 text-5xl font-medium text-white border-b">
            Support <span className="text-accent-500">& Infrastructure</span>
          </h1>
          <div className="grid grid-cols-1 gap-8 ">
            {supInfJobs.map((job, index) => (
              <JobCard jobs={job} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default JobList;
