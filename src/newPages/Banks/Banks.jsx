import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import PageLayout from "../../layouts/PageLayout";
import CustomPagination from "../../components/CustomPagination";
import CustomSearch from "../../components/CustomSearch";
import { Box, Text, Button } from "../../components/elements";
import { LabelField } from "../../components/fields";
import api from "../../api/baseUrl";
import CustomModal from "../../pages/master/Modal";
import SkeletonCell from "../../components/Skeleton";

const Banks = () => {
  const [banks, setBanks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const getBanks = async () => {
    try {
      const response = await api.get("/banks");
      setBanks(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredTaxCategories = banks?.filter((bank) =>
    Object.values(bank).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentBanks = filteredTaxCategories.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getBanks().then(() => setLoading(false))
    .catch((error) => {
      console.error("Error fetching branches data", error);
    });
  }, []);

  const handleDelete = (id) => {
    setBrandToDelete(id)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (brandToDelete) {
    try {
      await api.delete(`/bank_delete/${brandToDelete}`);
      getBanks();
      // const updatedBanks = banks.filter((bank) => bank.id !== id);
      // setBanks(updatedBanks);
      toast.success("Bank deleted successfully", {
        autoClose: 4000,
        closeButton: true,
      });
      setShowDeleteModal(false)
    } catch (error) {
      console.log(error);
    }
  };}
  const cancelDelete = () => {
    setBrandToDelete(null);
    setShowDeleteModal(false);
  };

  const handleEdit = (id) => {
    localStorage.setItem("bankId", id);
    console.log("id",id)
  };

  return (
    <>
      <PageLayout>
        <Row>
          <Col md={12}>
              <h3>Banks</h3>
           </Col>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <CustomSearch
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col sm={12} md={2} lg={2} style={{marginLeft:"58%"}} className="justify-content-between">
              <Link to={"/create-bank"}>
                <Button className="add-product-btn-pl">+ Create</Button>
              </Link>
            </Col>
            <Col md={12}>
              <Box>
                <Box className="mc-table-responsive">
                  <Table className="mc-table product">
                    <Thead className="mc-table-head">
                      <Tr>
                        <Th>Id</Th>
                        <Th>Name</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body  text-center">
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
                            :currentBanks &&
                        currentBanks.length > 0 &&
                        currentBanks.map((bank) => (
                          <Tr className="tbody" key={bank.md_bank_id}>
                            <Td>{bank.md_bank_id}</Td>
                            <Td>{bank.name}</Td>
                            <Td>{bank.description}</Td>
                            <Td>
                              <Box className="d-flex flex-row justify-content-center">
                                <Box>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#ee3432"
                                    className="px-2 "
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleDelete(bank.md_bank_id);
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <Link to={"/create-bank"}>
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      color="#f29b30"
                                      onClick={() => {
                                        handleEdit(bank.md_bank_id);
                                      }}
                                    />
                                  </Link>
                                </Box>
                              </Box>
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                  <CustomPagination
                    perPage={perPage}
                    totalUsers={filteredTaxCategories.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </Box>
              </Box>
            </Col>
          </Row>
        </Row>
      </PageLayout>
      <CustomModal
  show={showDeleteModal}
  onHide={cancelDelete}
  onConfirm={confirmDelete}
/>
    </>
  );
};

export default Banks;
