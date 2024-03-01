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

const BankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const getBankAccounts = async () => {
    try {
      const response = await api.get("/bank_account");
      setBankAccounts(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredTaxCategories = bankAccounts?.filter((account) =>
    Object.values(account).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentBankAccounts = filteredTaxCategories.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getBankAccounts().then(() => setLoading(false))
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
    // console.log(id);
    try {
      await api.delete(`/bank_account_delete/${brandToDelete}`);
      getBankAccounts();
      // const updatedBankAccounts = bankAccounts.filter((account) => account.id !== id);
      // setBankAccounts(updatedBankAccounts);
      toast.success("Bank Account deleted successfully", {
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
    localStorage.setItem("bankAccountId", id);
  };

  return (
    <>
      <PageLayout>
        <Row>
          <Col md={12}>
              <h3>Bank Accounts</h3>
          </Col>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <CustomSearch
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col sm={12} md={2} lg={2} style={{marginLeft:"55%"}} className="justify-content-between">
              <Link to={"/create-bank-account"}>
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
                    <Tbody className="mc-table-body text-center">
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
                            :currentBankAccounts &&
                        currentBankAccounts.length > 0 &&
                        currentBankAccounts.map((account) => (
                          <Tr
                            className="tbody"
                            key={account.md_bank_account_id}
                          >
                            <Td>{account.md_bank_account_id}</Td>
                            <Td>{account.tender_type}</Td>
                            <Td>{account.description}</Td>
                            <Td>
                              <Box className="d-flex flex-row justify-content-center">
                                <Box>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    color="#ee3432"
                                    className="px-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleDelete(account.md_bank_account_id);
                                    }}
                                  />
                                </Box>
                                <Box>
                                  <Link to={"/create-bank-account"}>
                                    {" "}
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      color="#f29b30"
                                      onClick={() => {
                                        handleEdit(account.md_bank_account_id);
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

export default BankAccounts;
