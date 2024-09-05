import { Input } from '../input/input';
import { Button } from '../button/button';
import s from './form.module.scss';
import { useForm } from 'react-hook-form';
import { FormValues } from '@/common/types';
import { useState } from 'react';
import { FormStatusModal } from '@/components/modal/formStatusModal/formStatusModal';
import { api } from '@/common/api';

export const Form = () => {
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    api
      .sendForm(data)
      .then(() => {
        setStatus('Сообщение отправлено успешно!');
        reset();
      })
      .catch(() => setStatus('Ошибка при отправке формы. Попробуйте снова.'));
  };

  console.log('errors', errors);

  return (
    <div className='wpcf7'>
      <div>
        <div style={{ display: 'none' }}>
          <input type='hidden' name='_wpcf7' value='2039' />
          <input type='hidden' name='_wpcf7_version' value='5.8.5' />
          <input type='hidden' name='_wpcf7_locale' value='en_US' />
          <input type='hidden' name='_wpcf7_unit_tag' value='wpcf7-f2039-p3653-o1' />
          <input type='hidden' name='_wpcf7_container_post' value='3653' />
          <input type='hidden' name='_wpcf7_posted_data_hash' value='' />
        </div>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.mainUserData}>
          <Input
            label={'Ваше Имя'}
            placeholder={errors.name ? 'Заполните поле' : 'Введите Имя'}
            containerProps={{ className: s.inputContainer }}
            {...register('name', { required: true })}
            error={!!errors.name}
          />
          <Input
            label={'Номер телефона'}
            placeholder={'Введите номер'}
            type='tel'
            containerProps={{ className: s.inputContainer }}
            {...register('tel', { required: true })}
            error={!!errors.tel}
          />
        </div>
        <Input
          label={'Сообщение'}
          placeholder={'Оставьте сообщение'}
          {...register('message', { required: true })}
          error={!!errors.message}
        />
        <div className={s.submitBlock}>
          <p>Нажимая на кнопку отправить, я&nbsp;даю согласие на обработку персональных данных</p>
          <Button>ОТПРАВИТЬ</Button>
          {status && <FormStatusModal status={status} />}
        </div>
      </form>
    </div>
  );
};
