import { useForm } from 'react-hook-form';
import { CPFormValues } from '@/common/types';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Input } from '@/components/input/input';
import { Button } from '@/components/button/button';
import s from './commercialProposalForm.module.scss';

export type CPFormProps = {
  chosenProduct: string;
};

export const CommercialProposalForm = (props: CPFormProps) => {
  const { chosenProduct } = props;
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CPFormValues>({
    defaultValues: {
      clientEmail: '',
      clientName: '',
      clientTel: '',
      product: chosenProduct,
    },
  });

  const onSubmit = (data: CPFormValues) => {
    // api
    //   .sendCPForm(data)
    //   .then((response) => {
    //     setStatus(response.data?.message);
    //     if (response.data.status === 'mail_sent') {
    //       setError(false);
    //     } else {
    //       setError(true);
    //     }
    //   })
    //   .catch((response) => {
    //     setStatus(response.data?.message || 'Ошибка при отправке формы. Попробуйте снова.');
    //     setError(true);
    //   });

    console.log('get CP data', data);
  };

  return (
    <form
      className={s.commercialProposalForm}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete={'off'}
    >
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
      <Input
        label={'Email'}
        placeholder={errors.clientEmail ? 'Заполните поле' : 'Введите email'}
        containerProps={{ className: s.inputContainer }}
        {...register('clientEmail', {
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Введите корректный email',
          },
        })}
        error={!!errors.clientEmail}
      />
      <Input
        label={'Название товара'}
        containerProps={{ className: s.hidden }}
        {...register('product')}
      />
      {status && <p className={clsx(s.formResponse, error && s.error)}>{status}</p>}
      <div className={s.submitBlock}>
        <p>Нажимая на кнопку отправить, я&nbsp;даю согласие на обработку персональных данных</p>
        <Button disabled={isSubmitting}>ОТПРАВИТЬ</Button>
      </div>
    </form>
  );
};
