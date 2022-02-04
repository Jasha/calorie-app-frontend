import React, { SyntheticEvent, useEffect, useCallback, useState } from 'react';
import { AutocompleteValue, debounce, SxProps, Theme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import useGetFoodOptions from 'api/nutritionix/useGetFoodOptions';
import useGetCommonCalorie from 'api/nutritionix/useGetCommonCalorie';
import useGetBrandedCalorie from 'api/nutritionix/useGetBrandedCalorie';

interface IFoodAutocompleteProps {
  fieldStyle: SxProps<Theme>;
  fieldName: string;
  fieldLabel: string;
  fieldValue: string;
  error: boolean | undefined;
  helperText: string | boolean | undefined;
  onInputChange: (newValue: string) => void;
  onCalorieFound: (calorie: number) => void;
}

interface IOptionItem {
  key: string;
  value: string;
  tag: string;
}

const FoodAutocomplete: React.FC<IFoodAutocompleteProps> = ({
  fieldStyle,
  fieldName,
  fieldLabel,
  fieldValue,
  error,
  helperText,
  onInputChange,
  onCalorieFound,
}: IFoodAutocompleteProps) => {
  const [autocompleteValue, setAutocompleteValue] =
    useState<IOptionItem | null>(null);
  const [foodOptions, setFoodOptions] = useState<Array<IOptionItem>>([]);

  const [{ data: getData, loading: getLoading }, getFoodOptions] =
    useGetFoodOptions();
  const [{ data: commonCalorieData }, getCommonCalorie] = useGetCommonCalorie();
  const [{ data: brandedCalorieData }, getBrandedCalorie] =
    useGetBrandedCalorie();

  const debouncedGetFoodOptions = useCallback(
    debounce((query) => getFoodOptions({ params: { query } }), 500),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleCalorieFound = (newCalorieValue: number) => {
    setAutocompleteValue(null);
    setFoodOptions([]);
    onCalorieFound(newCalorieValue);
  };

  useEffect(() => {
    if (commonCalorieData) {
      handleCalorieFound(commonCalorieData.foods[0].nf_calories);
    }
  }, [commonCalorieData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (brandedCalorieData) {
      handleCalorieFound(brandedCalorieData.foods[0].nf_calories);
    }
  }, [brandedCalorieData]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (getData) {
      setFoodOptions([
        ...getData.common.map((item) => ({
          key: item.tag_id,
          value: item.food_name,
          tag: 'COMMON',
        })),
        ...getData.branded.map((item) => ({
          key: item.nix_item_id,
          value: item.food_name,
          tag: 'BRANDED',
        })),
      ]);
    }
  }, [getData]);

  const handleChange = (
    event: SyntheticEvent,
    newValue: AutocompleteValue<IOptionItem, undefined, undefined, undefined>,
  ) => {
    setAutocompleteValue(newValue);

    if (!newValue) return;

    switch (newValue.tag) {
      case 'COMMON': {
        getCommonCalorie({ data: { query: newValue.value } });
        return;
      }

      case 'BRANDED': {
        getBrandedCalorie({
          params: { nix_item_id: newValue.key },
        });
        return;
      }

      default:
        return;
    }
  };

  const handleInputChange = (event: SyntheticEvent, newInputValue: string) => {
    onInputChange(newInputValue);

    if (!newInputValue.trim()) return;

    if (event && event.type !== 'click') {
      debouncedGetFoodOptions(newInputValue);
    }
  };

  return (
    <Autocomplete
      id={fieldName}
      options={foodOptions}
      groupBy={(option) => option.tag}
      getOptionLabel={(option) => option.value}
      sx={fieldStyle}
      loading={getLoading}
      clearOnBlur={false}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      value={autocompleteValue}
      inputValue={fieldValue}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          required
          label={fieldLabel}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {getLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default FoodAutocomplete;
