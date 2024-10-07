import JobCard from '@components/reusable/JobCard';

function JobList({ filter, jobs, categories }) {
  const categorizedJobs = categories.reduce((acc, cat) => {
    acc[cat.categoryTag] = [];
    return acc;
  }, {});

  jobs.forEach((job) => {
    if (categorizedJobs[job.Industry]) categorizedJobs[job.Industry].push(job);
  });

  const renderCategory = (categoryTag, index) => {
    if (categorizedJobs[categoryTag].length === 0 && filter === categoryTag) {
      return (
        <p
          key={index}
          className='mb-10 mt-24 flex justify-center text-lg font-bold text-accent-50'
        >
          There doesn&apos;t appear to be any jobs available at the moment.
          Please try again later.
        </p>
      );
    }

    if (
      (filter === 'all' || filter === categoryTag) &&
      categorizedJobs[categoryTag].length !== 0
    ) {
      const categoryTitleSplit = categories
        .find((cat) => cat.categoryTag === categoryTag)
        .categoryTitle.split(' ');

      const lastWord = categoryTitleSplit.pop();
      const titleWithoutLastWord = categoryTitleSplit.join(' ');

      return (
        <div key={categoryTag} className='my-10'>
          <h1 className='mb-10 border-b pb-6 text-5xl font-medium text-white'>
            {titleWithoutLastWord}{' '}
            <span className='text-accent-500'>{lastWord}</span>
          </h1>
          <div className='mb-16 grid grid-cols-1 gap-8'>
            {categorizedJobs[categoryTag].map((job) => (
              <JobCard job={job} key={job.id} />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {jobs.length === 0 && filter === 'all' && (
        <p className='mb-10 mt-24 flex justify-center text-lg font-bold text-accent-50'>
          There doesn&apos;t appear to be any jobs available at the moment.
          Please try again later.
        </p>
      )}
      {Object.keys(categorizedJobs).map((categoryTag, index) =>
        renderCategory(categoryTag, index),
      )}
    </div>
  );
}

export default JobList;
