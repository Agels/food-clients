import React from "react";
import Cards from "../../components/cards";
import Search from "../../components/search";
import Chart from "../../components/chart";
import Tags from "../../components/tags";
import { Row, Col, Container, Pagination, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbars from "../../components/navbars";
import { useSelector } from "react-redux";

import { conf } from "../../conf";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const tags = useSelector((state) => state.tags);

  const [number, setNumber] = useState(1); // No of pages
  const [skip, setSkip] = useState(0);
  const [postPerPage] = useState(6);

  const urlImage = `${conf.api_url}/images/products/`;
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      let tag = "";
      if (tags[0]?.length === 0 || tags.length === 0) {
        tag = "";
      } else {
        tag = `&tags[]=${tags}`;
      }
      await axios
        .get(
          `${conf.api_url}/api/v1/product?q=${search}&category=${category}${tag}&skip=${skip}`
        )
        .then((res) => {
          setProduct(res.data.data);
          setLoading(false);
        });
    };
    getProduct();
  }, [search, category, tags, number, skip]);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = product.slice(firstPost, lastPost);
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(product.length / postPerPage); i++) {
    pageNumber.push(i);
  }
  const ChangePage = (pageNumber) => {
    setSkip(skip + currentPost);
    setNumber(pageNumber);
  };
  return (
    <Container>
      <Row>
        <Col lg={4}>
          <Chart width="20rem" />
        </Col>
        <Col lg={8}>
          <Navbars />
          <Search
            onChange={(val) => setSearch(val)}
            onClick={(val) => setCategory(val)}
          />
          <Tags />
          <Container>
            <Row>
              {isLoading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : (
                currentPost.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Cards
                        id={item._id}
                        thisKey={index}
                        name={item.name}
                        price={item.price}
                        image={urlImage + item.image_url}
                        addToChart={() => item}
                      />
                    </React.Fragment>
                  );
                })
              )}
            </Row>
            <div className="mt-4 d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev
                  disabled={number <= 1}
                  onClick={() => setNumber(number - 1)}
                />
                {pageNumber.map((Elem, index) => {
                  return (
                    <>
                      <Pagination.Item
                        key={index}
                        variant="danger"
                        active={Elem === number}
                        onClick={() => ChangePage(Elem)}
                      >
                        {Elem}
                      </Pagination.Item>
                    </>
                  );
                })}
                <Pagination.Next
                  onClick={() => setNumber(number + 1)}
                  disabled={number >= pageNumber.length}
                />
              </Pagination>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
