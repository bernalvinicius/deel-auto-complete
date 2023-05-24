import React, { useContext, useState, useEffect, useCallback } from 'react';
import { DataContext } from 'src/contexts';
import { Country } from 'src/types';
import Input from '../Input';
import './index.css';

const AutoComplete = () => {
  const { inputValue } = useContext(DataContext);
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Async function to fetch Countries API
   */
  const fetchData = async (value: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://restcountries.com/v3/name/${value}`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  };

  /**
   * Function to filter countries specifically for
   * common name
   */
  const filterResults = useCallback(
    (results: Country[]) => {
      return results.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue)
      );
    },
    [inputValue]
  );

  /**
   * Function to highlight typed input
   */
  const highlightSearchTerm = (text: string) => {
    /**
     * ${inputValue}: in parentheses for a global capture represents the search value entered by the user
     * gi: (global): Matches all text; (case-insensitive): doesn't differentiate between uppercase and lowercase letters
     */
    const regex = new RegExp(`(${inputValue})`, 'gi');
    /**
     * $1: represents the text value that was found in the regular expression.
     */
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  useEffect(() => {
    if (inputValue && inputValue.length >= 3) {
      fetchData(inputValue);
    } else {
      setSearchResults([]);
    }
  }, [inputValue]);

  return (
    <div>
      <h1>Auto Complete - Deel</h1>
      <Input />

      <h2>Results: </h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : inputValue?.length >= 3 && searchResults.length === 0 ? (
        <p>No countries found</p>
      ) : (
        <ul>
          {filterResults(searchResults).map((country, index) => (
            <li key={index}>
              {/* 
                dangerouslySetInnerHTML: dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM.
                __html: is the key of the object returned from the highlightSearchTerm() function
              */}
              <h3
                dangerouslySetInnerHTML={{
                  __html: highlightSearchTerm(country.name.common),
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
