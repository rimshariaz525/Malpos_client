import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import PageLayout from "../../layouts/PageLayout";
import { LabelField } from "../../components/fields";
import SelectField from "../../components/fields/SelectField";
import api from "../../api/baseUrl";

export default function CreateBrand() {
  const navigate=useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);
  const [clients, setClients] = useState([]);
const[branch,setBranch]=useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    cd_client_id: "",
    cd_branch_id:"",
    is_active: true,
    created_by: "malpos",
    updated_by: "malpos",
  });

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchClients = async () => {
    try {
      const res = await api.get("/cdclients");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranch = async () => {
    try {
      const res = await api.get("/cdbranch");
      const formattedData = formatData(res.data, "cd_branch_id");
      setBranch(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_client_id: parseInt(e.target.value),
    }));
  };
  const handlebranchChange = (e) => {
    setFormData((prevForm) => ({
      ...prevForm,
      cd_branch_id: parseInt(e.target.value),
    }));
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

  const fetchBrandData = async () => {
    const brandId = localStorage.getItem("brandId");
    setEditId(brandId);
    if (brandId) {
      setIsUpdate(true);
      try {
        const response = await api.get(`/cdbrand_edit/${brandId}`);
        const brandData = response.data;
        setFormData({
          name: brandData.name,
          is_active: brandData.is_active,
          created_by: brandData.created_by,
          updated_by: brandData.created_by,
          cd_client_id: brandData.cd_client_id,
          cd_branch_id:brandData.cd_branch_id,
        });
        localStorage.removeItem("brandId");
      } catch (error) {
        console.log(error, "Error retrieving brand data");
      }
    }
  };

  useEffect(() => {
    fetchBrandData();
    fetchClients();
    fetchBranch();
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
        response = await api.post(`/cdbrand_update/${editId}`, updatedFormData);
        setEditId(null);
        // console.log(updatedFormData);
        toast.success("Brand edited successfully", {
          autoClose: 4000,
        });
        navigate("/brands")
      } else {
        // Create request
        response = await api.post("/cdbrand_store", updatedFormData);
        toast.success("Brand created successfully", {
          autoClose: true,
        });
        navigate("/brands")
      }
    } catch (error) {
      console.error("Error creating/updating User", error);
    }
  };

  return (
    <div>
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
                <h3>Create Brand</h3>

            </Col>
            <Col md={12}>
                <Row>
                  <Col md={10}>
                    <Row>
                      <Col md={6}>
                        <SelectField
                          label="Client"
                          className="wfield"
                          name="cd_client_id"
                          options={clients}
                          value={formData.cd_client_id}
                          onChange={handleClientChange}
                        />
                      </Col>
                      <Col md={6}>
                        <SelectField
                          label="Branch"
                          className="wfield"
                          name="cd_branch_id"
                          options={branch}
                          value={formData.cd_branch_id}
                          onChange={handlebranchChange}
                        />
                      </Col>
                      <Col md={6} style={{marginTop:"30px"}}>
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
                      <Col md={12}>
                        <button className="cus-btn" type="submit">
                          Create
                        </button>
                        <Link to="/brands">
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
            </Col>
          </Row>
        </form>
      </PageLayout>
    </div>
  );
}
