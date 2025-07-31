import { Button, Card, CardBody, Input, Spinner } from '@heroui/react';
import Image from 'next/image';
import useShortenUrl from './useShortenUrl';
import { Controller } from 'react-hook-form';
import { useRef, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { downloadQR } from '@/libs/downloadQR';

const ShortenUrl = () => {
  const [shortenedUrl, setShortenedUrl] = useState('');
  const { control, handleSubmit, handleSubmitUrl, isPendingShorten, errors } = useShortenUrl({
    setShortenedUrl,
  });
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image src="/image/general/asset2.png" alt="logo" width={256} height={254} priority />
      </div>
      <Card>
        <CardBody className="h-full w-full p-8">
          <h2 className="mb-4 text-xl font-bold">Shorten You&apos;re URL</h2>
          <form className="flex w-fit flex-col gap-2" onSubmit={handleSubmit(handleSubmitUrl)}>
            <Controller
              name="originalUrl"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  label="URL" 
                  type="text" 
                  variant="bordered" 
                  autoComplete="off" 
                  isInvalid={errors.originalUrl !== undefined}
                  errorMessage={errors.originalUrl?.message} />
              )}
            />
            <Controller
              name="customAlias"
              control={control}
              render={({ field }) => (
                <Input 
                  {...field} 
                  label="Alias" 
                  type="text" 
                  variant="bordered" 
                  autoComplete="off" 
                  isInvalid={!!errors.customAlias}
                  errorMessage={errors.customAlias?.message}
                  />
              )}
            />
            {errors.root?.message && (
              <p className="text-red-500 text-xs">Alias alredy taken</p>
            )}
            <Button color="primary" className="focus:outline-none" type="submit" size="lg">
              {isPendingShorten ? <Spinner color="white" size="md" /> : 'Generate'}
            </Button>
            <Input
              isDisabled
              className="w-full max-w-xs"
              variant="bordered"
              type="text"
              value={shortenedUrl}
            />
            {/* <p className="text-green-600">{shortenedUrl}</p> */}
            <Button
              onPress={() => navigator.clipboard.writeText(shortenedUrl)}
              disabled={!shortenedUrl}
              className={`flex items-center gap-2 rounded-md px-4 py-2 transition-colors duration-200 ${
                shortenedUrl
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500'
              }`}
            >
              <FaCopy size={18} />
              Copy
            </Button>
            {shortenedUrl && (
              <div ref={qrRef} className="flex flex-col items-center rounded p-4">
                <p className="text-sm">
                  <QRCode value={shortenedUrl} size={128}></QRCode>
                </p>
              </div>
            )}
            <Button
              disabled={!shortenedUrl}
              onPress={() => downloadQR(qrRef, 'shortened-url.png')}
              className={`flex items-center gap-2 rounded-md px-4 py-2 transition-colors duration-200 ${
                shortenedUrl
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500'
              }`}
            >
              Download QR
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ShortenUrl;
