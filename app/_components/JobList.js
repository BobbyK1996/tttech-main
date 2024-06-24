import JobCard from '@components/JobCard';

const jobs = [
  {
    title: 'Golang Engineer 1',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: 'Golang Engineer 2',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: 'Golang Engineer 3',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: 'Golang Engineer 4',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: 'Golang Engineer 5',
    category: 'dev&design',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: '2nd Line Support 1',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: '2nd Line Support 2',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: '2nd Line Support 3',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: '2nd Line Support 4',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
  {
    title: '2nd Line Support 5',
    category: 'sup&inf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    technologies: ['Golang', 'GCP', 'AWS', 'Micro-services'],
  },
];

function JobList() {
  // const devDesignJobs = jobs.filter((job) => job.category === 'dev&design');
  // const supInfJobs = jobs.filter((job) => job.category === 'sup&inf');

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

  // console.log(devDesignJobs);
  // console.log(supInfJobs);

  return (
    <div>
      {devDesignJobs.length > 0 && (
        <>
          <h1>Development & Design</h1>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
            {devDesignJobs.map((job, index) => (
              <>
                {/* <h1>job</h1> */}
                <JobCard jobs={job} key={index} />
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default JobList;
