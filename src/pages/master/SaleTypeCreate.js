import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";
import MultiSelectPmethod from "../../components/fields/MultiSelectPmethod";
import MultiSelectScharge from "../../components/fields/MultiSelectScharg";
import MultiSelectTax from "../../components/fields/MultiSelectTax";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function SaleTypeCreate() {
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
                  <h3 style={{ width: "500px" }}>Sale types/Create</h3>
                </Box>
                <Box className="head-sec-rearrange-right">
                  <Box className="rearrange-right">
                    <Link to={"/sale-type"} style={{ display: "block" }}>
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
                <Col md={12}>
                  <Row>
                    <Col md={4}>
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

                    <Col md={4}>
                      <MultiSelectPmethod />
                    </Col>
                    <Col md={4}>
                      <MultiSelectScharge />
                    </Col>
                    <Col md={4}>
                      <MultiSelectTax />
                    </Col>
                    <Col md={8} style={{marginTop:"50px"}}>
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
