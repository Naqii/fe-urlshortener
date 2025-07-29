import { toPng } from 'html-to-image';

export const downloadQR = async (ref: React.RefObject<HTMLElement>, filename = 'qrcode.png') => {
  if (!ref.current) return;

  try {
    const dataUrl = await toPng(ref.current, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('Failed to download QR Code', error);
  }
};
