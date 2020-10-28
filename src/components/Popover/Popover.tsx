import React, {
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';
import FocusTrap from 'focus-trap-react';
import classNames from 'classnames';
import { BrandColor } from '../../types';
import styles from './Popover.module.scss';
import Box, { BoxProps } from '../Box/Box';

interface PopoverProps {
  /**
   * The Popover is a controlled input, and will be shown when `isOpen === true`.
   */
  isOpen: boolean;
  /**
   * Color of the arrow background.
   */
  arrowColor?: BrandColor;
  /**
   * Content of the tooltip. Can be any JSX node, but should be a single node, so it can be assigned a ref.
   */
  content?: ReactNode;
  /**
   * Padding for the tooltip content. This has a default value
   * in order to avoid content overlap with the popover arrow.
   */
  contentContainerProps?: BoxProps;
  /**
   * Callback function to handle when a user clicks outside the Popover
   */
  onClickOutside?: () => void;
  /**
   * The placement of the Popover relative to its trigger.
   */
  placement?: Placement;
  /**
   * The target element where the Popover will be portaled to, when `withPortal === true`.
   */
  portalTarget?: HTMLElement;
  /**
   * Whether you want to trap focus in the Popover element when it is open.
   * Read more about focus traps:
   * [Here](https://allyjs.io/tutorials/accessible-dialog.html#trapping-focus-inside-the-dialog)
   */
  trapFocus?: boolean;
  /**
   * Whether the element should be rendered outside its DOM structure
   * for reasons of placement. Use this when the element is being cut-off or
   * re-positioned due to lack of space in the parent container.
   * NOTE: use `portalTarget` to render the element onto a custom container,
   * otherwise it will be rendered to the `body` element by default.
   */
  withPortal?: boolean;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const contentContainerDefaults: BoxProps = {
  background: 'white',
  padding: 'sm',
};

const Popover: FC<PopoverProps> = ({
  arrowColor = undefined,
  children,
  content,
  contentContainerProps = { ...contentContainerDefaults },
  isOpen,
  onClickOutside = undefined,
  placement,
  portalTarget = document.body,
  trapFocus = false,
  withPortal = false,
  ...restProps
}) => {
  const triggerRef = useRef<HTMLElement>(null);
  const popperRef = useRef<HTMLElement>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popover = popperRef.current;
      const trigger = triggerRef.current;

      if (!popover || !trigger) {
        return;
      }

      if (event.target === trigger || trigger?.contains(event.target as Node)) {
        return;
      }

      if (event.target !== popover && !popover?.contains(event.target as Node)) {
        if (onClickOutside) onClickOutside();
      }
    };

    if (onClickOutside) {
      document.body.addEventListener('click', handleClickOutside, false);
    }

    return () => {
      if (onClickOutside) {
        document.body.removeEventListener('click', handleClickOutside, false);
      }
    };
  }, [onClickOutside]);

  const { styles: popperStyles, attributes } = usePopper(
    triggerRef.current,
    popperRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'arrow',
          options: { element: arrowElement },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
  );

  const childrenWithRef = React.Children.map(children, child => {
    const props = { ref: triggerRef };
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });

  const containerBoxProps = {
    ...contentContainerDefaults,
    ...contentContainerProps,
  };

  const computedArrowColor = arrowColor || containerBoxProps.background;

  const arrowClasses = classNames(
    styles['popover-arrow'],
    `background-color-${computedArrowColor}`,
  );

  const renderPopperContent = () => {
    const popperBox = (
      <Box
        ref={popperRef}
        className={styles.popover}
        style={popperStyles.popper}
        {...containerBoxProps}
        {...attributes.popper}
        {...restProps}
      >
        <div
          ref={setArrowElement}
          style={popperStyles.arrow}
          className={arrowClasses}
          data-popper-arrow
        />
        {content}
      </Box>
    );

    return trapFocus ? (
      <FocusTrap
        active={isOpen}
        focusTrapOptions={{
          clickOutsideDeactivates: true,
        }}
      >
        {popperBox}
      </FocusTrap>
    ) : (
      popperBox
    );
  };

  return (
    <>
      {childrenWithRef}
      {isOpen && (
        withPortal ? createPortal(renderPopperContent(), portalTarget) : renderPopperContent()
      )}
    </>
  );
};

export default Popover;
