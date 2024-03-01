import React, { useState, useEffect } from "react";
import { Col, Row, Form, Table, Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link } from "react-router-dom";
import CustomModal from "./Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "../../api/baseUrl";
import SkeletonCell from "../../components/Skeleton";
import {
  faSearch,
  faPlus,
  faEdit,
  faTrash,
  faEllipsis,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Input,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { LabelField } from "../../components/fields";
import CustomPagination from "../../components/CustomPagination";
import { useProduct } from "../../components/createProduct/productContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Storage() {
  const navigate = useNavigate();
  const [open, Close] = useState(false);

  const handleDotBox = () => {
    Close(!open);
  };
  
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 
  const [totalNumber, setTotalNumber] = useState(0); 
  const  [storage, setStorage]= useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storageToDelete, setStorageToDelete] = useState(null);
  const[searchTerm,setSearchTerm]= useState("");
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredstorage = storage.filter((branch) =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentstorage = filteredstorage.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  useEffect(() => {
  
    fetchStorage()
    .then(() => setLoading(false))
    .catch((error) => {
      console.error("Error fetching supply data", error);
    });
  },[searchTerm,currentPage]);

  const handleStorageEdit = (id) =>{
    console.log("id: " + id);
    navigate(`/storage-edit/`, {
      state: {
        id: id,
        action: "updateStorage",
      },
    });
  };

  const handleStorageDelete = (id) => {
    setStorageToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (storageToDelete) {
      try {
        await axiosInstance.delete(`/md_storage/${storageToDelete}`);
        fetchStorage()
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching supply data", error);
        });
        toast.success("Storage deleted successfully", {
          autoClose: 5000,
          closeButton: true,
        });
        setShowDeleteModal(false);
      } catch (error) {
        console.log(error);
      }
  };}

  const cancelDelete = () => {
    setStorageToDelete(null);
    setShowDeleteModal(false);
  };

  // const handleStorageDelete = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/md_storage/${id}`);
  //     fetchStorage()
  //     .then(() => setLoading(false))
  //     .catch((error) => {
  //       console.error("Error fetching supply data", error);
  //     });
  //     toast.success("Storage deleted successfully", {
  //       autoClose: false,
  //       closeButton: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchStorage = async () => {
    try {
      const res = await axiosInstance.get("/md_storage",{ 
        params:{
          search:searchTerm,
          current:currentPage,
        }
      });
      setStorage(res.data.data);
      // setTotalNumber(res.data.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
          
              <Row>
          <Col md={12} style={{fontSize:"1.4rem"}} >
            Storage
          </Col>
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
                      <Link to={"/storage-create"} style={{ float: "right" }}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className="storage-table-wrap">
                        <Table>
                          <thead className="thead-dark" style={{fontSize:"12px", height:"1rem", lineHeight:"0.2rem"}}>
                            <tr>
                              <td className="th-w30">Name</td>
                              <td className="th-w30">Active</td>
                              <td className="th-w30">Write-off sequence</td>
                              <td className="th-w10">Action</td>
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
                                    <SkeletonCell />
                                  </td>

                                </tr>
                              ))
                            :
                            currentstorage.map((item) => (
                              <tr key={item.id}>
                                <td className="td-w30">
                                    {item.name}
                                </td>
                                <td className="td-w30">
                                  <Form.Check
                                    className="switch"
                                    type="switch"
                                    disabled={true}
                                    checked={item.is_active === 1}
                                    id={`custom-switch-${item.id}`}
                                  />
                                </td>
                                <td className="td-w30">
                                  <Box className={"mul-field"}>
                                    <LabelField
                                      option={["1", "2", "3", "4", "5"]}
                                      style={{ height: "25px", width: "50px" }}
                                    />
                                  </Box>
                                </td>
                                <td className="td-w10">
                                <Button
                                  // to="/product-view"
                                  // state={{ id: `${item.id}` }}
                                  // href="/product-upload"
                                  title="Edit"
                                  className="btnlogo"
                                  onClick={() => handleStorageEdit(item.id)}
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
                                    handleStorageDelete(item.id)
                                  }
                                >
                                  <FontAwesomeIcon
                                  icon={faTrash}
                                  color="#ee3432"
                                  />                                </Button>
                              
                                  
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Box>
                          <CustomPagination
                  perPage={perPage}
                  totalUsers={filteredstorage.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
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
  );}
