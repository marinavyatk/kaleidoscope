import { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import s from './card.module.scss';
import { Product } from '@/common/types';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';
import { Button } from '@/components/buttons/button/button';

export type CardProps = {
  product: Product;
  status: string;
  direction: 'forward' | 'backward';
} & ComponentPropsWithoutRef<'div'>;

export const RenderCard = (props: CardProps) => {
  const { product, className, status, direction, ...restProps } = props;
  const classNames = clsx(s.cardContainer, className, s[status], s[direction]);

  //for bg disappearance bug
  const handleDownloadClick = () => {
    requestAnimationFrame(() => {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        (card as HTMLElement).style.outline = '1px solid transparent';
        void (card as HTMLElement).offsetHeight;
      });
    });
  };

  return (
    <div {...restProps} className={classNames}>
      <div className={s.card}>
        <div className='fullContainer'>
          <div className={s.cardBackground} />
        </div>
        <h3 className={s.cardName}>{product?.name}</h3>
        <p className={s.description}>{product?.shortDescription}</p>
        <Picture
          component={Image}
          src={product?.img || ''}
          alt=''
          fill
          sizes='(max-width: 767px) 259px, 526px'
          containerProps={{ className: s.model }}
          loaderProps={{ lightBackground: true }}
        />
        <Button
          as={'a'}
          href={product.file}
          rel='noreferrer'
          download
          onClick={handleDownloadClick}
        >
          Скачать
        </Button>
      </div>
    </div>
  );
};
