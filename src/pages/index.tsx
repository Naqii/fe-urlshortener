import PageHead from '@/components/commons/PageHead';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <PageHead />
      <div className="flex flex-col items-center justify-center gap-10">
        <Image src="/image/general/asset3.png" alt="logo" width={256} height={254} priority />
        <p className="text-xl">We&apos;re Under Construction</p>
      </div>
      <Link href="/shorten">
        <Button color="primary">Go to Shorten Page</Button>
      </Link>
    </div>
  );
}
