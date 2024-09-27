import { ComponentPropsWithoutRef } from 'react';
import { AccordionItem } from '@/components/faq/accordionItem/accordionItem';
import s from './faq.module.scss';
import { clsx } from 'clsx';
import { Faq } from '@/common/types';

export type FAQProps = {
  faqData: Faq[];
} & ComponentPropsWithoutRef<'div'>;

const FAQ = (props: FAQProps) => {
  const { faqData, className, ...restProps } = props;
  const classNames = clsx(s.faq, className);

  const items = faqData?.map((q) => {
    return <AccordionItem question={q.title} answer={q.content} key={q.title} />;
  });

  return (
    <section {...restProps} className={classNames} itemScope itemType='https://schema.org/FAQPage'>
      <h2>Ч.З.В</h2>
      {items}
    </section>
  );
};

export default FAQ;
