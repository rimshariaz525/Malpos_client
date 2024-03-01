import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SkeletonCell from "../../components/Skeleton";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import CustomModal from "../../pages/master/Modal";
import PageLayout from "../../layouts/PageLayout";
import CustomPagination from "../../components/CustomPagination";
import { Box } from "../../components/elements";
import {
  faEdit,
  faPlus,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/baseUrl";
import { toast } from "react-toastify";
import SkeletonCell from "../../components/Skeleton";

const Diets = () => {
  const [diets, setDiets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);

  const navigate = useNavigate();

  const fetchDiets = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/diet", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      console.log(response);
      setDiets(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate("/create-diet", {
      state: {
        id: id,
      },
    });
  };

  const handleDelete = (id) => {
    setBrandToDelete(id)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (brandToDelete) { 
        try {
      await axiosInstance.delete(`/diet_delete/${brandToDelete}`);
      fetchDiets();
      toast.success("Diet deleted successfully", { autoClose: 5000 });
      setShowDeleteModal(false)
    } catch (error) {
      toast.error("Error deleting diet", { autoClose: 5000 });
    }
  };}
  const cancelDelete = () => {
    setBrandToDelete(null);
    setShowDeleteModal(false);
  };
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axiosInstance.delete(`/diet_delete/${id}`);
  //     toast.success("Diet deleted successfully", { autoClose: 5000 });
  //     fetchDiets();
  //   } catch (error) {
  //     toast.error("Error deleting diet", { autoClose: 5000 });
  //   }
  // };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  useEffect(() => {
    fetchDiets().then(() => setIsLoading(false))
    .catch((error) => {
      console.error("Error fetching branches data", error);
    });
  }, [searchTerm, currentPage]);
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
              <Box className="head-sec-rearrange">
                <Box className="head-sec-rearrange-left">
                  <h3>Diets</h3>
                </Box>
              </Box>
          </Col>
          <Col md={12}>
              <Row>
                <Col md={10}>
                  <Row>
                    <Col md={3}>
                      <div style={{ position: "relative" }}>
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="search-pl"
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
                  </Row>
                </Col>
                <Col md={2}>
                  <Box className="station-right-btn">
                    <Link to={"/create-diet"}>
                      <button>
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </Box>
                </Col>
              </Row>
              <Col md={12}>
                <Box className="mc-table-responsive">
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <Table className="mc-table product">
                          <Thead className="mc-table-head">
                            <Tr>
                              <Th className="text-center">Name </Th>
                              {/* <Th className="text-center">Count</Th> */}
                              <Th className="text-center">Active</Th>
                              {/* <Th className="text-center">Station Reminder</Th> */}
                              <Th className="text-center">Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody className="mc-table-body even text-center">
                          {
                            isLoading
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
                            :diets &&
                              diets.map((diet, i) => (
                                <Tr key={i}>
                                  <Td className="td-left">{diet.diet_name}</Td>
                                  <Td>
                                    {diet.is_active === 1 ? (
                                      <span style={{ color: "green" }}>
                                        &#10004;
                                      </span>
                                    ) : (
                                      <span style={{ color: "red" }}>
                                        &#10008;
                                      </span>
                                    )}
                                  </Td>

                                  <Td className="text-end-td ">
                                    <Box
                                      className={
                                        " client-action-icons d-flex justify-content-center"
                                      }
                                    >
                                      <Box
                                        style={{ cursor: "pointer" }}
                                        className="px-2 text-center"
                                      >
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          color="#ee3432"
                                          onClick={() =>
                                            handleDelete(diet.md_diet_id)
                                          }
                                        />
                                      </Box>
                                      <Box
                                        className="text-center px-2"
                                        style={{ cursor: "pointer" }}
                                      >
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() =>
                                            handleEdit(diet.md_diet_id)
                                          }
                                        />
                                      </Box>
                                    </Box>
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                       
                      </Col>
                    </Row>
                  </Col>
                </Box>
                <CustomPagination
                          perPage={perPage}
                          totalUsers={totalNumber}
                          paginate={paginate}
                          currentPage={currentPage}
                        />
              </Col>
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
};

export default Diets;
