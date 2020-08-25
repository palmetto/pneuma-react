import React, {
  FC,
  ChangeEvent,
  FocusEvent,
} from 'react';
import CheckboxInput from '../../CheckboxInput/CheckboxInput';

interface FormikCheckboxInputProps {
  field: {
    id: string;
    label: string;
    name: string;
    onBlur: (event: FocusEvent<HTMLElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: boolean;
  };
  form: { [key: string]: any; }; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const FormikCheckboxInput: FC<FormikCheckboxInputProps> = ({
  field: {
    id,
    label,
    name,
    onBlur,
    onChange,
    value = false,
  },
  form: { touched, errors },
  ...props
}) => (
  <CheckboxInput
    id={id}
    label={label}
    error={touched[name] && errors[name]}
    isChecked={value}
    onBlur={onBlur}
    onChange={onChange}
    {...props}
  />
);

export default FormikCheckboxInput;