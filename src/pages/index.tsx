import { useState } from 'react';
import Head from 'next/head';
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
  Product,
  ProjectMap,
  StepData,
} from '@/common/types';
import s from '@/styles/index.module.scss';
import { getStructuredProducts, getStructuredProjectMap } from '@/common/commonFunctions';
import ErrorBoundary from '@/components/errorBoundary/errorBoundary';
import dynamic from 'next/dynamic';
const MainSection = dynamic(() => import('@/sections/main/mainSection'));
const AboutSection = dynamic(() => import('@/sections/about/aboutSection'));
const CatalogSection = dynamic(() => import('@/sections/catalog/catalogSection'));
const ProjectMapSection = dynamic(() => import('@/sections/projectMap/projectMapSection'));
const FAQ = dynamic(() => import('@/sections/faq/faq'));
const FormSection = dynamic(() => import('@/sections/form/formSection'));
const DocumentationSection = dynamic(() => import('@/sections/documentation/documentationSection'));
const Footer = dynamic(() => import('../components/footer/footer'));

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

  return { props: { contactInfo, categories, documents, projectMap, stepData, faqData, products } };
};

type HomeProps = {
  contactInfo: ContactsData;
  categories: Category[];
  documents: DocumentData[];
  projectMap: ProjectMap[];
  stepData: StepData[];
  faqData: Faq[];
  products: CategoryProducts;
};

export default function Home(props: HomeProps) {
  const { contactInfo, categories, documents, projectMap, stepData, faqData, products } = props;
  const [showGreeting, setShowGreeting] = useState(true);
  const [initialPlaying, setInitialPlaying] = useState(false);

  return (
    <>
      <Head>
        <title>Калейдоскоп игр</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='icon' href='/favicon/favicon.ico' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='mask-icon' href='/favicon/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      </Head>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </>
  );
}
