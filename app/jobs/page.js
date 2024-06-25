import JobList from '../_components/JobList';

function Page() {
  return (
    <div>
      <h1 className="mb-5 font-medium text-white text-7xl">
        Live <span className="text-accent-500">Jobs</span>
      </h1>
      <p className="mb-10 text-lg text-accent-50">
        We're looking for passionate people to partner with our excited and
        vetted clients. See if anything appeals to you!
      </p>

      <JobList />
    </div>
  );
}

export default Page;
