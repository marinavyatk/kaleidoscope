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
  const filteredCategories = categories.filter((cat) => {
    return products[cat.id].some((product) => product.file);
  });

  const { currentProducts, categoriesButtons, activeCategory } = useCatalog(
    filteredCategories,
    products,
  );
  const classNames = clsx(
    s.categories,
    categoriesButtons?.length > 1 ? s.fewCategories : s.oneCategory,
    categoriesButtons?.length > 3 && s.moreCategories,
  );

  const checkedProducts = currentProducts.filter((product) => product.file);

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
        <RenderCarousel products={checkedProducts} key={activeCategory} />
        <div className={classNames}>{categoriesButtons}</div>
      </div>
    </section>
  );
};

export default RendersSection;
