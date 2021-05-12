import React from 'react';
import classNames from 'classnames';
import { Box } from '../Box/Box';
import styles from './RadioToggle.module.scss';

export type RadioToggleOption = {
  value: RadioToggleProps['value'];
  label: string | number;
  id: string | number;
  name: string;
};

export interface RadioToggleProps {
  value: string | number;
  options: [RadioToggleOption, RadioToggleOption];
  label: string | number;
  onChange: (event: React.MouseEvent<HTMLInputElement>) => void;
  size: 'sm' | 'md' | 'lg';
  className: string;
}

export const RadioToggle: React.FC<RadioToggleProps> = React.forwardRef<HTMLDivElement, RadioToggleProps>((
  {
    value,
    options,
    label,
    onChange,
    size = 'md',
    className,
  },
  ref
) => {

  const containerClasses = classNames(
    styles['radio-toggle-container'],
    styles[size],
    className,
  );

  const switchIndicatorClasses = classNames(
    styles['radio-toggle-indicator'],
    {
      [styles.right]: value === options[1].value // If second option is selected, the indicator is on the 'right' side.
    },
  );

  return (
    <Box
      position="relative"
      radius="md"
      borderColor="grey-100"
      borderWidth="0"
      background="grey-100"
      direction="row"
      display="inline-block"
      width="100"
      className={containerClasses}
    >
      {options.map(option => (
        <>
          <Box
            as="input"
            id={option.id}
            type="radio"
            name={option.name}
            value={option.value}
            className="display-none"
            onClick={onChange}
            onChange={() => {}}
            checked={value === option.value}
            aria-selected={value === option.value}
            role="tab"
          />
          <Box
            as="label"
            borderWidth="0"
            cursor="pointer"
            display="inline-flex"
            justifyContent="center"
            fontWeight="bold"
            textAlign="center"
            width="50"
            radius="md"
            fontSize={size}
            color={value === option.value ? 'grey-600' : 'grey-500'}
            htmlFor={option.id}
            // className="switch__label"
            position="relative"
            style={{
              zIndex: 100,
            }}
          >
            {option.label}
          </Box>
          <Box
            display="block"
            position="absolute"
            background="white"
            borderWidth="sm"
            borderColor="grey-100"
            // shadow="2xs"
            width="50"
            cursor="pointer"
            radius="md"
            className={switchIndicatorClasses}
          />
        </>
      ))}
    </Box>
  );
});
