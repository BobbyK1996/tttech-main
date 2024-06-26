import JobCard from '@components/JobCard';

function JobList({ filter, jobs, categories }) {
  const categorizedJobs = categories.reduce((acc, cat) => {
    acc[cat.categoryTag] = [];
    return acc;
  }, {});

  jobs.forEach((job) => {
    if (categorizedJobs[job.category]) categorizedJobs[job.category].push(job);
  });

  const renderCategory = (categoryTag, index) => {
    if (categorizedJobs[categoryTag].length === 0 && filter === categoryTag) {
      return (
        <p
          key={index}
          className="flex justify-center mt-24 mb-10 text-lg font-bold text-accent-50"
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
        <div key={categoryTag} className="my-10">
          <h1 className="pb-6 mb-10 text-5xl font-medium text-white border-b">
            {titleWithoutLastWord}{' '}
            <span className="text-accent-500">{lastWord}</span>
          </h1>
          <div className="grid grid-cols-1 gap-8 mb-16">
            {categorizedJobs[categoryTag].map((jobs) => (
              <JobCard jobs={jobs} key={jobs.id} />
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
        <p className="flex justify-center mt-24 mb-10 text-lg font-bold text-accent-50">
          There doesn&apos;t appear to be any jobs available at the moment.
          Please try again later.
        </p>
      )}
      {Object.keys(categorizedJobs).map((categoryTag, index) =>
        renderCategory(categoryTag, index)
      )}
    </div>
  );
}

export default JobList;
