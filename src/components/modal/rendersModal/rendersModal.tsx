import s from './rendersModal.module.scss';
import { Modal } from '../modal';
import { Category, CategoryProducts } from '@/common/types';
import { DownloadButton } from '@/components/downloadButton/downloadButton';
import RendersSection from '@/sections/renders/rendersSection';
import { useState } from 'react';

export type ProductCardsSliderProps = {
  products: CategoryProducts;
  categories: Category[];
};

export const RendersModal = (props: ProductCardsSliderProps) => {
  const { products, categories } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={s.triggerContainer}>
        <div className={s.trigger}>
          <DownloadButton onClick={() => setOpen(true)} />
        </div>
      </div>

      <Modal
        contentProps={{ className: s.modalContainer }}
        modalHeader={'Для проектировщиков и архитекторов'}
        rootProps={{ open: open }}
      >
        <RendersSection products={products} categories={categories} setOpen={setOpen} />
      </Modal>
    </>
  );
};
