import { Form } from '@/components/form/form';
import s from './formSection.module.scss';
import RadialGradient from '../../assets/bg-radial-gradient.png';

export const FormSection = () => {
  return (
    <section className={s.background} id='form'>
      <img src={RadialGradient.src} alt='' className={s.gradient} />
      <div className={s.formSection}>
        <div className={s.formText}>
          <h2>Требуется консультация?</h2>
          <p>
            Свяжитесь напрямую с нашим отделом продаж &#160;
            <span className={s.phoneNumber}>+7 918 417-50-23</span>
            &#160; или оставьте свои данные и мы свяжемся с вами!
          </p>
        </div>
        <Form />
      </div>
    </section>
  );
};
