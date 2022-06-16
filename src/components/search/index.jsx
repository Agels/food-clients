import {
  FormControl,
  InputGroup,

} from "react-bootstrap";

import Category from "../category";
const Search = (props) => {
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="Text input with dropdown button"
          type="text"
          onChange={(e) => props.onChange(e.target.value)}
        />
        {/* this callback to home search to category component */}
        <Category onClick={(val) => {props.onClick(val)}} />
      </InputGroup>
    </>
  );
};

export default Search;
