import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import DateInput from './DateInput';

describe('DateInput', () => {
  describe('Default', () => {
    it('renders a DateInput component with defaults', () => {
      render(
        <DateInput
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onChange: () => null,
          }}
        />,
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Popover', () => {
    it('opens the Popover when the input is clicked', async () => {
      render(
        <DateInput
          dateFormat="yyyy/MM/dd"
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onChange: () => null,
          }}
        />,
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();

      fireEvent.click(input);

      const popoverContainer = screen.getByRole('dialog');
      await waitFor(() => expect(popoverContainer).toHaveAttribute('data-popper-placement', 'bottom'));
    });
  });

  describe('Date Formatting', () => {
    it('formats the date when a format is passed', async () => {
      const date = new Date(1995, 11, 14);
      render(
        <DateInput
          dateFormat="yyyy/MM/dd"
          textInputProps={{
            id: 'myInput',
            label: 'Select Date',
          }}
          datePickerProps={{
            onChange: () => null,
            openToDate: date,
            selected: date,
          }}
        />,
      );

      const input = screen.getByLabelText('Select Date');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('value', '1995/12/14');
    });
  });

  it('formats both dates when range is being selected', async () => {
    const dateOne = new Date(1995, 11, 14);
    const dateTwo = new Date(1995, 11, 16);
    render(
      <DateInput
        dateFormat="yyyy/MM/dd"
        textInputProps={{
          id: 'myInput',
          label: 'Select Date',
        }}
        datePickerProps={{
          onChange: () => null,
          openToDate: dateOne,
          startDate: dateOne,
          endDate: dateTwo,
          selectsRange: true,
        }}
      />,
    );

    const input = screen.getByLabelText('Select Date');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', '1995/12/14 - 1995/12/16');
  });

  it('formats one date if selecting range', async () => {
    const dateOne = null;
    const dateTwo = new Date(1995, 11, 16);
    render(
      <DateInput
        dateFormat="yyyy/MM/dd"
        textInputProps={{
          id: 'myInput',
          label: 'Select Date',
        }}
        datePickerProps={{
          onChange: () => null,
          openToDate: dateTwo,
          startDate: dateOne,
          endDate: dateTwo,
          selectsRange: true,
        }}
      />,
    );

    const input = screen.getByLabelText('Select Date');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', ' - 1995/12/16');
  });
});
