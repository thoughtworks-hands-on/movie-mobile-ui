import React from 'react';
import {render, screen} from '../../utilities/test-util';
import Login from './Login';

describe('[Screens] - [Login]', () => {
  test('should render the Login screen', () => {
    const {root} = render(<Login />);
    expect(root).toBeTruthy();
  });

  test('should check if the login button is present', () => {
    const loginButtonTestId = 'login-button';
    render(<Login />);
    const loginButton = screen.getByTestId(loginButtonTestId);

    expect(loginButton).toBeTruthy();
  });
});
