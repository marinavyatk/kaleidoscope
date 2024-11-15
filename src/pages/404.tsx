import s from './404.module.scss';

export default function Custom404() {
  return (
    <div className={s.notFound + ' fullWidthCentered'}>
      <h1>404 - Страницы не существует </h1>
    </div>
  );
}
