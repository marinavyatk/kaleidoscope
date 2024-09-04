import {ComponentPropsWithoutRef} from 'react';
import CardBackground from '../../assets/card.svg';
import clsx from 'clsx';
import s from './card.module.scss';
import {ProductCardModal} from '../modal/productCardModal/productCardModal';
import {CatalogCardData, ProductCardData} from '@/common/types';
import Image from 'next/image';


export type CardProps = {
    cardData: CatalogCardData;
    productCardData: ProductCardData[];
    status: string;
    activeSlide: number;
    setActiveIndex: (index: number) => void;
} & ComponentPropsWithoutRef<'div'>;

export const Card = (props: CardProps) => {
    const {cardData, productCardData, activeSlide, setActiveIndex, className, status, ...restProps} = props;
    const classNames = clsx(s.cardContainer, className, s[status]);

    return (
        <div {...restProps} className={classNames}>
            <div className={s.card}>
                <CardBackground className={s.cardBackground}/>
                <p className={s.cardName}>{cardData?.name}</p>
                <p className={s.description}>{cardData?.description}</p>
                <div className={s.model}>
                    <Image src={cardData.img} alt=""/>
                </div>
                {restProps.children}
                <ProductCardModal
                    productsData={productCardData}
                    activeSlide={activeSlide}
                    setActiveIndex={setActiveIndex}
                />
            </div>
        </div>
    );
};
