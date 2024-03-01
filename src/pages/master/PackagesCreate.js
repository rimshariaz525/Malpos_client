import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PackagesCreate() {

  const [unitConversionData, setUnitConversionData] = useState({
    cd_client_id:"" ,
    cd_brand_id: "",
    cd_branch_id: "",
    md_product_id:"",
    uom_from:"",
    uom_to: "",
    multiply_rate: "",
    md_uom_id: "",
    divide_rate:"",
    created_by: "1",
    updated_by: "1",
  });

  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const [UOMs, setUOMs] = useState([]);
  const [action, setAction] = useState("");
  const location = useLocation();
  const[productsid,setProductsid]=useState([])
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const clientsOptions =
    clients != undefined &&
    clients?.map((item) => ({
      label: item.name,
      value: item.cd_client_id,
    }));

  const unitOptions =
    UOMs != undefined &&
    UOMs?.map((item) => ({
      label: item.name,
      value: item.md_uom_id,
    }));
  const productoption =
    productsid != undefined &&
    productsid?.map((item) => ({
      label: item.product_name,
      value: item.md_product_id,
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

    const fetchproduct= async()=>{
      try {
        const res= await axiosInstance.get("/product");
        // console.log('res',res.data.products.data)
        setProductsid(res.data.products.data)
      } catch (error) {
        
      }
    }

  useEffect(() => {
    fetchUoms();
    fetchClients();
    fetchBrands();
    fetchproduct();
    fetchBranches();
    if (location.state?.id) {
      setAction(location.state.action);
      fetchConversionById(location.state.id);
    }
  }, [location.state]);

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      // console.log(res.data, "cdclients");
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBranches = async () => {
    try {
      const res = await axiosInstance.get("/cdbranch");
      // console.log(res.data, "cdbranch");
      setBranches(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const res = await axiosInstance.get("/cdbrand");
      setBrands(res.data);
      // console.log(res.data, "cdbrand");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchConversionById = async (id) => {
    try {
      const response = await axiosInstance.get(`/uom_conversion/${id}/edit`);
      const unitConversionsData = response.data.data;

      if (unitConversionsData != undefined) {

        const { md_uom_id,uom_to_name,multiply_rate } = unitConversionsData;
        let unitConversionsData_ =  {
        ...unitConversionsData,
        uom_to_name: uom_to_name,
        multiply_rate:multiply_rate,
        md_uom_id: md_uom_id,             };

        console.log(unitConversionsData_, "asdfasdkljfhaksjdfh");
        setUnitConversionData(unitConversionsData_);
      } else {
        console.error("Response data is not an array:", unitConversionsData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUoms = async () => {
    try {
      const res = await axiosInstance.get(`/uom`);
      setUOMs(res.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUnitConversionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axiosInstance
      .post("/uom_conversion", unitConversionData)
      .then((response) => {
        let msg;
        if (action == "updateConversion") {
          msg = "Conversion updated successfully.";
          navigate(`/packages`);
        } else {
          msg = "Conversion created successfully.";
          navigate(`/packages`);
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
        <Row>
          <Col md={12}>
            
              <Col md={12}>
                <Row>
                  {
                    <Col md={12}>
                      
                        {action != undefined && action == "updateConversion"
                          ? "Update Unit Conversion"
                          : "Create Unit Conversion"}
                      
                  <Link  style={{marginLeft:"60%"}}>
                    <button
                    style={{backgroundColor:"#ec917d",color:"white",padding:"15px 15px",borderRadius:"4px"}}
                    // variant="dark"
                      // className="acc-create-btn rs-btn-create"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </Link>
                  <Link to={"/packages"} className='btnback'> <button className="btnlk"> Back</button></Link>
                    </Col>
                  }
                  <Col md={4}>
                    <SelectField
                    className="wfield"
                      // className="w-50"
                      label="Client"
                      name="cd_client_id"
                      options={clientsOptions}
                      value={unitConversionData?.cd_client_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                    className="wfield"
                      required
                      label="Brand"
                      name="cd_brand_id"
                      type="select"
                      title="Brand"
                      options={brandsOptions}
                      value={unitConversionData?.cd_brand_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                    className="wfield"
                      required
                      label="Branch"
                      name="cd_branch_id"
                      type="select"
                      title="Branch"
                      options={branchesOptions}
                      value={unitConversionData?.cd_branch_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  {/* <Col md={4}>
                    <LabelField
                    className="wfield"
                      type="text"
                      name="uom_to"
                      value={unitConversionData?.uom_to}
                      onChange={handleInputChange}
                      placeholder="Name"
                      label="Name"
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                    className="wfield"
                      type="text"
                      name="uom_from"
                      value={unitConversionData?.uom_from}
                      onChange={handleInputChange}
                      placeholder="Name"
                      label="Name"
                    />
                  </Col> */}
                  <Col md={4}>
                    <SelectField
                    className="wfield"
                      required
                      label="Product"
                      name="md_product_id"
                      type="select"
                      title="Product"
                      options={productoption}
                      value={unitConversionData?.md_product_id}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                    className="wfield"
                      required
                      label="UOM From"
                      name="uom_from"
                      type="select"
                      title="UOM From"
                      options={unitOptions !=undefined && unitOptions}
                      value={unitConversionData !=undefined && unitConversionData?.uom_from}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                    className="wfield"
                      required
                      label="UOM To"
                      name="uom_to"
                      type="select"
                      title="UOM To"
                      options={unitOptions !=undefined && unitOptions}
                      value={unitConversionData !=undefined && unitConversionData?.uom_to}
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                    className="wfield"
                      type="number"
                      name="multiply_rate"
                      value={unitConversionData?.multiply_rate}
                      onChange={handleInputChange}
                      placeholder="Equal"
                      label="Mutliply Rate"
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                    className="wfield"
                      type="number"
                      name="divide_rate"
                      value={unitConversionData?.divide_rate}
                      onChange={handleInputChange}
                      placeholder="divide rate"
                      label="Divide Rate"
                    />
                  </Col>


                </Row>
              </Col>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
