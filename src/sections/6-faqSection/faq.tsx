import { ComponentPropsWithoutRef } from 'react';
import { AccordionItem } from '@/components/faq/accordionItem/accordionItem';
import s from './faq.module.scss';
import { useFAQ } from '@/common/customHooks/useFAQ';
import { clsx } from 'clsx';

export type FAQProps = ComponentPropsWithoutRef<'div'>;

const FAQ = (props: FAQProps) => {
  const { className, ...restProps } = props;
  const classNames = clsx(s.faq, className);
  const faqData = useFAQ();

  const items = faqData?.map((q) => {
    return <AccordionItem question={q.title} answer={q.content} key={q.title} />;
  });

  return (
    <section {...restProps} className={classNames}>
      <h2>Ч.З.В</h2>
      {items}
    </section>
  );
};

export default FAQ;
