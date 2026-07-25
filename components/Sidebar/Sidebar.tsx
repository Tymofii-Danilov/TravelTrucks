'use client';
import { getCampersFilters } from '@/lib/api';
import css from './Sidebar.module.css';
import { CamperFilters, CamperFiltersInit } from '@/types/types';
import { Field, Form, Formik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { formatFilterLabel } from '@/tools/format';

type Props = {
  onSearch: (filters: CamperFilters) => void;
  filters: CamperFiltersInit;
};

export default function Sidebar({ onSearch, filters }: Props) {
  const initialValues = {
    location: filters.location,
    form: filters.form,
    engine: filters.engine,
    transmission: filters.transmission,
  };
  const handleSubmit = (values: CamperFilters) => onSearch(values);

  const { data } = useQuery({
    queryKey: ['campers-filters'],
    queryFn: getCampersFilters,
  });

  return (
    <section className={css.sidebar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
        {({ resetForm }) => (
          <Form className={css.form}>
            <label htmlFor="location" className={css.locationLegend}>
              Location
            </label>
            <div className={css.locationInputWrap}>
              <svg className={css.mapIcon} width={20} height={20}>
                <use href="/sprite.svg#map"></use>
              </svg>
              <Field
                placeholder="City"
                className={css.locationInput}
                type="text"
                name="location"
                id="location"
              />
            </div>
            <div className={css.filters}>
              <h3>Filters</h3>
              <fieldset className={css.fieldset}>
                <p>Camper form</p>
                {data?.forms?.map(item => {
                  return (
                    <label key={item} className={css.radio}>
                      <Field type="radio" value={item} name="form" />
                      <span className={css.icon}>
                        <svg>
                          <use href="/sprite.svg#radio" />
                        </svg>
                        <svg className={css.dot}>
                          <use href="/sprite.svg#radio_dot" />
                        </svg>
                      </span>
                      {formatFilterLabel(item)}
                    </label>
                  );
                })}
              </fieldset>
              <fieldset className={css.fieldset}>
                <p>Engine</p>
                {data?.engines?.map(item => {
                  return (
                    <label key={item} className={css.radio}>
                      <Field type="radio" value={item} name="engine" />
                      <span className={css.icon}>
                        <svg>
                          <use href="/sprite.svg#radio" />
                        </svg>
                        <svg className={css.dot}>
                          <use href="/sprite.svg#radio_dot" />
                        </svg>
                      </span>
                      {formatFilterLabel(item)}
                    </label>
                  );
                })}
              </fieldset>
              <fieldset className={css.fieldset}>
                <p>Transmission</p>
                {data?.transmissions?.map(item => {
                  return (
                    <label key={item} className={css.radio}>
                      <Field type="radio" value={item} name="transmission" />
                      <span className={css.icon}>
                        <svg>
                          <use href="/sprite.svg#radio" />
                        </svg>
                        <svg className={css.dot}>
                          <use href="/sprite.svg#radio_dot" />
                        </svg>
                      </span>
                      {formatFilterLabel(item)}
                    </label>
                  );
                })}
              </fieldset>
            </div>
            <div className={css.buttons}>
              <button type="submit" className={css.searchButton}>
                Search
              </button>
              <button
                type="button"
                className={css.clearButton}
                onClick={() => {
                  onSearch(initialValues);
                  resetForm();
                }}
              >
                <svg className={css.clearIcon} width={24} height={24}>
                  <use href="/sprite.svg#cross"></use>
                </svg>
                Clear filters
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
