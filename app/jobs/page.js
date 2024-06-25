import JobList from '@components/JobList';
import { Suspense } from 'react';
import Spinner from '@components/Spinner';
import Filter from '@components/Filter';

function Page({ searchParams }) {
  const filter = searchParams?.category ?? 'all';

  return (
    <div>
      <h1 className="mb-5 font-medium text-white text-7xl">
        Live <span className="text-accent-500">Jobs</span>
      </h1>
      <p className="mb-10 text-lg text-accent-50">
        We're looking for passionate people to partner with our excited and
        vetted clients. See if anything appeals to you!
      </p>

      <div className="flex justify-end gap-1 mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />}>
        <JobList filter={filter} />
      </Suspense>
    </div>
  );
}

export default Page;
