import { ReactNode } from 'react';
import s from './viewCloserModal.module.scss';
import { Modal } from '../modal';

type ViewCloserModalProps = {
  imgSrc: string;
  trigger?: ReactNode;
};
export const ViewCloserModal = (props: ViewCloserModalProps) => {
  const { imgSrc, trigger } = props;

  return (
    <Modal
      contentProps={{ className: s.modalContainer }}
      modalHeader={'View image'}
      trigger={trigger}
    >
      <div className={s.imgContainer}>
        {/*img is used because the Image next component needs to be controlled in size through the fill property and a container with relative positioning, which makes some area near the image impossible to close by clicking on the background*/}
        <img alt={'View image'} className={s.imgCloser} src={imgSrc} />
      </div>
    </Modal>
  );
};
