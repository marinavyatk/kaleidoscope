import s from './rendersModal.module.scss';
import { Modal } from '../modal';
import { Category, CategoryProducts } from '@/common/types';
import { DownloadButton } from '@/components/buttons/downloadButton/downloadButton';
import RendersSection from '@/sections/renders/rendersSection';
import { useEffect, useRef, useState } from 'react';

export type ProductCardsSliderProps = {
  products: CategoryProducts;
  categories: Category[];
  showGreeting: boolean;
};

export const RendersModal = (props: ProductCardsSliderProps) => {
  const { products, categories, showGreeting } = props;
  const [open, setOpen] = useState(false);
  const triggerContainerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mainScreen = document.querySelector('.mainSection') as HTMLDivElement;
    const certificate = document.querySelector('.certificate') as HTMLDivElement;
    const certificateImage = document.querySelector('.certificateImage') as HTMLImageElement;

    const screenWidth = window.innerWidth;
    const sectionHeight = mainScreen.offsetHeight;
    const sectionComputedStyles = window.getComputedStyle(mainScreen);
    const sectionBottomPadding = parseFloat(sectionComputedStyles.paddingBottom) || 0;

    const offset =
      screenWidth > 767
        ? sectionHeight - sectionBottomPadding
        : sectionHeight - sectionBottomPadding + 10;

    if (triggerContainerRef.current && triggerRef.current) {
      triggerContainerRef.current.style.top = `${offset}px`;
      triggerContainerRef.current.style.opacity = `1`;

      triggerRef.current.style.transform =
        screenWidth > 767 ? 'translateY(-100%)' : 'translateY(0)';
    }

    if (certificate && certificateImage) {
      certificate.style.top = `${offset}px`;
      certificate.style.opacity = `1`;

      certificateImage.style.transform = screenWidth > 767 ? 'translateY(-100%)' : 'translateY(0)';
    }
  }, [showGreeting]);

  return (
    <>
      <div className={s.triggerContainer} ref={triggerContainerRef}>
        <div className={s.trigger} ref={triggerRef}>
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
