import s from './catalogSection.module.scss';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { Category, CategoryProducts } from '@/common/types';
import { useCatalog } from '@/common/customHooks/useCatalog';

type CatalogSectionProps = {
  categories: Category[];
  products: CategoryProducts;
};
const CatalogSection = (props: CatalogSectionProps) => {
  const { categories, products } = props;
  const { currentProducts, categoriesButtons, categoriesRef } = useCatalog(categories, products);

  return (
    <section className={s.catalogSection} id='catalog'>
      <Image src={'/radial-bg.webp'} alt='' fill className={s.gradient} />
      <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
      <h2>Каталог</h2>
      <div className={s.catalogMain}>
        <Carousel products={currentProducts} />
        <div className={s.categories} ref={categoriesRef}>
          {categoriesButtons}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
