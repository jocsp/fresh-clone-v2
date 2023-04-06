import {
  findAllByTestId,
  queryByText,
  render,
  screen,
  within,
} from '@testing-library/react';
import ToDo from '../ToDo.js';
import '@testing-library/jest-dom';
import { createCustomServer, createServer } from '../../../mocks/server.js';
import user from '@testing-library/user-event';

const addedTodo = 'todo 3';

const addTodo = async () => {
  const input = screen.getByRole('textbox');
  await user.click(input);
  await user.keyboard(addedTodo);
  await user.keyboard('[Enter]');

  return input;
};

describe('Todo component with 2 todos beforehand', () => {
  createServer([
    {
      method: 'get',
      url: '/api/todo/get-todos',
      res: [
        {
          _id: '6417b64e1417968155f49a51',
          todo: 'todo 1',
          checked: true,
        },
        {
          _id: '6417b65e1417968155f49a5e',
          todo: 'todo 2',
          checked: false,
        },
      ],
    },
    {
      method: 'post',
      url: '/api/todo/add-todo',
      res: { _id: '6417b6asdf17968155f49a5e', todo: addedTodo, checked: false },
    },
    {
      method: 'delete',
      url: '/api/todo/delete-todo',
      res: {},
    },
  ]);

  test('check todos are displayed', async () => {
    render(<ToDo />);

    const todo1 = await screen.findByText(/todo 1/i);
    const todo2 = await screen.findByText(/todo 2/i);

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });

  test('todo input value should change when typing', async () => {
    render(<ToDo />);
    await screen.findAllByText(/todo/i);

    const input = screen.getByRole('textbox');
    await user.click(input);
    await user.keyboard(addedTodo);

    expect(input).toHaveValue(addedTodo);
  });

  test('todo input shold be empty after submitting', async () => {
    render(<ToDo />);
    await screen.findAllByText(/todo/i);

    const input = await addTodo();

    expect(input).toHaveValue('');
  });

  test('todo should not be displayed after deleting', async () => {
    render(<ToDo />);

    const deleteButtons = await screen.findAllByTestId('delete-todo');

    await user.click(deleteButtons[1]);

    const todo1 = screen.queryByText('todo 1');

    expect(todo1).not.toBeInTheDocument();
  });
});

describe('Todo component with no todos beforehand', () => {
  createServer([
    {
      method: 'get',
      url: '/api/todo/get-todos',
      res: [],
    },
    {
      method: 'post',
      url: '/api/todo/add-todo',
      res: { _id: '6417b6asdf17968155f49a5e', todo: addedTodo, checked: false },
    },
    {
      method: 'post',
      url: '/api/todo/change-todo',
      res: { _id: '6417b6asdf17968155f49a5e', todo: addedTodo, checked: true },
    },
  ]);

  test('todo should be displayed after submitting', async () => {
    render(<ToDo />);

    await addTodo();

    const newTodo = await screen.findByText(addedTodo);
    const checkbox = await screen.findByRole('checkbox');

    expect(checkbox.checked).toEqual(false);
    expect(newTodo).toBeInTheDocument();
  });

  test('checkbox should change value after clicking it', async () => {
    render(<ToDo />);

    await addTodo();

    const checkbox = await screen.findByRole('checkbox');

    await user.click(checkbox);

    expect(checkbox.checked).toEqual(true);
  });
});
