import Image from 'next/image';
import css from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={css.empty}>
      <Image
        className={css.pic}
        src="/notFound.png"
        width={488}
        height={463}
        alt="Not found picture"
      />
      <h2 className={css.title}>Page not found</h2>
      <p className={css.text}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>
    </div>
  );
}
