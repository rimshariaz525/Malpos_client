import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
// import { CardLayout } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import { LabelField } from "../../../components/fields";
import api from "../../../api/baseUrl";
import SelectField from "../../../components/fields/SelectField";
import { useLocation,useNavigate } from "react-router-dom";

const CreateClientRoles = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
   cd_client_id:"",
   cd_branch_id:"",
   cd_brand_id:"",
    name: "",
    description: "",
    role_type: "",
    is_active: true,
  });
 const[brand,setBrand]=useState([]);
 const [branch, setBranch]=useState([]);
 const [clinet,setClient]=useState([]);
  const [editId, setEditId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleCheckChange = (e) => {
    setFormData({
      ...formData,
      is_active: e.target.checked,
    });
  };

  const fetchbranch=async()=>{
    try{
    const response = await api.get("/cdbranch");
    const formattedData=formatData(response.data,"cd_banch_id")
    setBranch(formattedData)
  }catch(error){
    console.log("Error", error);
  }
  }

  const fetchbrands = async () => {
    try {
      const res = await api.get("/cdbrand");
      const formattedData = formatData(res.data, "cd_brand_id");
      setBrand(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClientChange=(e)=>{
setFormData((prevForm)=>({
...prevForm,
cd_client_id:parseInt(e.target.value),
}))
  }

  const handleBrandChange=(e)=>{
    setFormData((prevForm)=>({
      ...prevForm,
      cd_brand_id:parseInt(e.target.value)
    }))
  }

  const handlebranchchange=(e)=>{
    setFormData((prevForm)=>({
        ...prevForm,
        cd_branch_id:parseInt(e.target.value)
    }))
  }

  const fetchClientData = async () => {
    const clinetId = localStorage.getItem("clinetId");
    setEditId(clinetId);
    if (clinetId) {
      setIsUpdate(true)
      try {
        const response = await api.get(`/role_edit/${clinetId}`);
        const userData = response.data;
        console.log("data",userData)
        setFormData({
          name: userData.name || "",
          description: userData.description || "",
          role_type: userData.role_type || "",
          is_active: userData.is_active !== null ? userData.is_active : false,
        });
        localStorage.removeItem("clinetId")
      } catch (error) {
        console.log(error, "Error retrieving user data");
      }
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
  const formatData = (data, idKey) =>
    data.map((item) => ({ value: item[idKey], label: item.name }));

  const handleRoleTypeChange = (e) => {
    console.log(e.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      role_type: e.target.value,
    }));
  };

  useEffect(() => {
    // if (location.state?.id) {
    //   setEditId(location.state?.id);
    // }
    fetchClinets();
    fetchbranch();
    fetchbrands();
    fetchClientData();
  }, []);

  const handleSubmit = async (e) => {
    const updatedFormData = {
      ...formData,
    };
    e.preventDefault();
    try {
      let response;
      if (isUpdate) {
        // Update request
        response = await api.post(`/role_update/${editId}`, formData);
        setEditId(null);
        toast.success("Role edited successfully", {
          autoClose: 4000,
        });
        navigate("/client-roles")
        resetForm();
      } else {
        // Create request
        response = await api.post("/role_store", updatedFormData);
        console.log(response.data);
        toast.success("Role created successfully", {
          autoClose: true,
        });
        navigate("/client-roles")
        resetForm();
      }
    } catch (error) {
      console.error("Error creating/updating Role", error);
    }
  };

  const roleTypeOptions = [
    { value: "super_admin_role", label: "Super Admin Role" },
    { value: "client_role", label: "Client Role" },
  ];

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      role_type: "",
      is_active: true,
    });
  };
  return (
    <PageLayout>
      <Row>
        <Col md={12}>
          {/* <CardLayout> */}
            <h3>Create Role</h3>
          {/* </CardLayout> */}
        </Col>
        <Col md={12}>
          <form onSubmit={handleSubmit}>
            {/* <CardLayout> */}
              <Row>
                <Col md={4}>
                  <SelectField
                  name="cd_client_id"
                  className="wfield"
                  value={formData.cd_client_id}
                  options={clinet}
                  label="Client"
                  onChange={handleClientChange}
                  />
                </Col>
                <Col md={4}>
                  <SelectField
                  name="cd_branch_id"
                  className="wfield"
                  value={formData.cd_branch_id}
                  options={branch}
                  label="Branch"
                  onChange={handlebranchchange}
                  />
                </Col>
                <Col md={4}>
                  <SelectField
                  name="cd_brand_id"
                  className="wfield"
                  value={formData.cd_brand_id}
                  options={brand}
                  label="Brand"
                  onChange={handleBrandChange}
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Role Name"
                    name="name"
                    className="wfield"
                    type="text"
                    placeholder="Enter role name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={4}>
                  <LabelField
                    label="Description"
                    name="description"
                    className="wfield"
                    type="text"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Col>
                <Col md={4} style={{marginTop:"15px"}}>
                  <SelectField
                    label="Role Type"
                    name="role_type"
                    className="wfield"
                    options={roleTypeOptions}
                    onChange={handleRoleTypeChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} style={{marginTop:"55px"}}>
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
                  <Link to="/client-roles">
                    <button
                      style={{
                        backgroundColor: "#0F6973",
                        color: "white",
                        borderColor: "#0F6973",
                      }}
                      className="cus-btn-bor"
                    >
                      Back
                    </button>
                  </Link>
                </Col>
              </Row>
            {/* </CardLayout> */}
          </form>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default CreateClientRoles;
