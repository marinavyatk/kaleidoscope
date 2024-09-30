import s from './commersalProporsalModal.module.scss';
import { Modal } from '../modal';
import { CommercialProposalForm } from '@/components/form/commersalProporsalForm/commercialProposalForm';
import { DialogClose } from '@radix-ui/react-dialog';
import CloseIcon from '@/assets/close.svg';
import { clsx } from 'clsx';

type CommercialProposalModalProps = {
  chosenProduct: string;
  triggerClassName?: string;
};
export const CommercialProposalModal = (props: CommercialProposalModalProps) => {
  const { chosenProduct, triggerClassName } = props;

  return (
    <Modal
      contentProps={{ className: s.cpContainer }}
      overlayProps={{ className: s.cpOverlay }}
      modalHeader={'Получить коммерческое предложение'}
      trigger={
        <button
          className={clsx(s.cpTrigger, triggerClassName)}
          itemProp='offers'
          itemScope
          itemType='https://schema.org/Offer'
        >
          получить кп
        </button>
      }
    >
      <div className={s.cpModalContent}>
        <DialogClose className={s.close}>
          <CloseIcon />
        </DialogClose>
        <CommercialProposalForm chosenProduct={chosenProduct} />
      </div>
    </Modal>
  );
};
