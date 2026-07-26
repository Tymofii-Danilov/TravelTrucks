'use client';
import css from './error.module.css';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <div>
      <h2 className={css.heading}>Error</h2>
      <p className={css.text}>{error.message}</p>
      <button onClick={reset}>Please try again</button>
    </div>
  );
}
