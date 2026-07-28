import Gallery from '@/components/Gallery/Gallery';
import { getCamperDetails, getCamperReviews } from '@/lib/api';
import css from './page.module.css';
import { Container } from '@/components/Container/Container';
import { formatFilterLabel } from '@/tools/format';
import ReviewsForm from '@/components/ReviewsForm/ReviewsForm';

type Props = {
  params: Promise<{
    camperId: string;
  }>;
};

export default async function CamperDetails({ params }: Props) {
  const { camperId } = await params;

  const camper = await getCamperDetails(camperId);

  const reviews = await getCamperReviews(camperId);

  const stars = Array.from({ length: 5 });

  return (
    <Container>
      <section className={css.topSection}>
        <div className={css.card}>
          <Gallery camper={camper} />
        </div>
        <div className={css.infoContainer}>
          <div className={css.headerRating}>
            <h2 className={css.name}>{camper.name}</h2>
            <div className={css.details}>
              <div className={css.rating}>
                <svg width={16} height={16}>
                  <use href="/sprite.svg#ratingFilled"></use>
                </svg>
                <p className={css.reviews}>
                  {camper.rating}({camper.totalReviews} reviews)
                </p>
              </div>
              <div className={css.location}>
                <svg className={css.mapIcon} width={16} height={16}>
                  <use href="/sprite.svg#map"></use>
                </svg>
                <p className={css.city}>{camper.location}</p>
              </div>
            </div>
            <h2 className={css.price}>€{camper.price}</h2>
            <p className={css.description}>{camper.description}</p>
          </div>
          <div className={css.techInfo}>
            <h2 className={css.name}>Vehicle details</h2>
            <div className={css.amenities}>
              <ul className={css.amenitiesContent}>
                {camper.amenities.map(item => {
                  return (
                    <li key={item} className={css.amenity}>
                      {formatFilterLabel(item)}
                    </li>
                  );
                })}
                {camper.amenities.map(item => {
                  return (
                    <div key={`${item}-copy`} className={css.amenity}>
                      {formatFilterLabel(item)}
                    </div>
                  );
                })}
              </ul>
            </div>
            <div className={css.line}></div>
            <div className={css.specs}>
              <div className={css.spec}>
                <p>Form</p>
                <p>{formatFilterLabel(camper.form)}</p>
              </div>
              <div className={css.spec}>
                <p>Length</p>
                <p>{formatFilterLabel(camper.length)}</p>
              </div>
              <div className={css.spec}>
                <p>Width</p>
                <p>{formatFilterLabel(camper.width)}</p>
              </div>
              <div className={css.spec}>
                <p>Height</p>
                <p>{formatFilterLabel(camper.height)}</p>
              </div>
              <div className={css.spec}>
                <p>Tank</p>
                <p>{formatFilterLabel(camper.tank)}</p>
              </div>
              <div className={css.spec}>
                <p>Consumption</p>
                <p>{formatFilterLabel(camper.consumption)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={css.reviewsSection}>
        <h2 className={css.name}>Reviews</h2>
        <div className={css.lowerSection}>
          <div className={css.reviewsWrap}>
            {reviews.map(item => {
              return (
                <div className={css.reviewBox} key={item.id}>
                  <div className={css.person}>
                    <div className={css.photo}>{item.reviewer_name.slice(0, 1)}</div>
                    <div className={css.reviewerNameAndStars}>
                      <p className={css.reviewerName}>{item.reviewer_name}</p>
                      <div className={css.stars}>
                        {stars.map((_, index) => (
                          <svg
                            key={index}
                            width={16}
                            height={16}
                            className={`${index + 1 <= item.reviewer_rating ? css.active : css.inactive} starIcon`}
                          >
                            <use href="/sprite.svg#star"></use>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={css.comment}>{item.comment}</p>
                </div>
              );
            })}
          </div>
          <div className={css.form}>
            <h3 className={css.formTitle}>Book your campervan now</h3>
            <p className={css.formText}>Stay connected! We are always ready to help you.</p>
            <ReviewsForm camperId={camperId} />
          </div>
        </div>
      </section>
    </Container>
  );
}
