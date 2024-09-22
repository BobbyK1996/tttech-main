'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function Filter({ categories = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('category') ?? 'all';

  const handleFilter = useCallback(
    (filter) => {
      const params = new URLSearchParams(searchParams);

      if (filter === 'all') {
        params.delete('category');
      } else {
        params.set('category', filter);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(newUrl, {
        scroll: false,
        shallow: true,
      });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="flex flex-col border rounded-md border-primary-800">
      <Button filter="all" onFilter={handleFilter} activeFilter={activeFilter}>
        All
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat.id}
          filter={cat.categoryTag}
          onFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {cat.categoryTitle}
        </Button>
      ))}
    </div>
  );
}

function Button({ filter, onFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? 'bg-primary-700' : ''
      }`}
      onClick={() => onFilter(filter)}
      aria-pressed={filter === activeFilter}
    >
      {children}
    </button>
  );
}

export default Filter;
