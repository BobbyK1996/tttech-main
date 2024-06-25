import JobCard from '@components/JobCard';

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
    title: 'Golang Engineer 2',
    category: 'devdesign',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 3',
    category: 'devdesign',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 4',
    category: 'devdesign',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Remote', 'Development'],
  },
  {
    title: 'Golang Engineer 5',
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
  {
    title: '2nd Line Support 2',
    category: 'supinf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 3',
    category: 'supinf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 4',
    category: 'supinf',
    salaryMin: 50000,
    salaryMax: 60000,
    location: 'London',
    tags: ['Fulltime', 'Hybrid', 'Support'],
  },
  {
    title: '2nd Line Support 5',
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
];

function JobList({ filter }) {
  const categorizedJobs = categories.reduce((acc, cat) => {
    acc[cat.categoryTag] = [];
    return acc;
  }, {});

  jobs.forEach((job) => {
    if (categorizedJobs[job.category]) categorizedJobs[job.category].push(job);
  });

  return (
    <div className="w-9/12 mx-auto min-w-[300px]">
      {jobs.length === 0 && (
        <p className="flex justify-center mt-24 mb-10 text-lg font-bold text-accent-50">
          There doesn't appear to be any jobs available at the moment. Please
          try again later.
        </p>
      )}

      {Object.keys(categorizedJobs).map((categoryTag, index) => {
        if (
          categorizedJobs[categoryTag].length > 0 &&
          (filter === 'all' || filter === categoryTag)
        ) {
          const categoryTitleSplit = categories
            .find((cat) => cat.categoryTag === categoryTag)
            .categoryTitle.split(' ');

          const lastWord = categoryTitleSplit.pop();
          const titleWithoutLastWord = categoryTitleSplit.join(' ');

          return (
            <div key={index} className="my-10">
              <h1 className="pb-6 mb-10 text-5xl font-medium text-white border-b">
                {titleWithoutLastWord}{' '}
                <span className="text-accent-500">{lastWord}</span>
              </h1>
              <div className="grid grid-cols-1 gap-8 mb-16">
                {categorizedJobs[categoryTag].map((jobs, index) => (
                  <JobCard jobs={jobs} key={index} />
                ))}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default JobList;
