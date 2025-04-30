import { useEffect, useState } from 'react';

export const useFormStatus = (reset: any, request: any) => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (status && !error) {
      timeoutId = setTimeout(() => {
        setStatus('');
        reset();
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [status]);

  const onSubmit = (data: any) => {
    request(data)
      .then((response: any) => {
        setStatus(response.response.data?.message);
        if (response.response.data.success) {
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((response: any) => {
        setStatus(
          response.response.data?.message || 'Ошибка при отправке формы. Попробуйте снова.',
        );
        setError(true);
      });
  };

  return { onSubmit, status, error };
};
