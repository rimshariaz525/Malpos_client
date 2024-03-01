import React, { useState, useEffect } from "react";
import { Col, Row, Form, Table, Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEllipsis,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import CustomModal from "./Modal";
import { toast } from "react-toastify";
import {
  Button,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination";
import SkeletonCell from "../../components/Skeleton";
export default function Packages() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);
  const[searchTerm,setSearchTerm]=useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [conversionToDelete, setConversionToDelete] = useState(null);
  const [unitConversions, setUnitConversions] = useState([]);
  const navigate = useNavigate();

  const handleUomDelete = async (id) => {
    console.log("id is here", id);
    setConversionToDelete(id);
    setShowDeleteModal(true);
  };
  

  const handleDotBox = () => {
    setOpen(!open);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchUnitConversions();
  };

  useEffect(() => {
    fetchUnitConversions().then(() => setLoading(false))
    .catch((error) => {
      console.error("Error fetching supply data", error);
    });
  }, [currentPage,]);
  const fetchUomById = async (id) => {
    try {
      const res = await axiosInstance.get(`/uom/${id}/edit`);
      console.log(res.data, "response here is upom");
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUnitConversions = async () => {
    try {
      const response = await axiosInstance.get("/uom_conversion/",
      {
        params:{
          search: searchTerm,
      page:currentPage
        }
      }
      );
      
            const unitConversionsData = response.data.data.data;
            const unitConversionsdetail= await Promise.all(
              unitConversionsData.map(async (unitConversions)=>{
                const transferid = unitConversions.md_product_id;
                const groupresponse= await axiosInstance.get(`/uom_conversion/${transferid}/edit`)
                console.log("product",groupresponse)
              return{
                ...unitConversions,
              groupname:groupresponse.data.data.product.product_name,
            }
          }))
      //   console.log(updatedUnitConversions, "updatedUnitConversions");
        setUnitConversions(unitConversionsdetail);
        setTotalNumber(response.data.data.data.length); 
      } 
      // else {
      //   console.error("Response data is not an array:", unitConversionsData);
      // }
     catch (error) {
      console.error("Error fetching unit measurements data", error);
    }
  };

  const handleUomEdit = (id) => {
    console.log("id: " + id);
    navigate(`/packages-create/`, {
      state: {
        id: id,
        action: "updateConversion",
      },
    });
  };

  const confirmDelete = async () => {
    if (conversionToDelete) {
      try {
        await axiosInstance.delete(`/uom_conversion/${conversionToDelete}`);
        fetchUnitConversions();
        toast.success("Conversion deleted successfully", {
          autoClose: 3000,
          closeButton: true,
        });
      } catch (error) {
        console.log(error);
      } finally {
        fetchUnitConversions();
        setConversionToDelete(null);
        setShowDeleteModal(false);
      }
    }
  };
  
  const cancelDelete = () => {
    setConversionToDelete(null);
    setShowDeleteModal(false);
  };
  

  // const handleUomDelete = async (id) => {
  //   console.log("id is here", id);
  //   try {
  //     await axiosInstance.delete(`/md_uom_conversions/${id}`);
  //     fetchUnitConversions();
  //     toast.success("Unit deleted successfully", {
  //       autoClose: false,
  //       closeButton: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12} style={{fontSize:"1.3rem"}} >
            Unit Conversions
          </Col>
          <Col md={12}>
            
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={3}>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="search-pl"
                          value={searchTerm} 
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            fontSize: "14px",
                          }}
                        >
                          <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                          </button>
                        </span>
                      </div>
                    </Col>
                    <Col md={9}>
                      <Link to={"/packages-create"} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"unit-measurements-table-wrap"}>
                        <Table responsive>
                          <thead
                            className="thead-dark"
                            style={{  fontSize:"12px", height:"1rem", lineHeight:"0.2rem"}}
                          >
                            <tr>

                              <th className="th-w30">ID</th>
                              <th className="th-w30">Product</th>
                              <th className="th-w30">UOM From</th>
                              <th className="th-w30">UOM To</th>
                              <th className="th-w30">Divide_Rate</th>
                              <th className="th-w30">Multiply_Rate</th>
                              <th className="th-w10">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                            loading
                            ? // Render skeletons while loading
                              Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  <td>
                                    <SkeletonCell />
                                  </td> 
                                  <td>
                                    <SkeletonCell />
                                  </td>
                                  
                                  <td>
                                   <SkeletonCell/>
                                  </td>


                                </tr>
                              ))
                            :
                            unitConversions != undefined &&
                              unitConversions.map((conversion) => (
                                <tr
                                  key={conversion.md_uoms_conversion_id}
                                  className="f-13"
                                >
                                  <td className="td-w30">
                                    {conversion.md_uom_conversion_id}
                                  </td>
                                  <td className="td-w30">
                                    {conversion.groupname}
                                  </td>
                                  <td className="td-w30">
                                    {conversion.uom_from_details.name}
                                  </td>
                                  <td className="td-w30">
                                    {conversion.uom_to_details.name}
                                  </td>
                                  <td className="td-w30">
                                    {/* {conversion.conversion[0].multiply_rate} */}
                                    {conversion.divide_rate}
                                  </td>
                                  <td className="td-w30">
                                    {conversion.multiply_rate}
                                  </td>
                                  <td className="td-w10">
                                    <Row>
                                      <Col className="text-center">
                                        <Button
                                          title="Edit"
                                          className="btnlogo"
                                          onClick={() =>
                                            handleUomEdit(
                                              conversion.md_uom_conversion_id
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon
                                    icon={faEdit}
                                    color="#f29b30"
                                  />
                                        </Button>

                                        <Button
                                          title="Delete"
                                          className="btnlogo"
                                          onClick={() =>
                                            handleUomDelete(
                                              conversion.md_uom_conversion_id
                                            )
                                          }
                                        >
                   <FontAwesomeIcon
                                  icon={faTrash}
                                  color="#ee3432"
                                  />                                        </Button>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                        <CustomPagination
                  perPage={perPage}
                  totalUsers={totalNumber}
                  paginate={paginate}
                  currentPage={currentPage}
                />
                      </Box>
                    </Col>
                  </Row>
                </Col>
              </Row>
          </Col>
        </Row>
      </PageLayout>
      <CustomModal
  show={showDeleteModal}
  onHide={cancelDelete}
  onConfirm={confirmDelete}
/>

    </div>
  );
}
