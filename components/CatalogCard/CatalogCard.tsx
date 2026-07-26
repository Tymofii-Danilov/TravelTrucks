import { CamperItem } from '@/types/types';
import Image from 'next/image';
import css from './CatalogCard.module.css';
import { formatFilterLabel } from '@/tools/format';
import Link from 'next/link';
type Props = {
  camper: CamperItem;
};

export default function CatalogCard({ camper }: Props) {
  const i = camper;
  return (
    <li className={css.item}>
      <Image className={css.image} src={i.coverImage} alt={i.name} width={219} height={240} />
      <div className={css.itemInfo}>
        <div className={css.textContainer}>
          <div className={css.namePrice}>
            <h2 className={css.name}>{i.name}</h2>
            <h2 className={css.price}>€{i.price}</h2>
          </div>
          <div className={css.details}>
            <div className={css.rating}>
              <svg width={16} height={16}>
                <use href="/sprite.svg#ratingFilled"></use>
              </svg>
              <p className={css.reviews}>
                {i.rating}({i.totalReviews} reviews)
              </p>
            </div>
            <div className={css.location}>
              <svg className={css.mapIcon} width={16} height={16}>
                <use href="/sprite.svg#map"></use>
              </svg>
              <p className={css.city}>{i.location}</p>
            </div>
          </div>
        </div>
        <p className={css.description}>
          Embrace simplicity and freedom with the {i.name} truck, an ideal choice for solo travelers
          or couples seeking a compact and efficient way to explore the open roads. This no-frills
          yet reliable panel truck offers the essentials for a comfortable journey, making it the
          perfect companion for those who value simplicity and functionality.
        </p>
        <div className={css.badgesWrap}>
          <div className={css.badge}>
            <svg className={css.badgeIcon} width={20} height={20}>
              <use href="/sprite.svg#engine"></use>
            </svg>
            <p>{formatFilterLabel(i.engine)}</p>
          </div>
          <div className={css.badge}>
            <svg className={css.badgeIcon} width={20} height={20}>
              <use href="/sprite.svg#transmission"></use>
            </svg>
            <p>{formatFilterLabel(i.transmission)}</p>
          </div>
          <div className={css.badge}>
            <svg className={css.badgeIcon} width={20} height={20}>
              <use href="/sprite.svg#form"></use>
            </svg>
            <p>{formatFilterLabel(i.form)}</p>
          </div>
        </div>
        <Link className={css.moreBtn} href={`/catalog/${i.id}`}>
          Show more
        </Link>
      </div>
    </li>
  );
}
