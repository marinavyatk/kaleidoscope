import {ComponentPropsWithoutRef} from 'react';
import CardBackground from '../../assets/card.svg';
import clsx from 'clsx';
import s from './card.module.scss';
import {ProductCardModal} from '../modal/productCardModal/productCardModal';
import {Product} from '@/common/types';
import Image from 'next/image';

export type CardProps = {
  product: Product;
  products: Product[];
  status: string;
  activeSlide: number;
  setActiveIndex: (index: number) => void;
} & ComponentPropsWithoutRef<'div'>;

export const Card = (props: CardProps) => {
  const { product, products, activeSlide, setActiveIndex, className, status, ...restProps } = props;
  const classNames = clsx(s.cardContainer, className, s[status]);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.card}>
        <CardBackground className={s.cardBackground} />
        <p className={s.cardName}>{product?.name}</p>
        <p className={s.description}>{product?.shortDescription}</p>
        <div className={s.model}>
          <Image src={product?.img || ''} alt='' fill sizes='(max-width: 767px) 259px, 526px'/>
        </div>
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
