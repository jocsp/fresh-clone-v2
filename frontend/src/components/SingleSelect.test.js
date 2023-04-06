import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { useState } from 'react';
import SingleSelect from './SingleSelect';

const Component = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    {
      _id: '640412388a245c20e2ea9a61',
      name: 'option 1',
    },
    {
      _id: '640412528a245c20e2ea9a62',
      name: 'option 2',
    },
  ];

  return (
    <SingleSelect
      label="Label"
      options={options}
      optionSelected={selectedOption}
      setOptionSelected={setSelectedOption}
    />
  );
};

test('check if label is displayed correctly', () => {
  render(<Component />);

  const label = screen.getByText(/label/i);

  expect(label).toBeInTheDocument();
});

test('options are displayed when clicking the input box', async () => {
  render(<Component />);

  const input = screen.getByRole('textbox');

  await user.click(input);

  const options = screen.getAllByText(/option/i);

  expect(options).toHaveLength(2);
});

test('when typing only the queried options should be displayed', async () => {
  render(<Component />);

  const input = screen.getByRole('textbox');

  await user.click(input);

  await user.keyboard('option 2');

  const options = screen.getAllByText(/option/i);

  const optionQueried = screen.getByText('option 2');

  expect(options).toHaveLength(1);
  expect(optionQueried).toBeInTheDocument();
});

test('clicking on option queried should change the input value', async () => {
  render(<Component />);

  const input = screen.getByRole('textbox');

  await user.click(input);

  await user.keyboard('option 2');

  const optionQueried = screen.getByText(/option/i);

  await user.click(optionQueried);

  expect(input.value).toEqual('option 2');
});

test('when input is empty and not options is selected input should be empty', async () => {
  render(<Component />);

  const label = screen.getByText(/label/i);
  const input = screen.getByRole('textbox');

  await user.click(input);

  await user.click(label);

  expect(input.value).toEqual('');
});
