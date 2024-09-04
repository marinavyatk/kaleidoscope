import s from './catalogSection.module.scss';
import {useState} from 'react';
import 'swiper/css/navigation';
import 'swiper/css';
import {Carousel} from '@/components/carousel/carousel';
import Image from 'next/image';
import {useCategories} from '@/common/customHooks/useCategories';
import {useProducts} from '@/common/customHooks/useProducts';


export const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = useCategories();
  const {catalogCardData, productCardData} = useProducts();

  console.log('productCardData', productCardData)

  const categoriesButtons = categories?.map((item, index) => {
    const handleChangeCategory = () => {
      setActiveCategory(index);
    };

    return (
      <button className={activeCategory === index ? s.active : ''} onClick={handleChangeCategory} key={item.id}>
        {item.name}
      </button>
    );
  });

  return (
    <section className={s.catalogSection} id='catalog'>
      <div className={s.background}>
        <Image src={'/radial-bg.png'} alt='' fill className={s.gradient}/>
        <Image src={'/bg-pattern-catalog.svg'} alt='' fill className={s.pattern}/>
      </div>
      <h2>Каталог</h2>
      <div className={s.catalogMain}>
        <Carousel items={catalogCardData || []} productCardData={productCardData || []}/>
        <div className={s.categories}>{categoriesButtons}</div>
      </div>
    </section>
  );
};
