import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addDays } from 'date-fns';

import LogsNavigator from './LogsNavigator';

describe('LogsNavigator', () => {
  test('Should render component', () => {
    render(
      <LogsNavigator
        date={new Date()}
        onLeftClick={jest.fn()}
        onRightClick={jest.fn()}
      />,
    );

    const title = screen.getByText('Today');
    expect(title).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[1]).toBeDisabled();
  });

  test('Should call navigation handlers', () => {
    const onLeftClickMock = jest.fn();
    const onRightClickMock = jest.fn();

    const { rerender } = render(
      <LogsNavigator
        date={new Date()}
        onLeftClick={onLeftClickMock}
        onRightClick={onRightClickMock}
      />,
    );

    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[0]);

    expect(onLeftClickMock).toHaveBeenCalled();

    rerender(
      <LogsNavigator
        date={addDays(new Date(), -1)}
        onLeftClick={onLeftClickMock}
        onRightClick={onRightClickMock}
      />,
    );

    const title = screen.getByText('Yesterday');
    expect(title).toBeInTheDocument();
    expect(buttons[1]).toBeEnabled();

    userEvent.click(buttons[1]);

    expect(onRightClickMock).toHaveBeenCalled();
  });
});
