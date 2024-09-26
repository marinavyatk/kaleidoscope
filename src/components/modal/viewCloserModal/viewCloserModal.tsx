import { ReactNode } from 'react';
import s from './viewCloserModal.module.scss';
import { Modal } from '../modal';
import { Picture } from '@/components/picture/picture';

type ViewCloserModalProps = {
  imgSrc: string;
  trigger?: ReactNode;
};
export const ViewCloserModal = (props: ViewCloserModalProps) => {
  const { imgSrc, trigger } = props;

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      // contentProps={{ className: 'fullWidthCentered' }}
      modalHeader={'View image'}
      trigger={trigger}
    >
      <Picture src={imgSrc} className={s.imgCloser} loading='lazy' />
    </Modal>
  );
};
