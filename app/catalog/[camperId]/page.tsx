import Gallery from '@/components/Gallery/Gallery';
import { getCamperDetails } from '@/lib/api';
import css from './page.module.css';
import { Container } from '@/components/Container/Container';

type Props = {
  params: Promise<{
    camperId: string;
  }>;
};

export default async function NoteDetails({ params }: Props) {
  const { camperId } = await params;

  const camper = await getCamperDetails(camperId);

  return (
    <Container>
      <div className={css.card}>
        <Gallery camper={camper} />
      </div>
      <div></div>
    </Container>
  );
}
