import {ComponentPropsWithoutRef} from 'react';
import CardBackground from '../../assets/card.svg';
import CatalogModel from '../../assets/catalog-model.png';
import clsx from 'clsx';
import s from './card.module.scss';
import {productData} from '@/sections/3-catalogSection/catalogSection';
import {ProductCardModal} from '../modal/productCardModal/productCardModal';

export type CardData = {
  cardName: string;
  cardDescription: string;
  cardImg?: string;
};

export type CardProps = {
  cardData: CardData;
  status: string;
  activeSlide: number;
  setActiveIndex: (index: number) => void;
} & ComponentPropsWithoutRef<'div'>;

export const Card = (props: CardProps) => {
  const { cardData, activeSlide, setActiveIndex, className, status, ...restProps } = props;
  const classNames = clsx(s.cardContainer, className, s[status]);

  return (
    <div {...restProps} className={classNames}>
      <div className={s.card}>
        <CardBackground className={s.cardBackground} />
        <p className={s.cardName}>{cardData?.cardName}</p>
        <p className={s.description}>{cardData?.cardDescription}</p>
        <div className={s.model}>
          <img src={CatalogModel.src} alt='' />
        </div>
        {restProps.children}
        <ProductCardModal
          productsData={productData}
          activeSlide={activeSlide}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
};
