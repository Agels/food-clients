import {
  Dropdown,
  FormControl,
  InputGroup,
  DropdownButton,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { conf } from "../../conf";
const Search = (props) => {
  const [dataCategory, setDataCategory] = useState([]);
  const [category, setCategory] = useState("");
  console.log(process.env.REACT_APP_API_HOST);
  useEffect(() => {
    axios
      .get(`${conf.api_url}/api/v1/category`)
      .then((res) => setDataCategory(res.data.data));
  }, []);
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          aria-label="Text input with dropdown button"
          type="text"
          onChange={(e) => props.onChange(e.target.value)}
        />

        <DropdownButton
          variant="outline-secondary"
          title={category ? category : "ALL"}
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item onClick={() => {props.onClick(""); setCategory("")}}>All</Dropdown.Item>
          {dataCategory.map((e, index) => {
            return (
              <div key={index}>
                <Dropdown.Item
                  onClick={() => {
                    props.onClick(e.name);
                    setCategory(e.name);
                  }}
                >
                  {e.name}
                </Dropdown.Item>
              </div>
            );
          })}
        </DropdownButton>
      </InputGroup>
    </>
  );
};

export default Search;
