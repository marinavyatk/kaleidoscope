import styles from './renders.module.scss';
import s from '../../sections/catalog/catalogSection.module.scss';
import Image from 'next/image';
import { Category, CategoryProducts } from '@/common/types';
import CloseIcon from '@/assets/close.svg';
import { RenderCarousel } from '@/components/carousel/renderCarousel';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { useCatalog } from '@/common/customHooks/useCatalog';

type CatalogSectionProps = {
  categories: Category[];
  products: CategoryProducts;
  setOpen: (open: boolean) => void;
};
const RendersSection = (props: CatalogSectionProps) => {
  const { categories, products, setOpen } = props;
  const { currentProducts, categoriesButtons, categoriesRef } = useCatalog(categories, products);

  return (
    <section className={clsx(s.catalogSection, styles.renderSection)}>
      <div className={'fullContainer ' + styles.background}></div>
      <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
      <div className={styles.cardHeader}>
        <h2>Для проектировщиков и архитекторов</h2>
        <Dialog.Close className={styles.close} onClick={() => setOpen(false)}>
          <CloseIcon />
        </Dialog.Close>
      </div>
      <div className={s.catalogMain}>
        <RenderCarousel products={currentProducts} />
        <div className={s.categories} ref={categoriesRef}>
          {categoriesButtons}
        </div>
      </div>
    </section>
  );
};

export default RendersSection;
