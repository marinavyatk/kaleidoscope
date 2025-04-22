import s from './catalogSection.module.scss';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { Category, CategoryProducts } from '@/common/types';
import { useCatalog } from '@/common/customHooks/useCatalog';
import { clsx } from 'clsx';

type CatalogSectionProps = {
  categories: Category[];
  products: CategoryProducts;
};
const CatalogSection = (props: CatalogSectionProps) => {
  const { categories, products } = props;
  const { currentProducts, categoriesButtons, activeCategory } = useCatalog(categories, products);
  const classNames = clsx(
    s.categories,
    categoriesButtons?.length > 1 ? s.fewCategories : s.oneCategory,
    categoriesButtons?.length > 3 && s.moreCategories,
  );

  return (
    <section className={s.catalogSection} id='catalog'>
      <Image src={'/radial-bg.webp'} alt='' fill className={s.gradient} />
      <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
      <h2>Каталог</h2>
      <div className={s.catalogMain}>
        <Carousel products={currentProducts} key={activeCategory} />
        <div className={classNames}>{categoriesButtons}</div>
      </div>
    </section>
  );
};

export default CatalogSection;
