import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from 'src/contexts';
import { Country } from 'src/types';
import Input from '../Input';

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
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setIsLoading(false);
  };

  const filterResults = (results: Country[]) => {
    return results.filter((country) =>
      country.name.common.toLowerCase().includes(inputValue)
    );
  };

  useEffect(() => {
    if (!inputValue || inputValue.length < 3) {
      setSearchResults([]);
    } else {
      fetchData(inputValue);
    }
  }, [inputValue]);

  return (
    <div>
      <Input />
      <br />
      <h3>Valor do input: </h3>
      <br />

      {isLoading ? (
        <p>Loading...</p>
      ) : inputValue.length >= 3 ? (
        searchResults.length > 0 ? (
          <ul>
            {filterResults(searchResults).map((country, index) => (
              <li key={index}>
                <h3>{country.name.common}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p>No countries found</p>
        )
      ) : null}
    </div>
  );
};

export default AutoComplete;
