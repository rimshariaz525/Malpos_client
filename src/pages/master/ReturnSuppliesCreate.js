import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState,useEffect } from "react";
import { Col, Row, Form, Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import { Box, Button } from "../../components/elements";
import IconSearchBar from "../../components/elements/IconSearchBar";
import { LabelField } from "../../components/fields";
import SelectField from "../../components/fields/SelectField";
import api from "../../api/baseUrl";
import CalenderField from "../../components/fields/CalenderField";
import CusField from "../../components/fields/CusField";
import MultiSelectField from "../../components/fields/MultiSelectField";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import PageLayout from "../../layouts/PageLayout";
import Datetime from "react-datetime";
import { Link } from "react-router-dom";

export default function ReturnSuppliesCreate() {
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [AddOpen, setAddClose] = useState(false);
  const [show, setShow] = useState(false);
  const [brands, setBrands] = useState([]);
  const [branch, setBranch] = useState([]);
  const [client, setClient] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [storage, setStorage] = useState([]);
  const [showIng, setShowIng] = useState(false);
  const [formData, setFormData] = useState({
    cd_brand_id: "",
    cd_branch_id:"",
    cd_client_id:"",
    invoice_no: "",
    status: "",
    operation_time: "",
    md_supplier_id: "",
    md_storage_id:"",
    balance:"",
    md_product_id:"",
    category:"",
    description:"",
    created_by: "malpos",
    updated_by: "malpos",
  });
  const statusOptions = [
    { label: "Approved", value: "approved" },
    { label: "Draft", value: "draft" },
    { label: "Deleted", value: "deleted" },
  ];
  const handleCloseGoods = () => setShow(false);
  const handleShowGoods = () => setShow(true);
  const handleCloseIng = () => setShowIng(false);
  const handleShowIng = () => setShowIng(true);


  const handleAdd = () => {setAddClose(!AddOpen);};

  const handleSwitchToggle = () => {setIsChecked(!isChecked);};

  const branchoption =
  branch != undefined &&
  branch?.map((item) => ({
    label: item.name,
    value: item.cd_branch_id,
  }));
  const brandoption =
  brands != undefined &&
  brands?.map((item) => ({
    label: item.name,
    value: item.cd_brand_id,
  }));
  const clientoption =
  client != undefined &&
  client?.map((item) => ({
    label: item.name,
    value: item.cd_client_id,
  }));
  const supplieroption =
  supplier != undefined &&
  supplier?.map((item) => ({
    label: item.supplier_name,
    value: item.id,
  }));
  const productoption =
  product != undefined &&
  product?.map((item) => ({
    label: item.product_name,
    value: item.md_product_id,
  }));
  const storageoption =
  storage != undefined &&
  storage?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const fetchBrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      setBrands(res.data, "cd_brand_id");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranch = async () => {
    try {
      const res = await api.get("/cdbranch");
      setBranch(res.data, "cd_branch_id");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
     
    try {
      const res = await api.get("/product");
      setProduct(res.data.products.data);
      console.log(res.data.products.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClient = async () => {
    try {
      const res = await api.get("/cdclients");
      setClient(res.data, "cd_client_id");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSupplier = async () => {
    try {
      const res = await api.get("/md_supplier");
      setSupplier(res.data.data, "md_supplier_id");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStorage = async () => {
    try {
      const res = await api.get("/md_storage");
      setStorage(res.data.data, "md_storage_id");
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDateTime(date);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchBranch();
    fetchClient();
    fetchBrands();
    fetchStorage();
    fetchProducts();
    fetchSupplier();
  }, [])
  
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
              <div className="d-flex justify-content-between align-items-center">
                <h5>Returned supplies/Create</h5>
                <Box className="construction-edit-icons">
                  <Box className="edit-icons">
                    <Link to="/cashflow" className="addproduct-btn ">
                      <img
                        className="fas fa-user"
                        src="/images/icons/close1.png"
                        alt="Close"
                      />
                    </Link>
                  </Box>
                </Box>
              </div>
           </Col>
          <Col md={12}>
              <Row>
                <Col md={12}>
                  <Row>
                  <Col md={4}>
                        <SelectField
                          required
                          label="Client"
                          name="cd_client_id"
                          className="wfield"
                          options={clientoption}
                          value={formData?.cd_client_id}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <SelectField
                          required
                          label="Branch"
                          name="cd_branch_id"
                          className="wfield"
                          options={branchoption}
                          value={formData?.cd_branch_id}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <SelectField
                          required
                          label="Brand"
                          name="cd_brand_id"
                          className="wfield"
                          options={brandoption}
                          value={formData?.cd_brand_id}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <SelectField
                          required
                          label="Supplier"
                          name="md_supplier_id"
                          className="wfield"
                          options={supplieroption}
                          value={formData?.md_supplier_id}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4} style={{marginTop:"20px"}}>
                        <SelectField
                          required
                          
                          label="Storage"
                          name="md_storage_id"
                          className="wfield"
                          options={storageoption}
                          value={formData?.md_storage_id}
                          onChange={handleChange}
                        />
                      </Col>
                    <Col md={4} className="cus-col-mt" style={{marginTop:"28px"}}>
                      <LabelField
className="wfield"
type={"number"}
name="invoice_no"
onChange={handleChange}
                        placeholder="0"
                        label={"Invoice Number"}
                      />
                    </Col>
                    <Col md={4} className="cus-col-mt" style={{marginTop:"30px"}}>
                      <LabelField
                      className="wfield"
                        type={"text"}
                        name="description"
                        placeholder="Description"
                        label={"Description"}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      as="select"
                      className="wfield"
                      name="status"
                      type="select"
                      value={selectedStatus} // Set the value to preselect
                      onChange={handleStatusChange}
                    >
                      <option value="">Select</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={4} >
                  <Form.Label>OPERATION TIME</Form.Label>
                  <Datetime
                  style={{ height: '30px' }}
                   className="mfield"
                    value={selectedDateTime}
                    onChange={handleDateChange}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                  />
                </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Box className={"product-add-box"}>
                    <Box className={"product  "}> Product</Box>
                    <Box className={"Qty "}> Qty</Box>
                    <Box className={"Cost"}> Cost</Box>
                    <Box className={"Total"}> Total</Box>
                    <Box className={"Xmark"}> </Box>
                  </Box>
                  <Box className={"product-add-boxes"}>
                    <Box className={"product"}>
                      {" "}
                      <SelectField
                          required
                          
                          label="product"
                          name="md_product_id"
                          className="wfield"
                          options={productoption}
                          value={formData?.md_product_id}
                          onChange={handleChange}
                        />
                    </Box>
                    <Box className={"Qty"}>
                      {" "}
                      <CusField className="wfield" placeholder={"0"} type="number" />{" "}
                    </Box>
                    <Box className={"Cost wfield"}>
                      {" "}
                      <CusField placeholder={"0"}    type="number" />
                    </Box>
                    <Box className={"Total"}>
                      {" "}
                      <CusField placeholder={"0"} type="number" className="wfield" />
                    </Box>
                    <Box className={"Xmark"}>
                      {" "}
                      <FontAwesomeIcon icon={faXmark} />{" "}
                    </Box>
                  </Box>
                </Col>
                <Col md={12}>
                  <Box className={"sc-box-main"}>
                    <Box className={"sc-btn-box"}>
                      <Button onClick={handleAdd} className="sc-add-btn">
                        <FontAwesomeIcon icon={faPlus} /> Add
                      </Button>
                      {AddOpen ? (
                        <Box className={"sc-multiSelect-wrapper"} >
                          <Box className={"sc-multiSelect"}>
                            <Box className={"sc-iconSearch"}>
                              <IconSearchBar />
                            </Box>
                            <Box className={"sc-multiSelect-p"}>
                              <Box
                                className={
                                  "sc-multiSelect-ingredients sc-multiSelect-w25"
                                }
                              >
                                Ingredient
                                <Box className={"sc-multiSelect-ingredients-c"}>
                                  <Box
                                    className={"sc-multiSelect-ingredients-c"}
                                  >
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <Box className="lt-box">
                                        <span className="lt-span">
                                          AL Bread
                                        </span>
                                      </Box>
                                      <Box className="rt-items-quan-box">
                                        <span className="rt-span-items-quan">
                                          200 pcs
                                        </span>
                                      </Box>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                className={
                                  "sc-multiSelect-goods sc-multiSelect-w25"
                                }
                              >
                                Goods
                                <Box className={"sc-multiSelect-ingredients-c"}>
                                  <Box
                                    className={"sc-multiSelect-ingredients-c"}
                                  >
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                className={
                                  "sc-multiSelect-preparation sc-multiSelect-w25"
                                }
                              >
                                Preparation
                                <Box className={"sc-multiSelect-ingredients-c"}>
                                  <Box
                                    className={"sc-multiSelect-ingredients-c"}
                                  >
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                              <Box
                                className={
                                  "sc-multiSelect-dish sc-multiSelect-w25 br-r-none"
                                }
                              >
                                Dish
                                <Box className={"sc-multiSelect-ingredients-c"}>
                                  <Box
                                    className={"sc-multiSelect-ingredients-c"}
                                  >
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                    <Box className={"sc-item-box"}>
                                      <span>Text</span>
                                      <span>Text</span>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                            <Box className={"sc-btn-box-more"}>
                              <Box className={"lf-btns"}>
                                <Button
                                  onClick={handleShowGoods}
                                  className={"lf-btns-btn"}
                                >
                                  Create Goods
                                </Button>

                                <Modal
                                  show={show}
                                  className={"goods-cre-model-wrapper"}
                                  onHide={handleCloseGoods}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Create Goods</Modal.Title>
                                  </Modal.Header>
                                  <Box className={"cre-goods-body-wrap"}>
                                    <Modal.Body>
                                      <Row>
                                        <Col md={12}>
                                          <CusField
                                            type={"text"}
                                            placeholder="Name"
                                          />
                                        </Col>
                                        <Col md={12}>
                                          <MultiSelectNoLabel
                                            label="Storage"
                                            options={[
                                              {
                                                label: "Return ",
                                                value: "Return",
                                              },
                                              {
                                                label: "Bar Storage 2 ",
                                                value: "Bar Storage 2",
                                              },
                                              {
                                                label: "Back Storage ",
                                                value: "Back Storage",
                                              },
                                            ]}
                                          />
                                        </Col>
                                        <Col md={12}>
                                          <MultiSelectNoLabel
                                            label="Storage"
                                            options={[
                                              {
                                                label: "Return ",
                                                value: "Return",
                                              },
                                              {
                                                label: "Bar Storage 2 ",
                                                value: "Bar Storage 2",
                                              },
                                              {
                                                label: "Back Storage ",
                                                value: "Back Storage",
                                              },
                                            ]}
                                          />
                                        </Col>
                                      </Row>
                                    </Modal.Body>
                                  </Box>
                                  <Modal.Footer className="model-footer">
                                    <Button
                                      className={"model-f-btn"}
                                      onClick={handleCloseGoods}
                                    >
                                      Save Changes
                                    </Button>
                                    <Button
                                      className={" model-f-btn "}
                                      onClick={handleCloseGoods}
                                    >
                                      Close
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                                <Button
                                  onClick={handleShowIng}
                                  className={"lf-btns-btn"}
                                >
                                  Create Ingredients
                                </Button>
                                <Modal
                                  show={showIng}
                                  className={"goods-cre-model-wrapper"}
                                  onHide={handleCloseIng}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>
                                      Create Ingredients
                                    </Modal.Title>
                                  </Modal.Header>
                                  <Box className={"cre-goods-body-wrap"}>
                                    <Modal.Body>
                                      <Row>
                                        <Col md={12}>
                                          <CusField
                                            type={"text"}
                                            placeholder="Name"
                                          />
                                        </Col>
                                      </Row>
                                    </Modal.Body>
                                  </Box>
                                  <Modal.Footer className="model-footer">
                                    <Button
                                      className={"model-f-btn"}
                                      onClick={handleCloseIng}
                                    >
                                      Save Changes
                                    </Button>
                                    <Button
                                      className={" model-f-btn "}
                                      onClick={handleCloseIng}
                                    >
                                      Close
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </Box>
                              <Box className={"rt-btns"}>
                                <Box className={"rt-btns-box"}>
                                  <Button className={"rt-btns-btn"}>
                                    Select All
                                  </Button>
                                  <Button
                                    className={"rt-btns-btn cus-bg-color-sec"}
                                  >
                                    Save (0 / 500)
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                    <Box className={"sc-switch-box"}>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        // label="Barcode"
                        checked={isChecked}
                        onChange={handleSwitchToggle}
                      />
                    </Box>
                    {/* <Box className={"sc-total-box"}>00.00 SAR</Box> */}
                  </Box>
                </Col>
              </Row>
           </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
