import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../../components/elements/Table";
// import { CardLayout } from "../../../components/cards";
import PageLayout from "../../../layouts/PageLayout";
import CustomPagination from "../../../components/CustomPagination";
import CustomSearch from "../../../components/CustomSearch";
import { Box, Text, Button } from "../../../components/elements";
import { LabelField } from "../../../components/fields";
import api from "../../../api/baseUrl";
import CustomModal from "../../../pages/master/Modal";
import SkeletonCell from "../../Skeleton";
const TaxCategory = () => {
  const naviagte = useNavigate();
  const [taxCategories, setTaxCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const getTaxCategories = async () => {
    try {
      const response = await api.get("/tax_category");
      setTaxCategories(response.data.tax_category);
    } catch (error) {
      console.log(error, "Error Retriving data");
    }
  };

  // Pagination Logic
  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredTaxCategories = taxCategories?.filter((category) =>
    Object.values(category).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const currentTaxCategories = filteredTaxCategories.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  //   const currentBranches = branches.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getTaxCategories()
    .then(() => setLoading(false))
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
      await api.delete(`/tax_category_delete/${brandToDelete}}`);
      getTaxCategories();
      // const updatedTaxCategories = taxCategories.filter(
      //   (category) => category.id !== id
      // );
      // setTaxCategories(updatedTaxCategories);
      toast.success("Tax Category deleted successfully", {
        autoClose: true,
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
    // naviagte(`/tax-category/`, {
    //   state: {
    //     id: id,
    //     action: "updateTaxCategory",
    //   },
    // });
    localStorage.setItem("TaxId", id);
  };

  return (
    <>
      <PageLayout>
        <Row>
          <Col md={12}>
            {/* <CardLayout> */}
              <h3>Tax Categories</h3>
            {/* </CardLayout> */}
          </Col>
          <Col md={12}>
            {/* <CardLayout> */}
              <Row>
                <Col xs={12} sm={12} md={3} lg={3}>
                  <CustomSearch
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col sm={12} md={2} lg={2} style={{marginLeft:"55%"}} className="justify-content-between">
                  <Link to={"/create-tax-category"}>
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
                            :currentTaxCategories &&
                            currentTaxCategories.length > 0 &&
                            currentTaxCategories.map((category) => (
                              <Tr
                                className="tbody"
                                key={category.td_tax_category_id}
                              >
                                <Td>{category.td_tax_category_id}</Td>
                                <Td>{category.name}</Td>
                                <Td
                                // style={{
                                //   color: branch.is_active ? "green" : "red",
                                // }}
                                >
                                  {/* {branch.is_active ? "Yes" : "No"} */}
                                  {category.description}
                                </Td>
                                <Td>
                                  <Box className="d-flex flex-row justify-content-center">
                                    <Box>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        color="#ee3432"
                                        className="px-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleDelete(
                                            category.td_tax_category_id
                                          );
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Link to={"/create-tax-category"}>
                                        {" "}
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          color="#f29b30"
                                          onClick={() => {
                                            handleEdit(
                                              category.td_tax_category_id
                                            );
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
            {/* </CardLayout> */}
          </Col>
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

export default TaxCategory;
