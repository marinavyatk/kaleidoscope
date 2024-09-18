import s from './productCard.module.scss';
import CloseIcon from '../../assets/close.svg';
import ArrowIcon from '../../assets/arrow-triangle.svg';
import { useMediaQuery } from 'react-responsive';
import { ComponentPropsWithoutRef, MutableRefObject, RefObject } from 'react';
import { clsx } from 'clsx';
import { SwiperClass } from 'swiper/react';
import { handleNextButtonClick, handlePrevButtonClick } from '@/common/commonFunctions';
import { DialogClose } from '@radix-ui/react-dialog';
import { Product } from '@/common/types';
import { v4 as uuid } from 'uuid';
import Image from 'next/image';
import { CommercialProposalModal } from '@/components/modal/commercialProposalModal/commersalProporsalModal';
import { Scene } from '@/components/3d/product/scene';

export type ProductCardProps = {
  productData: Product;
  swiperRef: RefObject<SwiperClass>;
  onClose: () => void;
} & ComponentPropsWithoutRef<'div'>;

export const ProductCard = (props: ProductCardProps) => {
  const { productData, onClose, swiperRef, className, ...restProps } = props;
  const classNames = clsx(s.productCard, className);
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  return (
    <div {...restProps} className={classNames}>
      <div className={s.background}></div>
      <div>
        <div className={s.cardHeader}>
          <h2>{productData?.name}</h2>
          <DialogClose onClick={onClose} className={s.close}>
            <CloseIcon />
          </DialogClose>
        </div>
        <div className={s.cardMain}>
          <div className={s.description}>
            <h3>описание товара</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: productData?.description || '',
              }}
            ></div>
          </div>
          {!isTabletOrMobile && (
            <div className={s.specifications}>
              <h3>характеристики</h3>
              <div className={s.table}>
                {productData?.specifications?.map((row) => {
                  return (
                    <div key={uuid()}>
                      <span>{row.key}</span>
                      <span>{row.value}</span>
                    </div>
                  );
                })}
              </div>
              <CommercialProposalModal
                chosenProduct={productData?.name}
                triggerClassName={s.commercialProposal}
              />
            </div>
          )}
        </div>
        <div className={s.model}>
          {/*<Image src={productData?.img} alt={'Фото товара'} fill sizes={'957px'} />*/}
          {productData?.model && <Scene link={productData.model} />}
        </div>
        {isTabletOrMobile && (
          <div className={s.cardMain}>
            <div className={s.specifications}>
              <h3>характеристики</h3>
              <div className={s.table}>
                {productData?.specifications?.map((row) => {
                  return (
                    <div key={uuid()}>
                      <span>{row.key}</span>
                      <span>{row.value}</span>
                    </div>
                  );
                })}
              </div>
              <CommercialProposalModal
                chosenProduct={productData?.name}
                triggerClassName={s.commercialProposal}
              />
            </div>
          </div>
        )}
      </div>
      <div className={s.cardFooter}>
        <CommercialProposalModal
          chosenProduct={productData?.name}
          triggerClassName={s.commercialProposal}
        />
        <div className={s.navButtons}>
          <button onClick={() => handlePrevButtonClick(swiperRef as MutableRefObject<SwiperClass>)}>
            <ArrowIcon />
            Назад
          </button>
          <button
            className={s.next}
            onClick={() => handleNextButtonClick(swiperRef as MutableRefObject<SwiperClass>)}
          >
            Вперед <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
