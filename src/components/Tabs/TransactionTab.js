import React, { useState } from "react";
import { Box } from "../elements";
import { Col, Form, Row, Table } from "react-bootstrap";
import { LabelField } from "../fields";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faSearch,
  faPlus,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import CustomPagination from "../CustomPagination";
import IconSearchBar from "../elements/IconSearchBar";
export default function TransactionTab() {
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 
  const [totalNumber, setTotalNumber] = useState(0); 
  const [open, Close] = useState(false);
  const handleDotBox = () => {
    Close(!open);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [state, setState] = useState({
    showOption: false,
    transactedOpen: false,
    courierOpen: false,
    categoryOpen: false,
    customerOpen: false,
    typeOpen: false,
    paymentOpen: false,
  });

  const handleStateChange = (key) => {
    setState((prevState) => {
      const newState = {};
      Object.keys(prevState).forEach((k) => {
        newState[k] = k === key ? !prevState[k] : false;
      });
      return newState;
    });
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div>
      <Box className="receipt-tab-main">
        <Box className="">
          <Box className="receipt-tab">
            <Col md={3} lg={2}>
              <Box className="receipt-textfield">
                <IconSearchBar/>
              </Box>
            </Col>
            <Box className="filter-box">
              <Box className="filter-box-item">
                <div onClick={() => handleStateChange("typeOpen")}>
                  <span className="filter-box-span"> Type </span>
                  <span className="filter-box-span-caret">
                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                  </span>
                </div>
                {state.typeOpen ? (
                  <Box className="filter-box-select-opt">
                    <Box className="filter-box-select-opt-box">
                      <Box className="filter-box-search">
                        <LabelField
                          type="text"
                          placeholder="Search here ..."
                          fieldSize="w-100 h-md"
                        />
                      </Box>
                      <Box className="filter-box-checkbox-main">
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Income" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Expence" />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>

            <Box className="filter-box">
              <Box className="filter-box-item">
                <div onClick={() => handleStateChange("transactedOpen")}>
                  <span className="filter-box-span">Transacted by </span>
                  <span className="filter-box-span-caret">
                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                  </span>
                </div>
                {state.transactedOpen ? (
                  <Box className="filter-box-select-opt">
                    <Box className="filter-box-select-opt-box">
                      <Box className="filter-box-search">
                        <LabelField
                          type="text"
                          placeholder="Search here ..."
                          fieldSize="w-100 h-md"
                        />
                      </Box>
                      <Box className="filter-box-checkbox-main">
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="TIS Software" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Cashier" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Witer 2" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Ahad" />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box className="filter-box">
              <Box className="filter-box-item">
                <div onClick={() => handleStateChange("customerOpen")}>
                  <span className="filter-box-span">Customers </span>
                  <span className="filter-box-span-caret">
                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                  </span>
                </div>
                {state.customerOpen ? (
                  <Box className="filter-box-select-opt">
                    <Box className="filter-box-select-opt-box">
                      <Box className="filter-box-search">
                        <LabelField
                          type="text"
                          placeholder="Search here ..."
                          fieldSize="w-100 h-md"
                        />
                      </Box>
                      <Box className="filter-box-checkbox-main">
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="TIS" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="MOHAMMAD" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Abdul Rehman" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Ahad" />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box className="filter-box">
              <Box className="filter-box-item">
                <div onClick={() => handleStateChange("courierOpen")}>
                  <span className="filter-box-span">Supplier </span>
                  <span className="filter-box-span-caret">
                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                  </span>
                </div>
                {state.courierOpen ? (
                  <Box className="filter-box-select-opt">
                    <Box className="filter-box-select-opt-box">
                      <Box className="filter-box-search">
                        <LabelField
                          type="text"
                          placeholder="Search here ..."
                          fieldSize="w-100 h-md"
                        />
                      </Box>
                      <Box className="filter-box-checkbox-main">
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Fish Market" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="MOHAMMAD" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Abdul Rehman" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Ahad" />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box className="filter-box">
              <Box className="filter-box-item">
                <div onClick={() => handleStateChange("categoryOpen")}>
                  <span className="filter-box-span">Category </span>
                  <span className="filter-box-span-caret">
                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                  </span>
                </div>
                {state.categoryOpen ? (
                  <Box className="filter-box-select-opt">
                    <Box className="filter-box-select-opt-box">
                      <Box className="filter-box-search">
                        <LabelField
                          type="text"
                          placeholder="Search here ..."
                          fieldSize="w-100 h-md"
                        />
                      </Box>
                      <Box className="filter-box-checkbox-main">
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Labour" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check
                              type="checkbox"
                              label="Other expenses"
                            />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Supplies" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Transfer" />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box className="filter-box">
              <Box className="filter-box-item">
                <div onClick={() => handleStateChange("paymentOpen")}>
                  <span className="filter-box-span">Balance </span>
                  <span className="filter-box-span-caret">
                    <FontAwesomeIcon icon={faAngleDown} />{" "}
                  </span>
                </div>
                {state.paymentOpen ? (
                  <Box className="filter-box-select-opt">
                    <Box className="filter-box-select-opt-box">
                      <Box className="filter-box-search">
                        <LabelField
                          type="text"
                          placeholder="Search here ..."
                          fieldSize="w-100 h-md"
                        />
                      </Box>
                      <Box className="filter-box-checkbox-main">
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Cash" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Card" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Card account" />
                          </Box>
                        </Box>
                        <Box className="filter-box-checkbox-div">
                          <Box className="filter-box-checkbox">
                            <Form.Check type="checkbox" label="Safe" />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Col md={12}>
              <Row>
                <Col md={10} style={{ display: "flex" }}>
                  <Box className="reciept-check-box reciept-check-box-child-f ">
                    <Form.Check type="checkbox" label="Show deleted " />
                  </Box>
                  <Box className="reciept-check-box reciept-check-box-child-f">
                    <Form.Check type="checkbox" label="Show sales" />
                  </Box>
                </Col>
                <Col md={2}>
                  <Box>
                    <Link
                      to={"/createTransaction"}
                      style={{ display: "block", marginTop: "10px" }}
                    >
                      {" "}
                      <button className="pm-create-btn">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Box>
                </Col>
              </Row>
            </Col>
          </Box>
        </Box>

        <Box className="receip-table-m">
          <Table responsive> 
            <thead className="thead-modifier thead-dark" style={{  color:"white" }} >
              <tr>
                <th>
                  ID
                  <button
                    style={{ color: "white" }}
                    className="sorting-icon"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </th>
                <th style={{ width: "135px" }}>
                  Operation time
                  <button
                    style={{ color: "white" }}
                    className="sorting-icon"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </th>
                <th style={{ width: "110px" }}>
                  Created at
                  <button
                    style={{ color: "white" }}
                    className="sorting-icon"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </th>
                <th>Transacted by</th>
                <th>Category</th>
                <th>Reference</th>
                <th>Description</th>
                <th>
                  Amount
                  <button
                    style={{ color: "white" }}
                    className="sorting-icon"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                  <br />
                  <span style={{color:'red'}}>112.00 SA</span>
                </th>
                <th>Account</th>
                <th style={{marginLeft:"15px"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="tbody-r">
                {" "}
                <td>1009</td>
                <td style={{ width: "135px" }}>Mar 09,23</td>
                <td style={{ width: "110px" }}>Mar 09,23</td>
                <td>Terminal 1</td>
                <td>Refund</td>
                <td>#41</td>
                <td>Transaction 1</td>
                <td>15.00</td>
                <td> Bank account</td>
                <td style={{marginLeft:"20px"}}>
                <Link to={"/payment-method-create"} > <button  title="Edit" className="btnlogo" >
                                  <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                </button></Link>
                                <button title="Delete" className="btnlogo"  >
                                  <FontAwesomeIcon icon={faTrash} color="#ee3432"/> </button>
                  {/* <Box className="dot-content" style={{ marginLeft: "20px" }}>
                    <div onClick={handleDotBox}>...</div>
                    {open ? (
                      <Box
                        className="DotBox-main-wrapper"
                        onClick={handleDotBox}
                      >
                        <Box className="DotBox-inner">
                          <Box className="DotBox-p-con">
                            <Link to={"/payment-method-create"}>
                              {" "}<FontAwesomeIcon
                                    icon={faEdit}
                                    color="#f29b30"
                                  />{" "}
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box> */}
                </td>
              </tr>
              <tr className="tbody-r">
                {" "}
                <td>1009</td>
                <td style={{ width: "135px" }}>Mar 09,23</td>
                <td style={{ width: "110px" }}>Mar 09,23</td>
                <td>Terminal 1</td>
                <td>Refund</td>
                <td>#41</td>
                <td>Transaction 1</td>
                <td>15.00</td>
                <td> Bank account</td>
                <td style={{marginLeft:"20px"}}>
                <Link to={"/payment-method-create"} > <button  title="Edit" className="btnlogo" >
                                  <FontAwesomeIcon icon={faEdit} color="#f29b30" />
                                </button></Link>
                                <button title="Delete" className="btnlogo"  >
                                  <FontAwesomeIcon icon={faTrash} color="#ee3432"/> </button>
                  {/* <Box className="dot-content" style={{ marginLeft: "20px" }}>
                    <div onClick={handleDotBox}>...</div>
                    {open ? (
                      <Box
                        className="DotBox-main-wrapper"
                        onClick={handleDotBox}
                      >
                        <Box className="DotBox-inner">
                          <Box className="DotBox-p-con">
                            <Link to={"/payment-method-create"}>
                              {" "}<FontAwesomeIcon
                                    icon={faEdit}
                                    color="#f29b30"
                                  />{" "}
                            </Link>
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box> */}
                </td>
              </tr>
            </tbody>
          </Table>
        </Box>
                  <CustomPagination
                  perPage={perPage}
                  totalUsers={totalNumber}
                  paginate={paginate}
                  currentPage={currentPage}
                />
      </Box>
    </div>
  );
}
