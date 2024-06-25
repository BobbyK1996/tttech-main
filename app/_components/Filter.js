'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('category') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set('category', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All jobs
      </Button>
      <Button
        filter="devdesign"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Development & Design
      </Button>
      <Button
        filter="supinf"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Support & Infrastructure
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return <button onClick={() => handleFilter(filter)}>{children}</button>;
}

export default Filter;
