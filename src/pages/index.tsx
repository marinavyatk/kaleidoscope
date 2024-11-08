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

export const getStaticProps = async () => {
  const contactInfo = (await api.getContacts()) || {};
  const categories = (await api.getProductsCategories()) || [];
  const documents = (await api.getDocuments()) || [];
  const faqData = (await api.getFAQ()) || [];
  const products: CategoryProducts = {};
  await Promise.all(
    categories.map(async (category) => {
      const productsForCategory = await getStructuredProducts(category.id);
      products[category.id] = productsForCategory || [];
    }),
  );
  const mapData = (await api.getPoints()) || [];
  const albumsData = (await api.getAlbums()) || [];

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
