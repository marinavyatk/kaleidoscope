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
  if (!imgSrc) return;

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'View image'}
      trigger={trigger}
    >
      <Picture src={imgSrc} className={s.imgCloser} loading='lazy' />
    </Modal>
  );
};
