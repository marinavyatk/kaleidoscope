import s from './catalogSection.module.scss';
import { useCallback, useState } from 'react';
import { Carousel } from '@/components/carousel/carousel';
import Image from 'next/image';
import { v4 as uuid } from 'uuid';
import { Category, CategoryProducts, Product } from '@/common/types';
import ProductCardSlider from '@/sections/productCard/productCardSlider';

type CatalogSectionProps = {
  categories: Category[];
  products: CategoryProducts;
};
const CatalogSection = (props: CatalogSectionProps) => {
  const { categories, products } = props;
  const [activeCategory, setActiveCategory] = useState(categories?.[0].id || 0);
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products[activeCategory] || []);
  const [activeIndex, setActiveIndex] = useState(currentProducts.length < 3 ? 0 : 1);
  const [isCardSliderOpen, setIsCardSliderOpen] = useState(false);
  const [isCardSliderVisible, setIsCardSliderVisible] = useState(true);
  const setActiveIndexMemo = useCallback(setActiveIndex, []);
  const setIsCardSliderVisibleMemo = useCallback(setIsCardSliderVisible, []);

  const categoriesButtons = categories?.map((item) => {
    const handleChangeCategory = () => {
      setActiveCategory(item.id);
      setCurrentProducts(products[item.id]);
    };

    return (
      <button
        className={activeCategory === item.id ? s.active : ''}
        onClick={handleChangeCategory}
        key={uuid()}
      >
        {item.name}
      </button>
    );
  });

  return (
    <section className={s.catalogSection} id='catalog'>
      <Image src={'/radial-bg.webp'} alt='' fill className={s.gradient} />
      <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern} />
      <h2>Каталог</h2>
      <div className={s.catalogMain}>
        <Carousel
          products={currentProducts}
          setIsCardSliderVisible={setIsCardSliderVisibleMemo}
          isCardSliderOpen={isCardSliderOpen}
          setIsCardSliderOpen={setIsCardSliderOpen}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <div className={s.categories}>{categoriesButtons}</div>
      </div>
      {isCardSliderOpen && (
        <ProductCardSlider
          products={currentProducts}
          activeSlide={activeIndex}
          // setActiveIndex={setActiveIndexMemo}
          setActiveIndex={setActiveIndex}
          isVisible={isCardSliderVisible}
          setIsCardSliderVisible={setIsCardSliderVisibleMemo}
        />
      )}
    </section>
  );
};

export default CatalogSection;
