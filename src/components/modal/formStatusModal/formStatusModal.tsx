import { ReactNode, useState } from 'react';
import s from './formStatusModal.module.scss';
import { Modal } from '../modal';
import { DialogClose } from '@radix-ui/react-dialog';
import CloseIcon from '@/assets/close.svg';

type ViewCloserModalProps = {
  status: string;
  trigger?: ReactNode;
  onClose: (status: string) => void;
};
export const FormStatusModal = (props: ViewCloserModalProps) => {
  const { status, onClose } = props;
  const [open, setOpen] = useState(true);

  return (
    <Modal modalHeader={'Form status'} rootProps={{ open: open }}>
      <div className={s.modalContainer}>
        <DialogClose
          className={s.close}
          onClick={() => {
            setOpen(false);
            onClose('');
          }}
        >
          <CloseIcon />
        </DialogClose>
        <div className={s.statusContainer}>
          <p className={s.status}>{status}</p>
        </div>
      </div>
    </Modal>
  );
};
