import React, { useContext, useState, useEffect, useCallback } from 'react';
import { DataContext } from 'src/contexts';
import { Country } from 'src/types';
import Input from '../Input';
import './index.css';

const DEBOUNCE_DELAY = 500;

const AutoComplete = () => {
  const { inputValue } = useContext(DataContext);
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const filterResults = useCallback(
    (results: Country[]) => {
      return results.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue)
      );
    },
    [inputValue]
  );

  const highlightSearchTerm = (text: string) => {
    const regex = new RegExp(`(${inputValue})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue && inputValue.length >= 3) {
        fetchData(inputValue);
      } else {
        setSearchResults([]);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div>
      <Input />
      <br />
      <h3>Valor do input: </h3>
      <br />

      {isLoading ? (
        <p>Loading...</p>
      ) : inputValue?.length >= 3 && searchResults.length === 0 ? (
        <p>No countries found</p>
      ) : (
        <ul>
          {filterResults(searchResults).map((country, index) => (
            <li key={index}>
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
