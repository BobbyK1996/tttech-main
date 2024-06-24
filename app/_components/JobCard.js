function JobCard({ jobs }) {
  const { title, salaryMin, salaryMax, location, technologies } = jobs;
  return (
    <div className="flex border border-primary-800">
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-2xl font-semibold mc-3 text-accent-500">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
