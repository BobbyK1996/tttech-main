import { Suspense } from 'react';

import { unstable_cache } from 'next/cache';

import { getCategories, getJobs } from '@lib/data-services';

import Filter from '@/app/_components/reusable/Filter';
import JobList from '@/app/_components/reusable/JobList';
import Spinner from '@/app/_components/reusable/Spinner';

const getCachedCategories = unstable_cache(
  async () => getCategories(),
  ['my-app-categories'],
  {
    revalidate: 10800,
    // revalidate: 10,
  }
);
const getCachedJobs = unstable_cache(async () => getJobs(), ['my-app-jobs'], {
  revalidate: 10800,
  // revalidate: 10,
});

async function Page({ searchParams }) {
  const jobs = await getCachedJobs();
  const categories = await getCachedCategories();

  const filter = searchParams?.category ?? 'all';

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
