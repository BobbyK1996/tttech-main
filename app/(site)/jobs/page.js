import { Suspense } from 'react';

import { unstable_cache } from 'next/cache';

import { getCategories, getJobs } from '@lib/data-services';

import Filter from '@components/reusable/Filter';
import JobList from '@components/reusable/JobList';
import Spinner from '@components/reusable/Spinner';

const getCachedJobData = unstable_cache(
  async () => {
    const [jobs, categories] = await Promise.all([getJobs(), getCategories()]);
    return { jobs, categories };
  },
  ['tttech-job-data'],
  { revalidate: 10800 }
);

async function Page({ searchParams }) {
  const { jobs, categories } = await getCachedJobData();
  const filter = searchParams.category ?? 'all';

  return (
    <div>
      <h1 className="mb-5 font-medium text-white text-7xl">
        Live <span className="text-accent-500">Jobs</span>
      </h1>
      <p className="mb-10 text-lg text-accent-50">
        We&apos;re looking for passionate people to partner with our excited and
        vetted clients. See if anything appeals to you!
      </p>

      <div className="flex justify-end gap-1 mb-8">
        <Filter categories={categories} />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <JobList filter={filter} jobs={jobs} categories={categories} />
      </Suspense>
    </div>
  );
}

export default Page;
