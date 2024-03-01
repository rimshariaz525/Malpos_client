import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus, faLock, faEdit,faTrash,faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PageLayout from "../../layouts/PageLayout";
import { Box } from "../../components/elements";
import { Table } from "react-bootstrap";

import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { Link } from "react-router-dom";
export default function Accounts() {
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const [open, Close] = useState(false);

    const handleDotBox = () => {
        Close(!open);
    };
  return (
    <div>
      <PageLayout>
        <Row>
         
          <Col md={12}>
            <CardLayout>
              <Col md={12}>
                <Row>
            <Col md={12}>
            Accounts
          </Col>
                  <Col md={3}>
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
                  <Col md={7}>
                    <Row>
                      <Col md={4}>
                        <MultiSelectNoLabel
                          label="Type"
                          options={[
                            { label: "Cash ", value: "Cash" },
                            { label: "Card ", value: "Card" },
                            { label: "Bank ", value: "Bank" },
                          ]}
                        />
                      </Col>
                      <Col md={6} className="h-checkBox-acc-col-6">
                        <Box className={"h-checkBox-acc"}>
                          <Form.Check
                          style={{fontSize:"0.7rem", marginLeft:"10px"}}
                            type="checkbox"
                            label="Show Deleted Accounts"
                          />
                        </Box>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={3} lg={2}>
                    <Link to={"/accounts-create"}>
                      <button className="acc-create-btn">
                        <FontAwesomeIcon icon={faPlus} /> Create{" "}
                      </button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col md={12}>
                <Box className="acc-tables">
                  <Table>
                    <thead className="acc-table-head" style={{backgroundColor:'#F07632', height:"10px" }}>
                      <tr>
                        <th className="th-w300">Name</th>
                        <th className="th-w300">
                          Type
                          <button
                            style={{ color: "#172026" }}
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                        </th>
                        <th className="th-w300 th-acc">
                          Account
                          <button
                            style={{ color: "#172026" }}
                            className="sorting-icon"
                            onClick={toggleSortOrder}
                          >
                            {sortOrder === "asc" ? "▲" : "▼"}
                          </button>
                          <br />
                          <span style={{color:'red'}} >446456.43432423 SAR</span>
                        </th>
                        <th className="th-w60"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="td-w300">
                          <Link to={"/accounts-details"}> Cash </Link>
                        </td>
                        <td className="td-w300">Cash</td>
                        <td className="td-w300 td-acc">99886252.98 SAR</td>
                        <td className="td-w60">
                          <Box className="fa-lock">
                            <FontAwesomeIcon icon={faLock} />
                          </Box>
                          <Box className="dot-content">
                           <div onClick={handleDotBox}><FontAwesomeIcon icon={faEllipsis} /> </div>
                                      {open ? (
                                                                <Box className="DotBox-main-wrapper">
                                                                    <Box className="DotBox-inner">
                                                                       <Link to={'/accounts-edit'}> <Box className="DotBox-p-con">
                                                                            <FontAwesomeIcon icon={faEdit} /> Edit
                                                                        </Box>
                                                                        </Link>
                                                                        <Box className="DotBox-p-con deletebtn">
                                                                            <FontAwesomeIcon icon={faTrash} /> Remove
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </Box>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Box>
              </Col>
            </CardLayout>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
