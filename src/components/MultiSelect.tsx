import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type MultiSelectProps = {
  items: string[];
  onChange: (value: string[]) => void;
};

export const MultiSelect = (props: MultiSelectProps) => (
  <Autocomplete
    multiple
    options={props.items.map((option) => option)}
    renderTags={(value: readonly string[], getTagProps) =>
      value.map((option: string, index: number) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
      ))
    }
    slotProps={{
      paper: {
        elevation: 3,
      },
    }}
    onChange={(_, value) => props.onChange(value)}
    renderInput={(params) => <TextField {...params} />}
  />
);
