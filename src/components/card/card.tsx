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
  onOpenClick: () => void;
} & ComponentPropsWithoutRef<'div'>;

export const Card = (props: CardProps) => {
  const { product, className, status, direction, onOpenClick, ...restProps } = props;
  const classNames = clsx(s.cardContainer, className, s[status], s[direction]);

  return (
    <div {...restProps} className={classNames} itemScope itemType='https://schema.org/Product'>
      <div className={s.card}>
        <div className={'fullContainer ' + s.cardBackground} />
        <h3 className={s.cardName} itemProp='name'>
          {product?.name}
        </h3>
        <p className={s.description} itemProp='description'>
          {product?.shortDescription}
        </p>
        <Picture
          component={Image}
          src={product?.img || ''}
          alt=''
          fill
          sizes='(max-width: 767px) 259px, 526px'
          containerProps={{ className: s.model }}
          loaderProps={{ lightBackground: true }}
          itemProp='image'
        />
        <Button onClick={onOpenClick}>Смотреть</Button>
        <div itemProp='aggregateRating' itemScope itemType='https://schema.org/AggregateRating'>
          <meta itemProp='ratingValue' content='5' />
          <meta itemProp='reviewCount' content='1' />
        </div>
      </div>
    </div>
  );
};
