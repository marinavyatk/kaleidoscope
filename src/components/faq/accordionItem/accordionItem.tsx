import { ComponentPropsWithoutRef, useRef, useState } from 'react';
import { clsx } from 'clsx';
import s from './accordionItem.module.scss';
import { AccordionButton } from '../accordionButton/accordionButton';

export type AccordionItemProps = {
  question: string;
  answer: string;
} & ComponentPropsWithoutRef<'div'>;

export const AccordionItem = (props: AccordionItemProps) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);
  const { question, answer, className, ...restProps } = props;
  const classNames = clsx(s.questionContainer, className, {
    [s.opened]: opened,
  });

  //necessary so that the height of the answer changes smoothly
  if (answerRef.current && opened) {
    answerRef.current.style.maxHeight = `${answerRef.current.scrollHeight}px`;
  }
  if (answerRef.current && !opened) {
    answerRef.current.style.maxHeight = `0`;
  }

  return (
    <div
      {...restProps}
      className={classNames}
      itemScope
      itemType='https://schema.org/Question'
      itemProp='mainEntity'
    >
      <div className={s.accordion}>
        <h3 className={s.question} itemProp='name'>
          {question}
        </h3>
        <AccordionButton opened={opened} setOpened={setOpened} />
      </div>
      <div
        itemProp='acceptedAnswer'
        itemScope
        itemType='https://schema.org/Answer'
        className={s.answer}
        ref={answerRef}
      >
        <span dangerouslySetInnerHTML={{ __html: answer }} itemProp='text'></span>
      </div>
    </div>
  );
};
