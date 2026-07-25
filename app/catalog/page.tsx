'use client';
import CatalogCard from '@/components/CatalogCard/CatalogCard';
import { Container } from '@/components/Container/Container';
import Sidebar from '@/components/Sidebar/Sidebar';
import { getCampersList } from '@/lib/api';
import { CamperFilters } from '@/types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import css from './page.module.css';
import Loader from './loading';
import CatalogNotFound from '@/components/CatalogNotFound/CatalogNotFound';

export default function Catalog() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
    isFetched,
  } = useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ queryKey, pageParam }) => {
      const [, currentFilters] = queryKey as [string, CamperFilters];
      return getCampersList(currentFilters, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: lastResponse => {
      const nextPage = lastResponse.page + 1;
      return nextPage < lastResponse.totalPages ? nextPage : undefined;
    },
    select: data => {
      return {
        ...data,
        campers: data.pages.flatMap(page => page.campers),
      };
    },
  });

  const campers = data?.campers ?? [];
  const hasCampers = campers.length > 0;
  const showNoResults = isFetched && !isError && !hasCampers;

  return (
    <Container className={css.catalogPage}>
      <aside>
        <Sidebar filters={filters} onSearch={setFilters} />
      </aside>
      {isLoading && <Loader />}
      {isFetchingNextPage && <Loader />}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {showNoResults && <CatalogNotFound noResults={() => setFilters({})} />}
      {!isError && (
        <div className={css.catalogBtnWrap}>
          <ul className={css.catalogList}>
            {hasCampers &&
              campers.map(item => {
                return <CatalogCard key={item.id} camper={item} />;
              })}
          </ul>
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className={css.loadBtn}
              type="button"
              disabled={!hasNextPage || isFetching}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </button>
          )}
        </div>
      )}
    </Container>
  );
}
