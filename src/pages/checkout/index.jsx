import React, { useState } from "react";
import { ProgressBar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/chart";
import { useNavigate } from "react-router";
import { cancelOrder } from "../../app/chart/actions";
import Address from "../address";
import Order from "../order";
import Invoices from "../invoices";

const Checkout = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [bar, setbar] = useState(0);

  const address = useSelector((state) => state.address.address.id);
  function goNextPage() {
    setPage((page) => page + 1);
    setbar((bar) => bar + 50);
  }

  function goBackPage() {
    setPage((page) => page - 1);
    setbar((bar) => bar - 50);
  }



  return (
    <div className="parent-div">
      <Container className="mt-3">
        <ProgressBar now={bar} label={`${bar}%`} variant="warning" />
        <div className="component-div d-flex justify-content-center">
          <div className="display ">
            {page === 1 && (
              <div className="mt-5">
                
                  <Chart width="40rem" Checkout={true} />{" "}
                <div className="d-flex mt-3">
                  <button onClick={() => navigate('/')} className="btn btn-danger">
                    Back
                  </button>

                  <button
                    onClick={goNextPage}
                    className="btn btn-primary ms-auto"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {page === 2 && (
              <>
                <Address />
                <div className="d-flex mt-3">
                  <button
                    onClick={goBackPage}
                    className="btn btn-danger d-flex justify-content-start"
                  >
                    Back
                  </button>
                  {address ? (
                    <button
                      onClick={goNextPage}
                      className="btn btn-primary ms-auto"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={goNextPage}
                      disabled
                      className="btn btn-primary ms-auto"
                    >
                      Next
                    </button>
                  )}
                </div>
              </>
            )}
            {page === 3 && (
              <>
                <Order />
                <button onClick={goBackPage} className="btn btn-danger">
                  Back
                </button>
              </>
            )}
            {page === 4 && <Invoices />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
