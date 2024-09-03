import s from './catalogSection.module.scss';
import {useEffect, useState} from 'react';
import 'swiper/css/navigation';
import 'swiper/css';
import {Carousel} from '@/components/carousel/carousel';
import Image from 'next/image';
import {api} from '@/common/api';
import {log} from 'node:util';
import {useCategories} from '@/common/customHooks/useCategories';
import {useProducts} from '@/common/customHooks/useProducts';

export const productData = [
  {
    productName: 'КОРОБКА № 1',
    productDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 1',
  },
  {
    productName: 'КОРОБКА № 2',
    productDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 2',
  },
  {
    productName: 'КОРОБКА № 3',
    productDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 3',
  },
  {
    productName: 'КОРОБКА № 4',
    cardDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 4',
  },
];

// const categories = ['МАФ «КОРОБКА\u00A0№»', 'МАФ «Выбил из игры»', 'МАФ «Вперёд в будущее»'];
const cardData = [
  {
    cardName: 'КОРОБКА № 1',
    cardDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 1',
  },
  {
    cardName: 'КОРОБКА № 2',
    cardDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 2',
  },
  {
    cardName: 'КОРОБКА № 3',
    cardDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 3',
  },
  {
    cardName: 'КОРОБКА № 4',
    cardDescription: 'МАФ: развлекательно-игровые комплексы КОРОБКА № 4',
  },
];

export const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = useCategories();
  const products = useProducts();
  // useEffect(()=>{
  //   // api.getProducts().then((res) => console.log(res));
  //   api.getProductsCategories().then((res) => console.log(res));
  // },[])

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
        <Image src={'/catalog-bg.png'} alt='' fill/>
      </div>
      <h2>Каталог</h2>
      <div className={s.catalogMain}>
        <Carousel items={cardData} />
        <div className={s.categories}>{categoriesButtons}</div>
      </div>
    </section>
  );
};
