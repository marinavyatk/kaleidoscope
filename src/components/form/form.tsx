import { Input } from '../input/input';
import { Button } from '../button/button';
import s from './form.module.scss';
import { useForm } from 'react-hook-form';
import { FormValues } from '@/common/types';
import { useEffect, useState } from 'react';
import { api } from '@/common/api';
import { Textarea } from '@/components/input/textarea';
import { clsx } from 'clsx';

export const Form = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

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

  const onSubmit = (data: FormValues) => {
    api
      .sendForm(data)
      .then((response) => {
        setStatus(response.data?.message);
        if (response.data.status === 'mail_sent') {
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch((response) => {
        setStatus(response.data?.message || 'Ошибка при отправке формы. Попробуйте снова.');
        setError(true);
      });
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.mainUserData}>
        <Input
          label={'Ваше имя'}
          placeholder={errors.clientName ? 'Заполните поле' : 'Введите имя'}
          containerProps={{ className: s.inputContainer }}
          {...register('clientName', { required: true })}
          error={!!errors.clientName}
        />
        <Input
          label={'Номер телефона'}
          placeholder={errors.clientTel ? 'Заполните поле' : 'Введите номер'}
          type='tel'
          containerProps={{ className: s.inputContainer }}
          {...register('clientTel', {
            required: true,
            validate: (value) => {
              const phoneDigits = value.replace(/\D/g, '');
              return phoneDigits.length === 11;
            },
          })}
          error={!!errors.clientTel}
        />
      </div>
      <Textarea
        label={'Сообщение'}
        placeholder={errors.clientMessage ? 'Заполните поле' : 'Оставьте сообщение'}
        {...register('clientMessage', { required: true })}
        error={!!errors.clientMessage}
      />
      {status && <p className={clsx(s.formResponse, error && s.error)}>{status}</p>}
      <div className={s.submitBlock}>
        <p>Нажимая на кнопку отправить, я&nbsp;даю согласие на обработку персональных данных</p>
        <Button disabled={isSubmitting}>Отправить</Button>
      </div>
    </form>
  );
};
