import React, { FC, ReactNode, RefObject } from 'react';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import classNames from 'classnames';
import { ModalFooter, ModalHeader, ModalBody } from './components';
import styles from './Modal.module.scss';

interface ModalProps {
  /**
   * Handle zoom/pinch gestures on iOS devices when scroll locking is enabled.
   */
  allowPinchZoom?: boolean;
  /**
   * Contents of the button.
   */
  children: ReactNode;
  /**
   * Additional ClassNames to add to button.
   */
  className?: string;
  /**
   * At mobile viewport widths, the modal will take up the fullscreen
   */
  fullScreenMobile?: boolean;
  /**
   * By default the first focusable element will receive focus when the dialog
   * opens but you can provide a ref to focus instead.
   *
   * @see Docs https://reach.tech/dialog#dialog-initialfocusref
   */
  initialFocusRef?: RefObject<HTMLDivElement>;
  /**
   * Whether the modal is visible or not
   */
  isOpen: boolean;
  /**
   * Function that is called whenever the user hits "Esacape" key or clicks outside the modal.
   */
  onDismiss: (event?: React.SyntheticEvent) => void;
}

const Modal: FC<ModalProps> & {
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Header: typeof ModalHeader;
} = ({
  allowPinchZoom = false,
  children,
  className,
  fullScreenMobile = false,
  isOpen,
  onDismiss,
}) => {
  const overylayClassnames = classNames(styles.overlay, {
    fullscreen: fullScreenMobile,
  });
  const contentClassnames = classNames(styles['modal-content'], className);

  return (
    <DialogOverlay
      className={overylayClassnames}
      allowPinchZoom={allowPinchZoom}
      isOpen={isOpen}
      onDismiss={onDismiss}
    >
      <DialogContent className={contentClassnames}>{children}</DialogContent>
    </DialogOverlay>
  );
};

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;

export default Modal;
