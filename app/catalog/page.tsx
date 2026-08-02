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
import Error from '../error';

export default function Catalog() {
  const [filters, setFilters] = useState<CamperFilters>({});

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
    refetch,
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
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
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
  const showNoResults = !isLoading && isFetched && !isError && !hasCampers;

  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <Container className={css.catalogPage}>
      <aside className={css.filtersWrap}>
        <button onClick={() => setFiltersOpen(!filtersOpen)} className={css.filtersBtn}>
          Filters
        </button>

        <div className={`${css.sidebarContainer} ${filtersOpen ? css.active : ''}`}>
          <Sidebar filters={filters} onSearch={setFilters} />
        </div>
      </aside>
      {isLoading && <Loader />}
      {isFetchingNextPage && <Loader />}
      {isError && <Error error={error} reset={refetch} />}
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
