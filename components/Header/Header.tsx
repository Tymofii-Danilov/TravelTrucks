'use client';
import Link from 'next/link';
import css from './Header.module.css';
import { usePathname } from 'next/navigation';
import { Container } from '../Container/Container';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [mobMenuIsOpen, setMobMenuIsOpen] = useState(false);
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
                className={`${css.link} ${pathname.startsWith('/catalog') ? css.active : ''}`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
          <button
            onClick={() => {
              setMobMenuIsOpen(!mobMenuIsOpen);
            }}
            className={`${css.burgerClosed} ${mobMenuIsOpen ? css.burgerOpen : ''}`}
          >
            <svg className={css.burgerIcon} width={40} height={40}>
              <use href="/sprite.svg#burger"></use>
            </svg>
          </button>
          <div className={`${css.mobMenuClosed} ${mobMenuIsOpen ? css.mobMenuOpen : ''}`}>
            <ul className={css.mobNavBar}>
              <li>
                <Link
                  onClick={() => {
                    setMobMenuIsOpen(!mobMenuIsOpen);
                  }}
                  className={`${css.mobLink} ${pathname === '/' ? css.active : ''}`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setMobMenuIsOpen(!mobMenuIsOpen);
                  }}
                  className={`${css.mobLink} ${pathname.startsWith('/catalog') ? css.active : ''}`}
                  href="/catalog"
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </section>
  );
}
