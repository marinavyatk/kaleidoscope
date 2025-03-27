import { useState } from 'react';
import Header from '@/components/header/header';
import { GreetingSection } from '@/sections/greeting/greetingSection';
import Player from '@/components/player/player';
import { api } from '@/common/api';
import {
  AlbumData,
  Category,
  CategoryProducts,
  ContactsData,
  DocumentData,
  Faq,
  MapData,
} from '@/common/types';
import s from '@/styles/index.module.scss';
import { getStructuredProducts } from '@/common/commonFunctions';
import MainSection from '@/sections/main/mainSection';
import AboutSection from '@/sections/about/aboutSection';
import CatalogSection from '@/sections/catalog/catalogSection';
import FAQ from '@/sections/faq/faq';
import FormSection from '@/sections/form/formSection';
import DocumentationSection from '@/sections/documentation/documentationSection';
import Footer from '@/components/footer/footer';
import { Layout } from '@/components/layout/layout';
import { MapSection } from '@/sections/map/mapSection';
import GallerySection from '@/sections/gallery/gallery';
import { RendersModal } from '@/components/modal/rendersModal/rendersModal';

export const getStaticProps = async () => {
  const [
    contactInfoResult,
    categoriesResult,
    documentsResult,
    faqDataResult,
    mapDataResult,
    albumsDataResult,
  ] = await Promise.all([
    api.getContacts(),
    api.getProductsCategories(),
    api.getDocuments(),
    api.getFAQ(),
    api.getPoints(),
    api.getAlbums(),
  ]);

  const contactInfo = contactInfoResult || {};
  const categories = categoriesResult || [];
  const documents = documentsResult || [];
  const faqData = faqDataResult || [];
  const mapData = mapDataResult || [];
  const albumsData = albumsDataResult || [];

  const productsEntries = await Promise.all(
    categories.map(async (category) => {
      const productsForCategory = await getStructuredProducts(category.id);
      return [category.id, productsForCategory || []];
    }),
  );
  const products = Object.fromEntries(productsEntries);

  return {
    props: {
      contactInfo,
      categories,
      documents,
      faqData,
      products,
      mapData,
      albumsData,
    },
  };
};

type HomeProps = {
  contactInfo: ContactsData;
  categories: Category[];
  documents: DocumentData[];
  faqData: Faq[];
  products: CategoryProducts;
  mapData: MapData[];
  albumsData: AlbumData[];
};

export default function Home(props: HomeProps) {
  const { contactInfo, categories, documents, faqData, products, mapData, albumsData } = props;
  const [showGreeting, setShowGreeting] = useState(true);
  const [initialPlaying, setInitialPlaying] = useState(false);

  return (
    <Layout
      headTags={
        <>
          <link rel='preload' as='image' href='/main-section-bg.webp' media='(min-width: 769px)' />
          <link
            rel='preload'
            as='image'
            href='/main-section-bg-small.webp'
            media='(max-width: 768px)'
          />
          <link rel='preload' href='/waving/desktop/1.webp' as='image' media='(min-width: 769px)' />
          <link rel='preload' href='/waving/tablet/1.webp' as='image' media='(max-width: 768px)' />
          <link rel='preload' href='/waving/mobile/1.webp' as='image' media='(max-width: 480px)' />
          <link rel='preload' href='/boy/0001.webp' as='image' media='(max-width: 768px)' />
          <link rel='canonical' href='https://xn----7sbkceuefeg0bbnri.xn--p1ai/' />
        </>
      }
    >
      <div className='mainContainer'>
        {showGreeting && (
          <GreetingSection
            setShowGreeting={setShowGreeting}
            setPlaying={setInitialPlaying}
            className={!showGreeting ? s.hiddenGreeting : ''}
          />
        )}
        <div className={showGreeting ? s.hidden : ''}>
          <Header
            className={s.header}
            player={<Player initialPlaying={initialPlaying} key={`playing-${initialPlaying}`} />}
          />
          <main>
            <RendersModal categories={categories} products={products} showGreeting={showGreeting} />
            <MainSection />
            <AboutSection />
            <CatalogSection categories={categories} products={products} />
            <GallerySection albumsData={albumsData} />
            <MapSection mapData={mapData} />
            <FAQ faqData={faqData} />
            <FormSection />
            <DocumentationSection documents={documents} />
          </main>
          <Footer
            tels={contactInfo['contact_phones']}
            emails={contactInfo['contact_emails']}
            socialLinks={contactInfo['social_links']}
          />
        </div>
      </div>
    </Layout>
  );
}
