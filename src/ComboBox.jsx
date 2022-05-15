/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={cities}
      getOptionLabel={(option) => option.nume}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Alegeti un oras..." variant="outlined" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const cities = [
  { nume: 'Bucuresti', id: 1, nameToUse:"Bucharest" },
  { nume: 'Iasi', id:2, nameToUse:"Iasi"},
  { nume: 'Cluj', id: 3, nameToUse:"Cluj" },
  { nume: 'Tecuci', id:4, nameToUse:"Tecuci"},
  { nume: 'Timisoara', id:4, nameToUse:"Timisoara"},
  { nume: 'Constanta', id:4, nameToUse:"Constanta"},
 
];
