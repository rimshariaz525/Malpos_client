import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Box, Input } from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import api from "../../api/baseUrl"
import SelectField from "../../components/fields/SelectField";
import LabelFieldS from "../../components/fields/LabelFieldS";

export default function TransactionTransfer() {
  const [dateTouched, setDateTouched] = useState(false);
  const [date, setDate] = useState("");
   function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleDateBlur() {
    setDateTouched(true);
  }
  const [client,setClient]=useState([])
  const [branch,setBranch]=useState([])
  const [brand,setBrand]=useState([])
  const [form,setForm]=useState({
    cd_client_id:"",
    cd_branch_id:"",
    cd_brand_id:"",
  })

  const clientoption=
  client != undefined && 
  client?.map((item) => ({
    label: item.name,
    value: item.cd_client_id,
  }))
  const branchoption=
  branch != undefined && 
  branch?.map((item) => ({
    label: item.name,
    value: item.cd_branch_id,
  }))
  const brandoption=
  brand != undefined && 
  brand?.map((item) => ({
    label: item.name,
    value: item.cd_brand_id,
  }))

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchclients=async()=>{
    try {
      const response = await api.get("/cdclients");
      setClient(response.data,"cd_client_id")
    } catch (error) {
      console.log(error)
      
    }
  }
  const fetchbranch=async()=>{
    try {
      const response = await api.get("/cdbranch");
      setBranch(response.data,"cd_branch_id")
    } catch (error) {
      console.log(error)
      
    }
  }
  const fetchbrands=async()=>{
    try {
      const response = await api.get("/cdbrand");
      setBrand(response.data,"cd_brand_id")
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(() => {
    fetchbranch();
    fetchbrands();
    fetchclients();
  }, [])
 
  return (
    <Col md={12}>
      <Row>
        <Col md={12}>
          <Row>
          <Col md={4}>
                      <SelectField
                      className="wfield"
                      name="cd_client_id"
                      value={form?.cd_client_id}
                      options={clientoption}
                      onChange={handleChange}
                      label="Client"
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                      className="wfield"
                      name="cd_branch_id"
                      value={form?.cd_branch_id}
                      options={branchoption}
                      onChange={handleChange}
                      label="Branch"
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                      className="wfield"
                      name="cd_brand_id"
                      value={form?.cd_brand_id}
                      options={brandoption}
                      onChange={handleChange}
                      label="Brand"
                      />
                    </Col>
 <Col md={4} >
              <Form.Label   
                >Amount</Form.Label>
               <Form.Control
                    placeholder="Enter Amount"
                  label="Amount"
                  className="wfield"
               />
              </Col>

            <Col md={4}  >
              <LabelFieldS
                    className="wfield"
label=" Account Type"
                option={[
                  { label: "Assets", value: null },
                  { label: "Liability", value: null },
                  { label: "Owner Equity", value: null },
                  { label: "Expense", value: null },
                  { label: "Revenue", value: null },
                ]}
                 />
            </Col>
            
            <Col md={4}    >
              <Form.Label>Date</Form.Label>
              <Form.Control
                className="wfield"
                label="calender"
                type="date"
                required
                value={date}
                onChange={handleDateChange}
                onBlur={handleDateBlur}
                isInvalid={dateTouched && date.trim() === ""}
              />
              <Form.Control.Feedback type="invalid">
                Must not be empty
              </Form.Control.Feedback>
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Bank/Cash Account "
                placeholder="Bank Amount"
                // style={{width:"80%"}}
                type="text"
                className="wfield"
  
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Accounts"
                placeholder="Accounts"
                type="text"
                className="wfield"
                // style={{width:"80%"}}
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Empolyee"
                type="text"
                className="wfield"
                placeholder="Enter employee"
                // style={{width:"80%"}}
              />
            </Col>
            <Col md={4}  >
              <LabelFieldS
                label="Supplier"
                type="text"
                className="wfield"
                placeholder="Enter supplier"
                // style={{width:"80%"}}
              />
            </Col>
            <Col md={4} >
              <LabelFieldS
                label="Customer"
                placeholder="Enter customer"
                type="text"
                className="wfield"
                // style={{width:"80%"}}
              />
            </Col>
          </Row>
          <Col md={12}>
            <Box className="head-sec-rearrange-right">
              <Box className="rearrange-right">
                <Link
                  to={"/transactions"}
                  style={{ display: "block", marginTop: "15px" }}
                >
                  {" "}
                  <button className="head-sec-rearrange-btn">
                    <FontAwesomeIcon icon={faCheck} />
                    &nbsp; Save
                  </button>
                </Link>
              </Box>
            </Box>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}
