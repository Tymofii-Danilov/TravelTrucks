import Image from 'next/image';
import css from './CatalogNotFound.module.css';

type Props = {
  noResults: () => void;
};

export default function CatalogNotFound({ noResults }: Props) {
  return (
    <div className={css.empty}>
      <Image
        className={css.pic}
        src="/notFound.png"
        width={488}
        height={463}
        alt="Not found picture"
      />
      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>
      <div className={css.buttons}>
        <button
          type="button"
          className={css.clearBtn}
          onClick={() => {
            noResults();
          }}
        >
          <svg className={css.clearIcon} width={24} height={24}>
            <use href="/sprite.svg#cross"></use>
          </svg>
          Clear filters
        </button>
        <button
          type="button"
          onClick={() => {
            noResults();
          }}
          className={css.viewBtn}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}
