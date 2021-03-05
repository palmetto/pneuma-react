import { InputMaskType } from './TextInput';

const getInputMask = (
  mask: InputMaskType,
  availableInputMasks: {
    phone: {
      numericOnly: boolean;
      blocks: number[];
      delimiters: string[];
    };
    creditCard: {
      creditCard: boolean;
    };
    date: {
      date: boolean;
      delimiter: string;
      datePattern: string[];
    };
  },
) => {
  if (typeof mask === 'string') {
    return availableInputMasks[mask];
  }

  return mask;
};

export default getInputMask;