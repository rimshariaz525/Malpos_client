import { faCheck, faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Table, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { faSearch,faEllipsis } from "@fortawesome/free-solid-svg-icons";

export default function SalePaymentMethod() {
  const [open, Close] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDotBox = () => {
    Close(!open);
  };
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            Payment method
          </Col>

          <Col md={12}>
              <Col md={12}>
                <Row className="justify-content-between">
                  <Col md={6}>
                    <Row>
                      <Col md={10}>
                        <div style={{ position: "relative" }}>
                          <Form.Control
                            type="search"
                            placeholder="Search"
                            className="search-pl"
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              fontSize: "14px",
                            }}
                          >
                            <button type="submit">
                              <FontAwesomeIcon icon={faSearch} />
                            </button>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2} sm={12}>
                    <Link
                      to={"/payment-method-create"}
                      style={{ display: "block" }}
                    >
                      {" "}
                      <button className="pm-create-btn w-100">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Box className="payment-method-table-wrap">
                <Table className="payment-m-table" responsive>
                  <thead className="mc-table-head ">
                    <tr>
                      <th className="th-w15">Name</th>
                      <th className="th-w15">Account</th>
                      <th className="th-w5">
                        Status
                        <button
                          className="sorting-icon"
                          onClick={toggleSortOrder}
                        >
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                      </th>
                      <th className="th-w10">
                        Can be Divisible
                        <button
                          className="sorting-icon"
                          onClick={toggleSortOrder}
                        >
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                      </th>
                      <th className="th-w15">Customer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cash</td>
                      <td>Cash</td>
                      <td className="td-faCheck">
                        <FontAwesomeIcon icon={faCheck} />{" "}
                      </td>
                      <td className="td-faCheck">
                        <FontAwesomeIcon icon={faCheck} />{" "}
                      </td>
                      <td className="td-faXmark">
                        <FontAwesomeIcon icon={faXmark} />{" "}
                      </td>
                      {/* <td className="td-w60">
                        <Box className="dot-content">
                          <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis}/> </div>
                          {open ? (
                            <Box className="DotBox-main-wrapper">
                              <Box className="DotBox-inner">
                                <Box className="DotBox-p-con">
                                  <FontAwesomeIcon icon={faEdit} /> Edit
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            ""
                          )}
                        </Box>
                      </td> */}
                    </tr>
                  </tbody>
                </Table>
              </Box>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
