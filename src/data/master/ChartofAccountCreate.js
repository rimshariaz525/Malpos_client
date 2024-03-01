import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";
// import { CardLayout } from "../../components/cards";
import { Box, Input } from "../../components/elements";
import api from "../../api/baseUrl"
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LabelFieldS from "../../components/fields/LabelFieldS";
import SelectField from "../../components/fields/SelectField";
export default function CategoriesCreate() {
  const [name, setName] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const nameInputRef = useRef(null);
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
    
          <Col md={12}>
      
              <Row>
          <Col md={12} style={{display:"inline-flex"}} >
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3 style={{ width: "500px", fontSize:"1.1rem" }}>
                    <Link to="/account-categories" style={{ color: "#edb213" }}>
                      Chart Of Accounts
                    </Link>
                    /Create
                  </h3>
                </Box>
                </Box>
                    <Link style={{marginLeft:"35%", backgroundColor:"#EC917D", borderRadius:"4px"}}
                      to={"/account-categories"}
                      // style={{ display: "block" }}
                    >
                      {" "}
                      <button className="head-sec-rearrange-btn" style={{color:"white", padding:"10px 12px",fontSize:"13px"}}>
                        <FontAwesomeIcon icon={faCheck} />
                        &nbsp; Save
                      </button>
                    </Link>
                    <Link to={"/account-categories"} className='btnback'> <button className="btnlk"> Back</button></Link>
          </Col>
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
                    <Col md={4}>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        // className="m-0"
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
                      <LabelFieldS
                        label=" code"
                        className="wfield"
                        type="number"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>

                    <Col md={4} >
                      <LabelFieldS
                            className="wfield"
                        label=" Type"
                        option={[
                          { label: "Assets", value: null },
                          { label: "Libility", value: null },
                          { label: "Owner", value: null },
                          { label: "Equity", value: null },
                          { label: "Expense", value: null },
                          { label: "Revenue", value: null },
                          
                        ]}
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}>
                      <LabelFieldS
                      type="text"
                      className="wfield"
                        label=" Parent_Account"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4} >
                      <LabelFieldS
                            className="wfield"
                        label=" Seqno"
                        type="number"
                        // fieldSize="w-100 h-md"
                      />
                    </Col>
                    <Col md={4}  >
                      <LabelFieldS
                        label=" Summary"
                        className="wfield"
                        // fieldSize="w-100 h-md"
                        option={[
                          { label: "Yes", value: null },
                          { label: "No", value: null },
                          
                        ]}
                    />
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
      </PageLayout>
    </div>
  );
}
