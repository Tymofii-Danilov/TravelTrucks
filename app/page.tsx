import { Container } from '@/components/Container/Container';
import css from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <section className={css.hero}>
      <Container>
        <h1 className={css.firstHeading}>Campers of your dreams</h1>
        <h2 className={css.secondHeading}>You can find everything you want in our catalog</h2>
        <Link className={css.cta} href="/catalog">
          View Now
        </Link>
      </Container>
    </section>
  );
}
