/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBoxLimbi() {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={languages}
      getOptionLabel={(option) => option.nume}
      style={{ width: 350 }}
      renderInput={(params) => <TextField {...params} label="Alegeti limba in care va fi trimis textul" variant="outlined" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const languages = [
  { nume: 'Engleza', id: "en"  },
  { nume: 'Franceza', id:"fr" },
  { nume: 'Spaniola', id:"es"},
  { nume: 'Italiana', id:"it"},
 
];
