import { ComponentPropsWithoutRef } from 'react';
import CardBackground from '../../assets/card.svg';
import clsx from 'clsx';
import s from './card.module.scss';
import { ProductCardModal } from '../modal/productCardModal/productCardModal';
import { Product } from '@/common/types';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';

export type CardProps = {
  product: Product;
  products: Product[];
  status: string;
  activeSlide: number;
  setActiveIndex: (index: number) => void;
  direction: 'forward' | 'backward';
} & ComponentPropsWithoutRef<'div'>;

export const Card = (props: CardProps) => {
  const {
    product,
    products,
    activeSlide,
    setActiveIndex,
    className,
    status,
    direction,
    ...restProps
  } = props;
  const classNames = clsx(s.cardContainer, className, s[status], s[direction]);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.card}>
        <CardBackground className={'fullContainer ' + s.cardBackground} />
        <p className={s.cardName}>{product?.name}</p>
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
        <ProductCardModal
          products={products}
          activeSlide={activeSlide}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
};
