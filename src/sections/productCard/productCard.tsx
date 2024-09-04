import s from './productCard.module.scss';
import CloseIcon from '../../assets/close.svg';
import ArrowIcon from '../../assets/arrow-triangle.svg';
import Model from '../../assets/product.png';
import { useMediaQuery } from 'react-responsive';
import {ComponentPropsWithoutRef, MutableRefObject, RefObject} from 'react';
import { clsx } from 'clsx';
import { SwiperClass } from 'swiper/react';
import { handleNextButtonClick, handlePrevButtonClick } from '@/common/commonFunctions';
import { DialogClose } from '@radix-ui/react-dialog';
import {ProductCardData} from '@/common/types';


export type ProductCardProps = {
  productData?: ProductCardData;
  swiperRef: RefObject<SwiperClass>;
  onClose: () => void;
} & ComponentPropsWithoutRef<'div'>;

export const ProductCard = (props: ProductCardProps) => {
  const { productData, onClose, swiperRef, className, ...restProps } = props;
  const classNames = clsx(s.productCard, className);
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  // const decodeHtml = (html: string): string => {
  //   const txt = document.createElement("textarea");
  //   txt.innerHTML = html;
  //   return txt.value;
  // };


  return (
    <div {...restProps} className={classNames}>
      <div className={s.background}></div>
      <div>
        <div className={s.cardHeader}>
          <h2>{productData?.name}</h2>
          <DialogClose>
            <button onClick={onClose}>
              <CloseIcon className={s.close} />
            </button>
          </DialogClose>
        </div>

        <div className={s.cardMain}>
          <div className={s.description}>
            <h3>описание товара</h3>
            {/*<div dangerouslySetInnerHTML={{__html: productData?.description || ''}}></div>*/}

            <div
                dangerouslySetInnerHTML={{
                  // __html: decodeHtml(productData?.description || ''),
                  __html: productData?.description || '',
                }}
            ></div>
            {/*<p>*/}
            {/*  Малая архитектурная форма «КОРОБКА № 2» с функцией развлекательно-игрового комплекса*/}
            {/*  представляет концепцию самого популярного вида спорта — футбола.*/}
            {/*  <br />*/}
            {/*  <br />*/}
            {/*  Мини-формат этой игры делает её доступной даже для минимального количества игроков,*/}
            {/*  позволяя наслаждаться футболом в ограниченном пространстве.*/}
            {/*</p>*/}
          </div>
          {!isTabletOrMobile && (
              <div className={s.specifications}>
                <h3>характеристики</h3>
              {/*<div className={s.table}>*/}
              {/*  <div>*/}
              {/*    <span>Длина</span>*/}
              {/*    <span>2760мм</span>*/}
              {/*  </div>*/}
              {/*  <div>*/}
              {/*    <span>ширина</span>*/}
              {/*    <span>1800мм</span>*/}
              {/*  </div>*/}
              {/*  <div>*/}
              {/*    <span>Высота</span>*/}
              {/*    <span>925мм</span>*/}
              {/*  </div>*/}
              {/*  <div>*/}
              {/*    <span>Цвет</span>*/}
              {/*    <span className={s.color}>индивидуальный</span>*/}
              {/*  </div>*/}
              {/*</div>              */}


                <div className={s.table}>

                  {productData?.specifications && Object.keys(productData?.specifications).map((key) => {
                    return <div key={key}>
                      <span>{key}</span>
                      <span>{productData?.specifications[key]}</span>
                    </div>
                  })}
                {/*  <div>*/}
                {/*    <span>Длина</span>*/}
                {/*    <span>2760мм</span>*/}
                {/*  </div>*/}
                {/*<div>*/}
                {/*  <span>ширина</span>*/}
                {/*  <span>1800мм</span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <span>Высота</span>*/}
                {/*  <span>925мм</span>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*  <span>Цвет</span>*/}
                {/*  <span className={s.color}>индивидуальный</span>*/}
                {/*</div>*/}
              </div>

              <a href='#' download rel='nofollow'>
                получить кп
              </a>
            </div>
          )}
        </div>

        <div className={s.model}>
          <img src={Model.src} alt='' />
        </div>

        {isTabletOrMobile && (
          <div className={s.cardMain}>
            <div className={s.specifications}>
              <h3>характеристики</h3>
              <div className={s.table}>
                <div>
                  <span>Длина</span>
                  <span>2760мм</span>
                </div>
                <div>
                  <span>ширина</span>
                  <span>1800мм</span>
                </div>
                <div>
                  <span>Высота</span>
                  <span>925мм</span>
                </div>
                <div>
                  <span>Цвет</span>
                  <span className={s.color}>индивидуальный</span>
                </div>
              </div>

              <a href='#' download rel='nofollow'>
                получить кп
              </a>
            </div>
          </div>
        )}
      </div>
      <div className={s.cardFooter}>
        <a href='#' download rel='nofollow'>
          получить кп
        </a>
        <div className={s.navButtons}>
          <button onClick={() => handlePrevButtonClick(swiperRef as  MutableRefObject<SwiperClass>)}>
            <ArrowIcon />
            Назад
          </button>
          <button className={s.next} onClick={() => handleNextButtonClick(swiperRef as  MutableRefObject<SwiperClass>)}>
            Вперед <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
