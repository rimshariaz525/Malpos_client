import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../api/baseUrl";
import { Col, Row } from "react-bootstrap";
// import { CardLayout } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import { LabelField } from "../../../components/fields";
import api from "../../../api/baseUrl";
import SelectField from "../../../components/fields/SelectField";

export default function CreateTaxRate() {

  const navigate=useNavigate()
  const [isUpdate, setIsUpdate] = useState(false);
  const [brands, setBrands] = useState([]);
  const[client,setClient]=useState([])
  const [branches, setBranches] = useState([]);
  const [taxCategories, setTaxCategories] = useState([]);
  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState();
  const [region, setRegion] = useState([]);

  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    cd_brand_id: "",
    cd_client_id:"",
    cd_branch_id: "",
    gd_country_id: "",
    gd_region_id: "",
    description: "",
    name: "",
    td_tax_category_id: "",
    valid_form: "May",
    type: "",
    rate: "",
  });

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchBrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrands(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchClinets = async () => {
    try {
      const res = await api.get("/cdclients");
      const formattedData = formatData(res.data, "cd_client_id");
      setClient(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTaxCategories = async () => {
    try {
      // Add Tax Category api endpoint here
      const res = await api.get("/tax_category");
      const formattedData = formatData(
        res.data.tax_category,
        "td_tax_category_id"
      );
      setTaxCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await api.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranches(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const Countriesoption =
  country != undefined &&
  country?.map((item,id, index) => ({
    label: item,
    value: id,
  }));
  const fetchCountries = async () => {
    try {
      const res = await axiosInstance.get("/get_country");
      // console.log(res.data, "get_country");
      setCountry(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegions = async (countryId) => {
    try {
      const res = await api.get(`/get_region/${countryId}`);
      const formattedData = formatData(res.data, "gd_region_id");
      console.log(res.data);
      setRegion(formattedData);
    } catch (error) {}
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };
  const handleClientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value),
    }));
  };

  const handleTaxCategoryChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      td_tax_category_id: parseInt(e.target.value),
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
  };

  const handleCountryChange = (e) => {
    const id = parseInt(e.target.value);
    setCountryId(id);
    setFormData((prevForm) => ({
      ...prevForm,
      gd_country_id: parseInt(e.target.value),
    }));

    fetchRegions(id);
  };

  const handleRegionChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      gd_region_id: parseInt(e.target.value),
    }));
  };

  const fetchTaxRateData = async () => {
    const taxRateId = localStorage.getItem("taxRateId");
    setEditId(taxRateId);
    if (taxRateId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/tax_rate_edit/${taxRateId}`);
        const taxRateData = response.data;
        setFormData({
          name: taxRateData.name,
          cd_brand_id: taxRateData.cd_brand_id,
          // cd_branch_id: taxRateData.cd_branch_id,
          cd_client_id:taxRateData.cd_client_id,
          cd_branch_id:taxRateData.cd_branch_id,
          gd_country_id:taxRateData.gd_country_id,
          gd_region_id:taxRateData.gd_region_id,
          td_tax_category_id: taxRateData.td_tax_category_id,
          name: taxRateData.name,
          description: taxRateData.description,
          valid_form: taxRateData.valid_form,
          type: taxRateData.type,
          rate: taxRateData.rate,
        });
        fetchRegions(taxRateData.gd_country_id);
        localStorage.removeItem("taxRateId");
      } catch (error) {
        console.log(error, "Error retrieving tax rate data");
      }
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchBrands();
    fetchClinets();
    fetchTaxCategories();
    fetchCountries();
    fetchTaxRateData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedFormData = {
        ...formData,
      };

      let response;

      if (isUpdate) {
        // Update request
        response = await api.post(
          `/tax_rate_update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Tax Rate edited successfully", {
          autoClose: true,
        });
      } else {
        // Create request
        response = await api.post("/tax_rate_store", updatedFormData);
        console.log(response);
        toast.success("Tax Rate created successfully", {
          autoClose: 4000,
          closeButton:true,
        });
        navigate("/tax-rate")
      }
    } catch (error) {
      console.error("Error creating/updating Tax Rate", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              {/* <CardLayout> */}
                <h3>Create Tax Rate</h3>
              {/* </CardLayout> */}
            </Col>
            <Col md={12}>
              {/* <CardLayout> */}
                <Row>
                    <Col md={4}>
                      <SelectField
                        label="Client"
                        className="wfield"
                        name="cd_client_id"
                        options={client}
                        value={formData.cd_clinet_id}
                        onChange={handleClientChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                        label="Brand"
                        className="wfield"
                        name="cd_brand_id"
                        options={brands}
                        value={formData.cd_brand_id}
                        onChange={handleBrandChange}
                      />
                    </Col>

                    <Col md={4}>
                      <SelectField
                        label="Branch"
                        className="wfield"
                        name="cd_branch_id"
                        options={branches}
                        value={formData.cd_branch_id}
                        onChange={handleBranchChange}
                      />
                    </Col>

                    <Col md={4}>
                      <SelectField
                        label="Tax Category"
                        className="wfield"
                        name="td_tax_category_id"
                        options={taxCategories}
                        value={formData.td_tax_category_id}
                        onChange={handleTaxCategoryChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                        label="Select Country"
                        name="gd_country_id"
                        className="wfield"
                        options={Countriesoption}
                        value={formData.gd_country_id}
                        onChange={handleCountryChange}
                      />
                    </Col>
                    <Col md={4}>
                      {/* {countryId && ( */}
                        <SelectField
                          label="Select Region"
                          name="gd_region_id"
                          className="wfield"
                          options={region}
                          value={formData.gd_region_id}
                          onChange={handleRegionChange}
                        />
                      {/* // )} */}
                    </Col>
                    <Col md={4}>
                      <LabelField
                        type="text"
                        className="wfield"
                        placeholder="Name"
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Col>
                  
                    <Col md={4}>
                      <LabelField
                        type="number"
                        className="wfield"
                        placeholder="%"
                        label="Tax Rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                        label="Tax Type"
                        className="wfield"
                        name="type"
                        options={[
                          { label: "PO", value: "PO" },
                          { label: "SO", value: "SO" },
                        ]}
                        value={formData.type}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                       className="wfield"
                        type="text"
                        placeholder="Description"
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </Col>
                  

                  <Col md={12}>
                    <button className="cus-btn" type="submit">
                      Create
                    </button>
                    <Link to="/tax-rate">
                      <button
                        className="cus-btn-bor"
                        style={{
                          backgroundColor: "#0F6973",
                          color: "white",
                          borderColor: "#0F6973",
                        }}
                      >
                        Back
                      </button>
                    </Link>
                  </Col>
                </Row>
              {/* </CardLayout> */}
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
