import {DropdownButton, Dropdown} from 'react-bootstrap'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { conf } from "../../conf";
const Category = (props) => {
    const [dataCategory, setDataCategory] = useState([]);
    const [category, setCategory] = useState(""); 
  
    useEffect(() => {
      axios
        .get(`${conf.api_url}/api/v1/category`)
        .then((res) => setDataCategory(res.data.data));
    }, []);
    return (
        
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
    )
}

export default Category;