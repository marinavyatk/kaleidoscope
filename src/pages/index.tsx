import Head from 'next/head';
import { Header } from '@/components/header/header';
import { MainSection } from '@/sections/1-mainSection/mainSection';
import { AboutSection } from '@/sections/2-aboutSection/aboutSection';
import { CatalogSection } from '@/sections/3-catalogSection/catalogSection';
import { ProjectMapSection } from '@/sections/4-projectMapSection/projectMapSection';
import { DocumentationSection } from '@/sections/8-documentationSection/documentationSection';
import { Footer } from '@/components/footer/footer';
import { FormSection } from '@/sections/7-formSection/formSection';
import { FAQ } from '@/sections/6-faqSection/faq';
import s from '@/styles/index.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Калейдоскоп игр</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className={s.content}>
        <Header className={s.header} />
        <MainSection />
        <AboutSection />
        <CatalogSection />
        <ProjectMapSection />
        <FAQ />
        <FormSection />
        <DocumentationSection />
        <Footer />
      </div>
    </>
  );
}
