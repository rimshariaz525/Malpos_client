import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";

import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function PaymentMethodCreate() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);
  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleNameBlur() {
    setNameTouched(true);
  }
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
          
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "500px" }}>Payment types/Create</h3>
                </Box>
                <Box className="head-sec-rearrange-right">
                  <Box className="rearrange-right">
                    <Link to={"/payment-method"} style={{ display: "block" }}>
                      {" "}
                      <button className="head-sec-rearrange-btn">
                        <FontAwesomeIcon icon={faCheck} />
                        &nbsp; Save
                      </button>
                    </Link>
                  </Box>
                </Box>
              </Box>
          
          </Col>
          <Col md={12}>
            
              <Row>
                <Col md={10}>
                  <Row>
                    <Col md={6}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        className="wfield"
                        label="Name"
                        type="text"
                        required
                        value={name}
                        onChange={handleNameChange}
                        onBlur={handleNameBlur}
                        isInvalid={nameTouched && name.trim() === ""}
                        ref={nameInputRef}
                      />
                      <Form.Control.Feedback type="invalid">
                        Must not be empty
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6}  style={{ marginTop: "30px" }}>
                      <LabelFieldS

                        label=" Balance"
                        option={[
                          { label: "Select Balance", value: null },
                          { label: "Cash", value: null },
                          { label: "Card account", value: null },
                          { label: "Bank account", value: null },
                          { label: "Safe", value: null },
                        ]}
                        className="wfield"
                        
                      />
                    </Col>
                    <Col md={8}>
                      <Form.Check type="checkbox" label="Can be divisible" />
                      <Form.Check
                        type="checkbox"
                        label="Customer should be selected"
                        style={{ marginTop: "10px" }}
                      />
                    </Col>

                    <Col md={8}>
                      <Box className="pm-status">
                        <span className="statusSpan">Status</span>
                        <span>Main</span>
                        <Form.Check
                          type="checkbox"
                          defaultChecked
                          label="Activated"
                        />
                      </Box>
                    </Col>
                  </Row>
                </Col>
              </Row>
            
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
