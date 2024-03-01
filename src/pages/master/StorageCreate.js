import React, { useEffect, useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import { CardLayout } from '../../components/cards';
import { LabelField } from '../../components/fields';
import PageLayout from '../../layouts/PageLayout';
import axiosInstance from '../../api/baseUrl';
import SelectField from '../../components/fields/SelectField';
import { toast } from 'react-toastify';
import { useProduct } from "../../components/createProduct/productContext";
import { Link,useNavigate } from 'react-router-dom';

export default function StorageCreate() {
  const navigate=useNavigate()
  
  const {
        form
  
      } = useProduct();
      const [brands, setBrands] = useState([]);
      const [branches, setBranches] = useState([]);
      const [clients, setClients] = useState([]);
      const [newStorage, setnewStorage] = useState({
        name: '',
        is_active: 1,
        cd_client_id: [],
        cd_brand_id: [], // Add the cd_brand_id field
        cd_branch_id: [], // Add the cd_branch_id field
        created_by:"1",
        updated_by:"1",
      });
    
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
  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
  }, []);
  const handleCreateStorage = () => {
    // Validate the data, if needed
    axiosInstance
      .post('/md_storage', newStorage) // Use POST for creating a new storage
      .then((response) => {
        toast.success('Storage created successfully', {
          position: 'top-right',
          autoClose: 3000,
        });
         navigate("/storage")
        console.log('Storage created successfully', response.data);
        // You can handle success, e.g., show a success message or navigate to another page.
      })
      .catch((error) => {
        toast.error('Error creating storage', {
          position: 'top-right',
          autoClose: 3000,
        });
        console.error('Error creating storage', error);
        // Handle the error, e.g., show an error message.
      });
  };

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            {/* <CardLayout> */}
              <Row>
          <Col md={12}>
            Storage Create
                  {/* <Link to={"/Storage"} style={{marginLeft:"64%"}}> */}
                  <Button  onClick={handleCreateStorage} style={{marginLeft:"64%",padding:"7px 15px",backgroundColor:"#ec917d",border:"none"}} >
                    Create
                  </Button>
                  {/* </Link> */}
                  <Link to={"/Storage"} className='btnback'> <button className="btnlk"> Back</button></Link>
          </Col>
          <Col md={4}>
              <SelectField
                      // className="w-50"
                      label="Client"
                      name="cd_client_id"
                      className="wfield"
                      options={clientsOptions}
                      value={newStorage.cd_client_id}
                      onChange={(e) =>
                        setnewStorage({
                          ...newStorage,
                          cd_client_id: e.target.value,
                        })
                      }
                    />
                </Col>
                <Col md={4}>
                    <SelectField
                      required
                      label="Brand"
                      name="brand"
                      type="select"
                      title="Brand"
                      className="wfield"
                      options={brandsOptions}
                      value={newStorage.cd_brand_id}
                      onChange={(e) =>
                        setnewStorage({
                          ...newStorage,
                          cd_brand_id: e.target.value,
                        })
                      }
                    />
                  </Col>
                  <Col md={4}>
                    <SelectField
                      required
                      className="wfield"
                      label="Branch"
                      name="branch"
                      type="select"
                      title="Branch"
                      options={branchesOptions}
                      value={newStorage.cd_branch_id}
                      onChange={(e) =>
                        setnewStorage({
                          ...newStorage,
                          cd_branch_id: e.target.value,
                        })
                      }
                    />
                  </Col>
                <Col md={4}>
                  <LabelField
                  className="wfield"
                    type="text"
                    style={{marginBottom:'1rem',width:"80%" }}
                    label={'Name'}
                    value={newStorage.name}
                    onChange={(e) => setnewStorage({ ...newStorage, name: e.target.value })}
                    placeholder={'Name'}
                  />
                  </Col>
                  <Col md={4}>
                  <Form.Check
                  style={{marginBottom:'1rem' }}
                    type="switch"
                    label="Status"
                    checked={newStorage.is_active === 1}
                    onChange={() => setnewStorage({ ...newStorage, is_active: newStorage.is_active === 1 ? 0 : 1 })}
                  />
                  </Col>
              </Row>
            {/* </CardLayout> */}
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
