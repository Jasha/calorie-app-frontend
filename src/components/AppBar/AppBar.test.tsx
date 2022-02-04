import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AppBar from './AppBar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

const mockRemoveUser = jest.fn();
jest.mock('utils/userService', () => ({
  removeUser: () => mockRemoveUser(),
}));

const mockProfile = {
  name: 'Regular Name',
  is_superuser: false,
  calories_threshold: 100,
};
jest.mock('hooks/useProfile', () => () => [mockProfile]);

describe('AppBar', () => {
  test('Should render component', () => {
    render(<AppBar />);

    const title = screen.getByText(`Hello, ${mockProfile.name}`);
    expect(title).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
    expect(buttons[0]).toHaveTextContent('+ Invite friend');
    expect(buttons[1]).toHaveTextContent('Logout');
  });

  test('Should handle logout', () => {
    render(<AppBar />);

    const button = screen.getByText('Logout');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(mockRemoveUser).toBeCalled();
    expect(mockNavigate).toBeCalled();
  });
});
