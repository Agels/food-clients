import { useState, useEffect, Fragment } from "react";
import { addTags } from "../../app/tags/actions";
import { ToggleButton } from "react-bootstrap";
import { useDispatch } from "react-redux";

import axios from "axios";
import {conf} from '../../conf'
const Tags = (props) => {
  const dispatch = useDispatch();
  const [dataTags, setDataTags] = useState([]);
  const [tags, setTags] = useState([]);
  const handleChekbox = (e) => {
    let newArr = [...tags, e.target.id];
   
    if (tags.includes(e.target.id)) {
      newArr = newArr.filter((tags) => tags !== e.target.id);
    }
    setTags(newArr);
    dispatch(addTags(newArr))

  };

  useEffect(() => {
    axios
      .get(`${conf.api_url}/api/v1/tags`)
      .then((res) => setDataTags(res.data.data));
  }, []);
  return (
    <>
      <h5>
        {dataTags.map((item, index) => {
          return (
            <Fragment key={index}>
                 <ToggleButton
                className="border border-dark"
                id={item.name}
                type="checkbox"
                value={item.name}
                variant={tags.includes(item.name) ? 'dark' :''}
                onChange={handleChekbox}
                
                >
                {item.name}
                </ToggleButton> {" "}
           
             
            </Fragment>
          );
        })}
      </h5>
    </>
  );
};

export default Tags;
