import { ComponentPropsWithoutRef } from 'react';
import CardBackground from '../../assets/card.svg';
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

  return (
    <div {...restProps} className={classNames}>
      <div className={s.card}>
        <CardBackground className={'fullContainer ' + s.cardBackground} />
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
        {restProps.children}
        <Button as={'a'} href={product.file} rel='noreferrer' download target='_blank'>
          Скачать
        </Button>
      </div>
    </div>
  );
};
