'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import css from './Sidebar.module.css';
import { getCampersList } from '@/lib/api';
import { useState } from 'react';
import { Camper } from '@/types/types';
import { Field, Form, Formik } from 'formik';

export default function Sidebar() {
  const [filters, setFilters] = useState<Camper>({});
  const queryResult = useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ queryKey, pageParam }) => {
      const [, currentFilters] = queryKey as [string, Camper];
      return getCampersList(currentFilters, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: lastResponse => {
      const nextPage = lastResponse.page + 1;
      return nextPage < lastResponse.totalPages ? nextPage : undefined;
    },
  });

  const initialValues: Camper = {
    location: '',
    form: undefined,
    engine: undefined,
    transmission: undefined,
  };
  const handleSubmit = (values: Camper) => setFilters(values);
  return (
    <section className={css.sidebar}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              <label className={css.radio}>
                <Field type="radio" value="alcove" name="form" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Alcove
              </label>
              <label className={css.radio}>
                <Field type="radio" value="panel_van" name="form" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Panel Van
              </label>
              <label className={css.radio}>
                <Field type="radio" value="integrated" name="form" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Integrated
              </label>
              <label className={css.radio}>
                <Field type="radio" value="semi_integrated" name="form" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Semi Integrated
              </label>
            </fieldset>
            <fieldset className={css.fieldset}>
              <p>Engine</p>
              <label className={css.radio}>
                <Field type="radio" value="diesel" name="engine" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Diesel
              </label>
              <label className={css.radio}>
                <Field type="radio" value="petrol" name="engine" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Petrol
              </label>
              <label className={css.radio}>
                <Field type="radio" value="hybrid" name="engine" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Hybrid
              </label>
              <label className={css.radio}>
                <Field type="radio" value="electric" name="engine" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Electric
              </label>
            </fieldset>
            <fieldset className={css.fieldset}>
              <p>Transmission</p>
              <label className={css.radio}>
                <Field type="radio" value="automatic" name="transmission" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Automatic
              </label>
              <label className={css.radio}>
                <Field type="radio" value="manual" name="transmission" />
                <span className={css.icon}>
                  <svg>
                    <use href="/sprite.svg#radio" />
                  </svg>
                  <svg className={css.dot}>
                    <use href="/sprite.svg#radio_dot" />
                  </svg>
                </span>
                Manual
              </label>
            </fieldset>
          </div>
          <div className={css.buttons}>
            <button className={css.searchButton}>Search</button>
            <button className={css.clearButton}>
              <svg className={css.clearIcon} width={24} height={24}>
                <use href="/sprite.svg#cross"></use>
              </svg>
              Clear filters
            </button>
          </div>
        </Form>
      </Formik>
    </section>
  );
}
