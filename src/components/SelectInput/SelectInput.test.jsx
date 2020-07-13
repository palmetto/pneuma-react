import React from 'react';
import Select from 'react-select';
import '@babel/polyfill';
import 'mutationobserver-shim';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import selectEvent from 'react-select-event';
import SelectInput from './SelectInput';

const selectOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

describe('SelectInput', () => {
  describe('Props Validation', () => {
    test('Throws error if required prop "id" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<SelectInput onChange={jest.fn()} options={selectOptions} />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `id`');
    });

    test('Throws error if required prop "onChange" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<SelectInput id="testId" options={selectOptions} />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `onChange`');
    });

    test('Throws error if required prop "options" is not supplied to component', () => {
      console.error = jest.fn(); // eslint-disable-line no-console
      render(<SelectInput id="testId" onChange={jest.fn()} />);
      expect(console.error).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
      expect(console.error.mock.calls[0][0]) // eslint-disable-line no-console
        .toContain('Failed prop type: The prop `options`');
    });
  });

  describe('Callback Handling', () => {
    // test('it fires onChange callback on change', () => {
    //   const mockedHandleChange = jest.fn();

    //   render(
    //     <SelectInput
    //       id="testId"
    //       onChange={mockedHandleChange}
    //       placeholder="Test Placeholder"
    //       options={selectOptions}
    //     />,
    //   );

    //   fireEvent.blur(screen.getByRole('textbox'));

    //   expect(mockedHandleChange).toBeCalledTimes(1);
    // });

    test('it fires onFocus callback on focus', () => {
      const mockedHandleFocus = jest.fn();

      render(
        <SelectInput
          id="testId"
          onFocus={mockedHandleFocus}
          placeholder="Test Placeholder"
          options={selectOptions}
        />,
      );

      fireEvent.focus(screen.getByRole('textbox'));

      expect(mockedHandleFocus).toBeCalledTimes(1);
    });

    test('it fires onBlur callback on blur', () => {
      const mockedHandleBlur = jest.fn();

      render(
        <SelectInput
          id="testId"
          onBlur={mockedHandleBlur}
          placeholder="Test Placeholder"
          options={selectOptions}
        />,
      );

      fireEvent.blur(screen.getByRole('textbox'));

      expect(mockedHandleBlur).toBeCalledTimes(1);
    });
  });

  describe('React-Select', () => {
    describe('single select', () => {
      test('it has no items selected on initial render', () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" />
          </form>,
        );

        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: '' });
      });

      test('it sets the selected value for item that is selected', async () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" />
          </form>,
        );
        await selectEvent.select(screen.getByLabelText('Ice Cream Flavors'), ['Vanilla']);
        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: 'vanilla' });
      });
    });

    describe('multi select', () => {
      test('it has no items selected on initial render', () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" isMulti />
          </form>,
        );

        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: '' });
      });

      test('it allows the selection of multiple items', async () => {
        render(
          <form data-testid="form">
            <label htmlFor="iceCreamFlavors">Ice Cream Flavors</label>
            <Select options={selectOptions} name="iceCreamFlavors" id="iceCreamFlavors" isMulti />
          </form>,
        );
        await selectEvent.select(screen.getByLabelText('Ice Cream Flavors'), ['Chocolate', 'Vanilla']);
        expect(screen.getByTestId('form')).toHaveFormValues({ iceCreamFlavors: ['chocolate', 'vanilla'] });

        await selectEvent.select(screen.getByLabelText('Ice Cream Flavors'), 'Strawberry');
        expect(screen.getByTestId('form'))
          .toHaveFormValues({ iceCreamFlavors: ['chocolate', 'vanilla', 'strawberry'] });
      });
    });
  });

  describe('States', () => {
    describe('No label, with a placeholder', () => {
      test('it renders input without a label, and with a placeholder', () => {
        render(
          <SelectInput
            id="testId"
            placeholder="Test Placeholder"
            options={selectOptions}
          />,
        );

        expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
      });
    });

    describe('With a label, and no custom placeholder', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
          />,
        );

        expect(screen.getAllByLabelText('Select Label')).toHaveLength(2);
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Single select, pre-selected', () => {
      test('it renders with value pre-selected', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
            value={selectOptions[2]}
          />,
        );

        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Multi select, no selection', () => {
      test('it renders input with a label, and with a default placeholder', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
            isMulti
          />,
        );

        expect(screen.getAllByLabelText('Select Label')).toHaveLength(2);
        expect(screen.getByText('Select...')).toBeInTheDocument();
      });
    });

    describe('Multi select, with multiple items selected', () => {
      test('it renders input with a label, and with two items selected', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
            isMulti
            value={[
              selectOptions[0],
              selectOptions[2],
            ]}
          />,
        );

        expect(screen.getAllByLabelText('Select Label')).toHaveLength(2);
        expect(screen.queryByText('Select...')).toBeNull();
        expect(screen.getByText('Chocolate')).toBeInTheDocument();
        expect(screen.getByText('Vanilla')).toBeInTheDocument();
      });
    });

    describe('Is Required', () => {
      test('it renders an asterisk in the label', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
            isRequired
          />,
        );

        expect(screen.getByText('Select Label')).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument();
      });
    });

    describe('Is Disabled', () => {
      test('it disables the input', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
            isDisabled
          />,
        );

        expect(screen.getByRole('textbox')).toBeDisabled();
      });
    });

    describe('Is Invalid, with a helpful message', () => {
      test('it renders the helpful message', () => {
        render(
          <SelectInput
            id="testId"
            label="Select Label"
            options={selectOptions}
            hasError="Helpful message"
          />,
        );

        expect(screen.getByText('Helpful message')).toBeInTheDocument();
      });
    });
  });
});
