import PageHead from '@/components/commons/PageHead';
import { ReactNode } from 'react';

interface PropTypes {
  children: ReactNode;
}
const ShortenUrlLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <>
      <PageHead title="Shorten Url" />
      <section className="max-w-screen-3xl 3xl:container p-6">{children}</section>
    </>
  );
};

export default ShortenUrlLayout;
