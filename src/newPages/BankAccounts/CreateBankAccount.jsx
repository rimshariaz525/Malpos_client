import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import api from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";

export default function CreateBankAccount() {
  const navigate=useNavigate()
  const [isUpdate, setIsUpdate] = useState(false);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [clients, setClients] = useState([]);
const[banks,setBanks]=useState([])
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    cd_client_id: ",",
    cd_brand_id: "",
    cd_branch_id: "",
    description: "",
    bank_name:"",
    bank_account_id: "",
    tender_type: "",
    is_active: 0,
    updated_by: "malpos",
    created_by: "malpos",
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

  const fetchClients = async () => {
    try {
      const res = await api.get("/getuser");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
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
  const fetchBanks = async () => {
    try {
      const response = await api.get("/banks");
      const formattedData = formatData(response.data.data, "name");
      setBanks(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      is_active: e.target.checked,
    });
  };

  const handleBrandChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_brand_id: parseInt(e.target.value),
    }));
  };
  const handleBankChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      bank_name: (e.target.value),
    }));
  };

  const handleClientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value),
    }));
  };

  const handleBranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
  };

  const fetchBankAccountData = async () => {
    const bankAccountId = localStorage.getItem("bankAccountId");
    setEditId(bankAccountId);
    if (bankAccountId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/bank_account_edit/${bankAccountId}`);
        const bankAccountData = response.data.data;
        setFormData({
          cd_brand_id: bankAccountData.cd_brand_id,
          cd_branch_id: bankAccountData.cd_branch_id,
          cd_client_id: bankAccountData.cd_client_id,
          tender_type: bankAccountData.tender_type,
          bank_account_id: bankAccountData.bank_account_id,
          description: bankAccountData.description,
          is_active: 0,
          updated_by: "malpos",
          created_by: "malpos",
        });
        localStorage.removeItem("bankAccountId");
      } catch (error) {
        console.log(error, "Error retrieving bank data");
      }
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchBrands();
    fetchBanks();
    fetchClients();
    fetchBankAccountData();
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
          `/bank_account_update/${editId}`,
          updatedFormData
        );
        setEditId(null);
        console.log(updatedFormData);
        toast.success("Bank Account edited successfully", {
          autoClose: 3000,
        });
        navigate("/bank-account")
      } else {
        // Create request
        response = await api.post("/bank_account_store", updatedFormData);
        console.log(response);
        toast.success("Bank Account created successfully", {
          autoClose: 4000,
          closeButton:true,
        });
        navigate("/bank-account")
      }
    } catch (error) {
      console.error("Error creating/updating Bank Account", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
                <h3>Create Bank Account</h3>
            </Col>
            <Col md={12}>
                <Row>
                  <Row>
                    <Col md={4}>
                      <SelectField
                      className="wfield"
                        label="Client"
                        name="cd_client_id"
                        options={clients}
                        value={formData.cd_client_id}
                        onChange={handleClientChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                      className="wfield"
                        label="Brand"
                        name="cd_brand_id"
                        options={brands}
                        value={formData.cd_brand_id}
                        onChange={handleBrandChange}
                      />
                    </Col>

                    <Col md={4}>
                      <SelectField
                      className="wfield"
                        label="Branch"
                        name="cd_branch_id"
                        options={branches}
                        value={formData.cd_branch_id}
                        onChange={handleBranchChange}
                      />
                    </Col>
                    <Col md={4}>
                      <SelectField
                      className="wfield"
                        label="Bank Name"
                        name="bank_name"
                        options={banks}
                        value={formData.bank_name}
                        onChange={handleBankChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                      className="wfield"
                        type="text"
                        placeholder="Type"
                        label="Tender Type"
                        name="tender_type"
                        value={formData.tender_type}
                        onChange={handleChange}
                      />
                    </Col>
                    <Col md={4}>
                      <LabelField
                      className="wfield"
                        type="text"
                        placeholder="Account Number"
                        label="Account Number"
                        name="bank_account_id"
                        value={formData.bank_account_id}
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
                    <Col md={6}>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                            name="is_active"
                            onChange={handleCheckChange}
                            checked={formData.is_active}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            is Active?
                          </label>
                        </div>
                      </Col>
                  </Row>

                  <Col md={12}>
                    <button className="cus-btn" type="submit">
                      Create
                    </button>
                    <Link to="/bank-account">
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
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
