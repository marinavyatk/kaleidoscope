import { ReactNode } from 'react';
import s from './formStatusModal.module.scss';
import { Modal } from '../modal';
import { DialogClose } from '@radix-ui/react-dialog';
import CloseIcon from '@/assets/close.svg';

type ViewCloserModalProps = {
  status: string;
  trigger?: ReactNode;
};
export const FormStatusModal = (props: ViewCloserModalProps) => {
  const { status } = props;

  return (
    <Modal
      // contentProps={{ className: s.modalContainer }}
      modalHeader={'Form status'}
      // rootProps={{ open: true }}
    >
      <div className={s.modalContainer}>
        <DialogClose className={s.close}>
          <CloseIcon />
        </DialogClose>
        <div className={s.statusContainer}>
          <p className={s.status}>{status}</p>
        </div>
      </div>
    </Modal>
  );
};
