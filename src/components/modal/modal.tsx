import { ComponentPropsWithoutRef, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import s from './modal.module.scss';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export type ModalProps = {
  contentProps?: Dialog.DialogContentProps;
  overlayProps?: Dialog.DialogOverlayProps;
  modalHeader: string;
  rootProps?: Dialog.DialogProps;
  trigger?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const Modal = (props: ModalProps) => {
  const { children, contentProps, overlayProps, modalHeader, rootProps, trigger, ...restProps } =
    props;

  return (
    <div {...restProps}>
      <Dialog.Root {...rootProps}>
        <Dialog.Trigger asChild className={s.triggerContainer}>
          {trigger}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            {...overlayProps}
            className={clsx(s.overlay, overlayProps && overlayProps?.className)}
          />
          <Dialog.Content
            {...contentProps}
            aria-describedby={undefined}
            className={clsx(s.content, contentProps?.className)}
          >
            <VisuallyHidden asChild>
              <Dialog.Title className={s.title}>
                <span>{modalHeader}</span>
              </Dialog.Title>
            </VisuallyHidden>
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
