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
} from "@fortawesome/free-solid-svg-icons";
import IconSearchBar from "../elements/IconSearchBar";
export default function SupplierTab() {
  const [sortOrder, setSortOrder] = useState("asc");

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
            <thead className="thead-modifier thead-dark "  style={{ color:'white'}}>
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
                <th>Deleted at</th>
                <th>Deleted by</th>
                <th>Category</th>
                <th>Supplier</th>
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
                <th>From account</th>
                <th>To account</th>
                <th>
                  Type
                  <button
                    style={{ color: "white" }}
                    className="sorting-icon"
                    onClick={toggleSortOrder}
                  >
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="tbody-r">
                {" "}
                <td>1009</td>
                <td style={{ width: "135px" }}>Mar 09,23</td>
                <td style={{ width: "110px" }}>Mar 09,23</td>
                <td>Terminal 1</td>
                <td>Mar 09,23</td>
                <td>abc</td>
                <td>Refund</td>
                <td>--</td>
                <td>#41</td>
                <td></td>
                <td>15.00</td>
                <td> Bank account</td>
                <td> Cash account</td>
                <td> Income</td>
              </tr>
            </tbody>
          </Table>
        </Box>
      </Box>
    </div>
  );
}
