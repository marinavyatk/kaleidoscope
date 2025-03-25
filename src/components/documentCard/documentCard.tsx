import { DocumentData } from '@/common/types';
import { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import s from './documentCard.module.scss';
import { Picture } from '@/components/picture/picture';
import Image from 'next/image';
import { ViewCloserModal } from '@/components/modal/viewCloserModal/viewCloserModal';
import { Button } from '@/components/buttons/button/button';

type DocumentCardProps = {
  document: DocumentData;
  status: string;
  direction: 'forward' | 'backward';
} & ComponentPropsWithoutRef<'div'>;

export const DocumentCard = (props: DocumentCardProps) => {
  const { document, status, direction, className, ...restProps } = props;
  const classNames = clsx(s.docCard, className, s[status], s[direction]);

  return (
    <div className={classNames} {...restProps}>
      <div className={s.card}>
        <Picture
          src={document?.thumbnail_url}
          alt={document?.title.rendered}
          component={Image}
          containerProps={{ className: s.imgContainer }}
          fill
          sizes='(max-width: 767px) 288px, 604px'
        />
        <p className={s.description}>{document?.title?.rendered}</p>
        <ViewCloserModal
          imgSrc={document?.thumbnail_url || ''}
          trigger={<Button>Открыть</Button>}
        />
      </div>
    </div>
  );
};
