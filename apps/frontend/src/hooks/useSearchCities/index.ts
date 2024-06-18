import { useEffect } from 'react';

import { useLazyGetCitiesByNameQuery } from 'src/api';
import useDebounce from 'src/hooks/useDebounce';
import { CitiesResponse } from 'src/types';

/**
 * Custom hook to search cities based on a debounced search value.
 *
 * @param searchValue The search value for city names.
 * @returns A tuple containing the search results and loading state.
 */
export const useSearchCities = (
  searchValue: string,
): [CitiesResponse[] | undefined, { isLoading: boolean }] => {
  const debounceValue = useDebounce(searchValue, 1000);
  const [getCities, { data: searchResult, isLoading }] = useLazyGetCitiesByNameQuery();

  // Effect to fetch cities when debounceValue changes
  useEffect(() => {
    // Only fetch cities if debounceValue length is greater than 2 characters
    if (debounceValue.length <= 2) {
      return;
    }
    // Call the API to fetch cities based on name prefix
    getCities({ namePrefix: debounceValue });
  }, [debounceValue]);

  return [searchResult, { isLoading }];
};
