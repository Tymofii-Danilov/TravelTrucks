'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';
import { Container } from '../Container/Container';

export default function Header() {
  const pathname = usePathname();
  return (
    <section className={css.headerSection}>
      <Container className={css.header}>
        <Link className={css.logo} href="/">
          <svg width={136} height={16}>
            <use href="/sprite.svg#traveltrucks"></use>
          </svg>
        </Link>
        <nav>
          <ul className={css.navBar}>
            <li>
              <Link className={`${css.link} ${pathname === '/' ? css.active : ''}`} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${css.link} ${pathname === '/catalog' ? css.active : ''}`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
}
