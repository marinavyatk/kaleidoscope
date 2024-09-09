import { Form } from '@/components/form/form';
import s from './formSection.module.scss';
import Image from 'next/image';

export const FormSection = () => {
  return (
    <section className={s.formSection} id='form'>
      <Image src={'/radial-bg.webp'} alt='' className={s.gradient} fill />
      <div className={s.form}>
        <div className={s.formText}>
          <h2>Требуется консультация?</h2>
          <p>
            Свяжитесь напрямую с нашим отделом продаж &#160;
            <a href={'tel:+79994184174'} className={s.phoneNumber}>
              +7 999 418-41-74
            </a>
            &#160; или оставьте свои данные и мы свяжемся с вами!
          </p>
        </div>
        <Form />
      </div>
    </section>
  );
};
