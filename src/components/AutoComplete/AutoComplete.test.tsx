import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutoComplete from './AutoComplete';

describe('AutoComplete component', () => {
  test('renders AutoComplete component', () => {
    render(<AutoComplete />);
    const autoCompleteElement = screen.getByText('Auto Complete - Deel');
    expect(autoCompleteElement).toBeInTheDocument();
  });

  test('renders search results when inputValue is at least 3 characters and searchResults is not empty', () => {
    render(<AutoComplete />);
    const inputElement = screen.getByPlaceholderText('Search Country...');
    userEvent.type(inputElement, 'uni');
    const resultsElement = screen.getByRole('list');
    expect(resultsElement).toBeInTheDocument();
  });
});
