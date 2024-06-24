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
        <p className="mb-10 text-lg text-primary-200">
          There doesn't appear to be any available jobs at the moment. Please
          try again later
        </p>
      )}

      {devDesignJobs.length > 0 && (
        <>
          <h1>Development & Design</h1>
          <div className="grid grid-cols-1 gap-8 ">
            {devDesignJobs.map((job, index) => (
              <>
                <JobCard jobs={job} key={index} />
              </>
            ))}
          </div>
        </>
      )}

      {supInfJobs.length > 0 && (
        <>
          <h1>Support & Infrastructure</h1>
          <div className="grid grid-cols-1 gap-8 ">
            {supInfJobs.map((job, index) => (
              <>
                <JobCard jobs={job} key={index} />
              </>
            ))}
          </div>
        </>
      )}

      {/* {devDesignJobs.length > 0 && (
        <>
          <h1>Development & Design</h1>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:gap-14 4k:grid-cols-4">
            {devDesignJobs.map((job, index) => (
              <>
                <JobCard jobs={job} key={index} />
              </>
            ))}
          </div>
        </>
      )}

      {supInfJobs.length > 0 && (
        <>
          <h1>Support & Infrastructure</h1>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 xl:gap-14 4k:grid-cols-4">
            {supInfJobs.map((job, index) => (
              <>
                <JobCard jobs={job} key={index} />
              </>
            ))}
          </div>
        </>
      )} */}
    </div>
  );
}

export default JobList;
