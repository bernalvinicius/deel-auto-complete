import React from 'react';
import userEvent, { render, screen } from '@testing-library/react';
import AutoComplete from './AutoComplete';

describe('AutoComplete component', () => {
  // test('renders AutoComplete component', () => {
  //   render(<AutoComplete />);
  //   const autoCompleteElement = screen.getByText('Auto Complete - Deel');
  //   expect(autoCompleteElement).toBeInTheDocument();
  // });

  test('renders loading state when isLoading is true', () => {
    const user = userEvent.setup();
    const testText = 'te';

    render(<AutoComplete />);

    // INFO: use the query that best suit your needs to access the input
    const autoCompleteInput = screen.getByLabelText(/input/i);

    await user.type(autocompleteInput, testText);

    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  // test('renders "No countries found" when inputValue is at least 3 characters and searchResults is empty', () => {
  //   render(<AutoComplete />);
  //   const inputElement = screen.getByPlaceholderText('Search Country...');
  //   userEvent.type(inputElement, 'abc');
  //   const noCountriesElement = screen.getByText('No countries found');
  //   expect(noCountriesElement).toBeInTheDocument();
  // });

  // test('renders search results when inputValue is at least 3 characters and searchResults is not empty', () => {
  //   render(<AutoComplete />);
  //   const inputElement = screen.getByPlaceholderText('Search Country...');
  //   userEvent.type(inputElement, 'uni');
  //   const resultsElement = screen.getByRole('list');
  //   expect(resultsElement).toBeInTheDocument();
  // });
});
