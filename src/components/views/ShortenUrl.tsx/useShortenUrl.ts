import shortenUrlServices from '@/services/shorten';
import { IShorten } from '@/types/shorten';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const shortenSchema = Yup.object().shape({
  originalUrl: Yup.string().required('Please input your Url'),
  customAlias: Yup.string()
    .matches(/^[a-zA-Z0-9 _-]+$/, 'Custom alias must only contain letters and numbers')
    .optional(),
});

const useShortenUrl = ({ setShortenedUrl }: { setShortenedUrl: (url: string) => void }) => {
  // const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(shortenSchema),
    defaultValues: {
      originalUrl: '',
      customAlias: '',
    },
  });

  const shortenServices = async (payload: IShorten) => {
    const result = await shortenUrlServices.shorten(payload);
    return result;
  };

  //dari react-quary untuk mutasi/perubahan data disisi backend
  const { mutate: mutateShorten, isPending: isPendingShorten } = useMutation({
    mutationFn: shortenServices,
    onError(error) {
      setError('root', {
        message: error.message,
      });
    },
    onSuccess: data => {
      // router.push("/shorten")
      const newUrl = data?.data?.data?.newUrl;
      // console.log("API response", data.data);
      // console.log('newUrl:', newUrl);
      if (newUrl) {
        setShortenedUrl(newUrl);
      }
      reset();
    },
  });

  const handleSubmitUrl = (data: IShorten) => mutateShorten(data);

  return {
    control,
    handleSubmit,
    handleSubmitUrl,
    isPendingShorten,
    errors,
  };
};

export default useShortenUrl;
