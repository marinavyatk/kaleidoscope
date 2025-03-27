import s from './conformityCertificate.module.scss';

export const ConformityCertificate = () => {
  return (
    <div className={s.container + ' certificate'}>
      <img
        src='/made-in-russia.svg'
        alt='Сделано в России'
        className={s.image + ' certificateImage'}
      />
    </div>
  );
};
