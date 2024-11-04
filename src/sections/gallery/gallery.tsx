import { useState } from 'react';
import s from './gallery.module.scss';
import Image from 'next/image';
import { AlbumData } from '@/common/types';
import { AlbumsNavigation } from '@/components/albumsNavigation/albumsNavigation';
import { GallerySlider } from '@/components/gallerySlider/gallerySlider';

type GallerySectionProps = {
  albumsData: AlbumData[];
};
const GallerySection = (props: GallerySectionProps) => {
  const { albumsData } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const albums = albumsData?.map((album) => {
    return { img: album.cover || album.images[0], caption: album.title };
  });

  return (
    <section className={s.gallerySection} id='gallery'>
      <Image src={'/radial-bg.webp'} alt='' fill className={s.gradient} />
      <h2>Галерея</h2>
      <div className={'fullContainer ' + s.background} role='presentation'>
        Наши воспоминания
      </div>
      <div className={s.galleryContainer}>
        <div className={s.albumNavigation}>
          <AlbumsNavigation
            activeIndex={activeIndex}
            albums={albums}
            setActiveIndex={setActiveIndex}
          />
        </div>
        <GallerySlider
          activeIndex={activeIndex}
          images={albumsData?.[activeIndex]?.images}
          description={albumsData?.[activeIndex]?.description}
        />
      </div>
    </section>
  );
};
export default GallerySection;
