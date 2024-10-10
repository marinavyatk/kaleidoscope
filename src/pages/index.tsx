import { useState } from 'react';
import Header from '@/components/header/header';
import { GreetingSection } from '@/sections/greeting/greetingSection';
import Player from '@/components/player/player';
import { api } from '@/common/api';
import {
  Category,
  CategoryProducts,
  ContactsData,
  DocumentData,
  Faq,
  MapData,
  ProjectMap,
  StepData,
} from '@/common/types';
import s from '@/styles/index.module.scss';
import { getStructuredProducts, getStructuredProjectMap } from '@/common/commonFunctions';
import MainSection from '@/sections/main/mainSection';
import AboutSection from '@/sections/about/aboutSection';
import CatalogSection from '@/sections/catalog/catalogSection';
import ProjectMapSection from '@/sections/projectMap/projectMapSection';
import FAQ from '@/sections/faq/faq';
import FormSection from '@/sections/form/formSection';
import DocumentationSection from '@/sections/documentation/documentationSection';
import Footer from '@/components/footer/footer';
import { Layout } from '@/components/layout/layout';
import { MapSection } from '@/sections/map/mapSection';

export const getStaticProps = async () => {
  const contactInfo = (await api.getContacts()) || {};
  const categories = (await api.getProductsCategories()) || [];
  const documents = (await api.getDocuments()) || [];
  const faqData = (await api.getFAQ()) || [];
  const projectMapData = (await api.getProjectMap()) || [];
  const { projectMap, stepData } = getStructuredProjectMap(projectMapData);
  const products: CategoryProducts = {};
  await Promise.all(
    categories.map(async (category) => {
      const productsForCategory = await getStructuredProducts(category.id);
      products[category.id] = productsForCategory || [];
    }),
  );
  const mapData = (await api.getPoints()) || [];

  return {
    props: { contactInfo, categories, documents, projectMap, stepData, faqData, products, mapData },
  };
};

type HomeProps = {
  contactInfo: ContactsData;
  categories: Category[];
  documents: DocumentData[];
  projectMap: ProjectMap[];
  stepData: StepData[];
  faqData: Faq[];
  products: CategoryProducts;
  mapData: MapData[];
};

export default function Home(props: HomeProps) {
  const { contactInfo, categories, documents, projectMap, stepData, faqData, products, mapData } =
    props;
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
            <ProjectMapSection projectMap={projectMap} stepData={stepData} />
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
