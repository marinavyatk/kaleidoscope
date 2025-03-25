import { ComponentPropsWithoutRef } from 'react';
import CardBackground from '../../assets/card.svg';
import { clsx } from 'clsx';
import s from './card.module.scss';
import { Product } from '@/common/types';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';
import { Button } from '@/components/button/button';

export type CardProps = {
  product: Product;
  products: Product[];
  status: string;
  direction: 'forward' | 'backward';
} & ComponentPropsWithoutRef<'div'>;

export const RenderCard = (props: CardProps) => {
  const { product, products, className, status, direction, ...restProps } = props;
  const classNames = clsx(s.cardContainer, className, s[status], s[direction]);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.card}>
        <CardBackground className={'fullContainer ' + s.cardBackground} />
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
        {restProps.children}
        <Button as={'a'} href={product.file} target='_blank' rel='noreferrer' download>
          Скачать
        </Button>
      </div>
    </div>
  );
};
