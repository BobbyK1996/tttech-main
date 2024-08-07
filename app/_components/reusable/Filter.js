'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Filter({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('category') ?? 'all';

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);

    params.set('category', filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
      shallow: true,
    });
  }
  // console.log('from filter', categories);

  return (
    <div className="flex flex-col border rounded-md border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All
      </Button>
      {categories.map((cat, index) => (
        <Button
          key={index}
          filter={cat.categoryTag}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {cat.categoryTitle}
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`${
        filter === activeFilter ? 'bg-primary-700' : ''
      } px-5 py-2 hover:bg-primary-700`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
