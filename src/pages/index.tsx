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
import { GreetingSection } from '@/sections/greetingSection/greetingSection';
import { useEffect, useState } from 'react';
import { Player } from '@/components/player/player';

export default function Home() {
  const [showGreeting, setShowGreeting] = useState(true);
  const [initialPlaying, setInitialPlaying] = useState(false);
  useEffect(() => {
    (function () {
      var script = document.createElement('script');
      script.src = 'https://console.re/connector.js';
      document.body.appendChild(script);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Калейдоскоп игр</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className='mainContainer'>
        {showGreeting && (
          <GreetingSection
            setShowGreeting={setShowGreeting}
            setPlaying={setInitialPlaying}
            className={!showGreeting ? s.hiddenGreeting : 'ss'}
          />
        )}
        <Header
          className={s.header}
          player={<Player initialPlaying={initialPlaying} key={`playing-${initialPlaying}`} />}
        />

        {!showGreeting && (
          <>
            <MainSection />
            <AboutSection />
            <CatalogSection />
            <ProjectMapSection />
            <FAQ />
            <FormSection />
            <DocumentationSection />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
