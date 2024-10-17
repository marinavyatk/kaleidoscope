import s from './productCard.module.scss';
import CloseIcon from '../../assets/close.svg';
import ArrowIcon from '../../assets/arrow-triangle.svg';
import {
  ComponentPropsWithoutRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';
import { SwiperClass } from 'swiper/react';
import { handleNextButtonClick, handlePrevButtonClick } from '@/common/commonFunctions';
import { Product } from '@/common/types';
import { v4 as uuid } from 'uuid';
import { CommercialProposalModal } from '@/components/modal/commercialProposalModal/commersalProporsalModal';
import { useScreenWidth } from '@/common/customHooks/useScreenWidth';
import dynamic from 'next/dynamic';
import { ModelProps } from '@/components/3d/product/product';
import { Loader } from '@/components/loader/loader';
import { useIntersectionObserver } from '@/common/customHooks/useIntersectionObserver';
import SceneWrapper from '@/components/3d/product/sceneWrapper';

// const Scene = dynamic<ModelProps>(() => import('../../components/3d/product/scene'), {
//   loading: () => (
//     <div className='fullWidthCentered'>
//       <Loader className={s.loader} />
//     </div>
//   ),
// });

export type ProductCardProps = {
  productData: Product;
  swiperRef: RefObject<SwiperClass>;
  onClose: () => void;
  hasViewed: boolean;
} & ComponentPropsWithoutRef<'div'>;

export const ProductCard = (props: ProductCardProps) => {
  const { productData, onClose, swiperRef, className, hasViewed, ...restProps } = props;
  const classNames = clsx(s.productCard, className);
  const isTabletOrMobile = useScreenWidth(767);
  const modelContainerRef = useRef(null);
  const isVisible = useIntersectionObserver(modelContainerRef, 0.5);
  const [showModel, setShowModel] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setShowModel(true), 1000);
    }
  }, [isVisible]);

  return (
    <div {...restProps} className={classNames} itemScope itemType='https://schema.org/Product'>
      <div className={'fullContainer ' + s.background}></div>
      <div>
        <div className={s.cardHeader}>
          <h2 itemProp='title'>{productData?.name}</h2>
          {/*<DialogClose onClick={onClose} className={s.close}>*/}
          <button onClick={onClose} className={s.close}>
            <CloseIcon />
          </button>
        </div>
        <div className={s.cardMain}>
          <div className={s.description}>
            <h3>описание товара</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: productData?.description || '',
              }}
              itemProp='description'
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
        <div
          className={'fullWidthCentered backgroundImg fullContainer ' + s.model}
          ref={modelContainerRef}
        >
          {/*{hasViewed && productData?.model && <Scene link={productData.model} />}*/}
          {/*{hasViewed && productData?.model && isVisible && <Scene link={productData.model} />}*/}
          {hasViewed && productData?.model && showModel && (
            <SceneWrapper link={productData.model} />
          )}
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
          <button
            onClick={() => {
              // swiperRef.current?.enable();
              handlePrevButtonClick(swiperRef as MutableRefObject<SwiperClass>);
              // swiperRef.current?.disable();
            }}
          >
            <ArrowIcon />
            Назад
          </button>
          <button
            className={s.next}
            onClick={() => {
              // swiperRef.current?.enable();
              handleNextButtonClick(swiperRef as MutableRefObject<SwiperClass>);
              // swiperRef.current?.disable();
            }}
          >
            Вперед <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
