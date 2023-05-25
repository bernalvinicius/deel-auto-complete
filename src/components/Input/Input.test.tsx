import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';
import { DataContext } from '../../contexts';

describe('Input component', () => {
  test('renders input field', () => {
    render(
      <DataContext.Provider
        value={{ inputValue: '', setInputValue: jest.fn() }}
      >
        <Input />
      </DataContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText('Search Country...');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  test('calls setInputValue on input change', () => {
    const setInputValueMock = jest.fn();

    render(
      <DataContext.Provider
        value={{ inputValue: '', setInputValue: setInputValueMock }}
      >
        <Input />
      </DataContext.Provider>
    );

    const inputElement = screen.getByPlaceholderText('Search Country...');
    fireEvent.change(inputElement, { target: { value: 'united' } });

    expect(setInputValueMock).toHaveBeenCalledTimes(1);
    expect(setInputValueMock).toHaveBeenCalledWith('united');
  });
});
