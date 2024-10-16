import { ComponentPropsWithoutRef, useState } from 'react';
import CardBackground from '../../assets/card.svg';
import { clsx } from 'clsx';
import s from './card.module.scss';
import { ProductCardModal } from '../modal/productCardModal/productCardModal';
import { Product } from '@/common/types';
import Image from 'next/image';
import { Picture } from '@/components/picture/picture';
import { Button } from '@/components/button/button';

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

  const [openModal, setOpenModal] = useState(false);

  return (
    <div {...restProps} className={classNames} itemScope itemType='https://schema.org/Product'>
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
        {openModal ? (
          <ProductCardModal
            open={openModal}
            setOpen={setOpenModal}
            products={products}
            activeSlide={activeSlide}
            setActiveIndex={setActiveIndex}
          />
        ) : (
          <Button onClick={() => setOpenModal(true)}>Смотреть</Button>
        )}
        <div itemProp='aggregateRating' itemScope itemType='https://schema.org/AggregateRating'>
          <meta itemProp='ratingValue' content='5' />
          <meta itemProp='reviewCount' content='1' />
        </div>
      </div>
    </div>
  );
};
