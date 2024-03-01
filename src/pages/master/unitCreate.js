import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import { useLocation } from "react-router-dom";
import { Box } from "../../components/elements";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function UnitCreate() {
  const [unitData, setUnitData] = useState({
    cd_client_id: 1,
    cd_brand_id: 1,
    cd_branch_id: 1,
    name: "",
    code: "",
    equal: "",
    unit: "",
    symbol: "",
    created_by: "1",
    updated_by: "1",
  });

  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [editUomId, setEditUomId] = useState();
  const [action, setAction] = useState();
  const [currentUom, setCurrentUom] = useState();
  const [selectedUnit, setSelectedUnit] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
    }));
  const branchesOptions =
    branches != undefined &&
    branches?.map((item) => ({
      label: item.name,
      value: item.cd_branch_id,
    }));
  const brandsOptions =
    brands != undefined &&
    brands?.map((item) => ({
      label: item.name,
      value: item.cd_brand_id,
    }));
  useEffect(() => {
    fetchUoms();
    fetchClients();
    fetchBrands();
    fetchBranches();

    if (location.state?.id) {
      setAction(location.state.action);
      fetchUomById(location.state.id);
    }
  }, [location.state]);

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      console.log(res.data, "cdclients");
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      console.log(res.data, "cdbranch");
      setBranches(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      setBrands(res.data);
      console.log(res.data, "cdbrand");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUomById = async (id) => {
    try {
      const res = await axiosInstance.get(`/uom/${id}/edit`);
      setUnitData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUoms = async () => {
    try {
      const res = await axiosInstance.get(`/uom`);
      setUnitOptions(res.data.data.data);
      console.log(res.data.data.data, "res.data.data.data");
      setUnitData((prevData) => ({
        ...prevData,
        cd_client_id: res.data.data.data[0].cd_client_id,
        cd_brand_id: res.data.data.data[0].cd_client_id,
        cd_branch_id: res.data.data.data[0].cd_client_id,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUnitData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axiosInstance
      .post("/uom", unitData)
      .then((response) => {
        // console.log("Unit of measurement created:", response.data);
        let msg;
        if (action == "updateUom") {
          msg = "Unit has been update successfully.";
          navigate(`/unit-measurement`);
        } else {
          msg = "Unit has been created successfully.";
          navigate(`/unit-measurement`);
        }

        toast.success(msg, {
          autoClose: true,
        });
      })
      .catch((error) => {
        console.error("Error creating unit of measurement:", error);
      });
  };

  return (
    <div>
      <PageLayout>
          <Col md={12} >
              <Col md={12}  >
                <Row >
                  {
                    <Col md={12}   >
                      
                        {action === "updateUom" ? "Update UOMs" : "Create UOMs"}
                  <Link  style={{ marginLeft:"67%"}}>
                    <Button
                    style={{padding:"7px 15px" , backgroundColor:"#ec917d" ,border:"none"}}
                    // variant="dark"
                      // className="acc-create-btn rs-btn-create"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Link>
                  <Link to={"/unit-measurement"} className='btnback'> <button className="btnlk"> Back</button></Link>
                    </Col>
                  }
                  <Col md={4} >
                    <SelectField
                    className="wfield"
                      // className="w-50"
                      label="Client"
                      name="client"
                      options={clientsOptions}
                      value={unitData?.cd_client_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4} >
                    <SelectField
                      className="wfield"
                      required
                      label="Brand"
                      name="brand"
                      type="select"
                      title="Brand"
                      options={brandsOptions}
                      value={unitData?.cd_brand_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      className="wfield"
                      required
                      label="Branch"
                      name="branch"
                      type="select"
                      title="Branch"
                      options={branchesOptions}
                      value={unitData?.cd_branch_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      type="text"
                      className="wfield"
                      name="name"
                      value={unitData?.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      label="Name"
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      className="wfield"
                      type="text"
                      name="unit"
                      value={unitData?.unit}
                      onChange={handleInputChange}
                      placeholder="Unit"
                      label="Unit"
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      className="wfield"
                      type="text"
                      name="code"
                      value={unitData?.code}
                      onChange={handleInputChange}
                      placeholder="Code"
                      label="Code"
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      type="text"
                      className="wfield"
                      name="symbol"
                      value={unitData?.symbol}
                      onChange={handleInputChange}
                      placeholder="symbol"
                      label="Symbol"
                    />
                  </Col>
                </Row>
              </Col>
          </Col>
      </PageLayout>
    </div>
  );
}
