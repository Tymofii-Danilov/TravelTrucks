import { TailSpin } from 'react-loader-spinner';
import css from './loading.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <div className={css.loader}>
        <TailSpin
          visible={true}
          height="72"
          width="72"
          color="#6D7B75"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass={css.spinner}
        />
        <h2 className={css.loadingHeading}>Loading truck details...</h2>
        <p className={css.loadingText}>Please wait while we fetch all the information you need</p>
      </div>
    </div>
  );
}
