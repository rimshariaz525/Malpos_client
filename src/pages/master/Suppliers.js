import React, { useState, useEffect } from "react";
import { Col, Row, Form, Table, Modal } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import CustomPagination from "../../components/CustomPagination";
import PageLayout from "../../layouts/PageLayout";
import SkeletonCell from "../../components/Skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faMinus,
  faEllipsis,
  faCircleQuestion,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import {
  Button,
  Input,
  Box,
  Label,
  Text,
  Image,
  Heading,
} from "../../components/elements";
import { toast } from "react-toastify";
import CustomModal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function Suppliers() {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const filteredsuppliers = suppliers.filter((branch) =>
    branch.supplier_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentsuppliers = filteredsuppliers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchSupplier();
  };

  const handleDotBox = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // Fetch suppliers data
    fetchSupplier()
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching supply data", error);
      });
  }, [currentPage, searchTerm]);

  const fetchSupplier = async () => {
    await axiosInstance
      .get("/md_supplier", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setSuppliers(response.data.data);
        // const totalItems = response.data.data.length;
        // setTotalNumber(totalItems);
      })
      .catch((error) => {
        console.error("Error fetching suppliers data", error);
      });
  };

  const handleSupplierEdit = (id) => {
    console.log("id: " + id);
    navigate(`/suppliers-edit/`, {
      state: {
        id: id,
        action: "updateSupplier",
      },
    });
  };

  const handleSupplierDelete = (id) => {
    setSupplierToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (supplierToDelete) {
      try {
        await axiosInstance.delete(`/md_supplier/${supplierToDelete}`);
        fetchSupplier();
        toast.success("Supplier deleted successfully", {
          autoClose: 5000,
          closeButton: true,
        });
        setShowDeleteModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelDelete = () => {
    setSupplierToDelete(null);
    setShowDeleteModal(false);
  };

  // const handleSupplierDelete = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/md_supplier/${id}`);
  //     fetchSupplier();
  //     toast.success("Supplier deleted successfully", {
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
          <Col md={12} style={{ fontSize: "1.5rem" }}>
            Suppliers
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
                  <Col md={3} className="col-md-suppiers-checkbox">
                    <Form.Check
                      className="suppiers-checkbox"
                      type="checkbox"
                      label="Deleted Values"
                    />
                  </Col>
                  <Col md={6}>
                    <Box className="suppliers-r-btn">
                      <Link to={"/suppliers-create"}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                      {/*   <Link to={""}>
                          <button className="acc-create-btn rs-btn-create payment-btn">
                            <FontAwesomeIcon icon={faPlus} /> Make a Payment{" "}
                          </button>
                        </Link>*/}
                    </Box>
                  </Col>
                  <Col md={12}>
                    <Box className={"suppliers-table-wrap"}>
                      <Table responsive>
                        <thead
                          className="thead-dark"
                          style={{
                            fontSize: "12px",
                            height: "0.5rem",
                            lineHeight: "0.5rem",
                            paddingTop: "-5px",
                          }}
                        >
                          <tr>
                            <th className="th-w20">Name</th>
                            <th className="th-w15 text-end">
                              Debt
                              {""}{" "}
                              <FontAwesomeIcon
                                icon={faCircleQuestion}
                                color={"#f29b30"}
                              />
                              <br />
                              <span className="debt">-322670.00 SAR</span>
                            </th>
                            <th className="th-w15 text-end">
                              Balance
                              {""}{" "}
                              <FontAwesomeIcon
                                icon={faCircleQuestion}
                                color={"#f29b30"}
                              />
                              <br />
                              <span className="bal " style={{ color: "black" }}>
                                -02670.00 SAR
                              </span>
                            </th>
                            <th className="th-w15">Description</th>
                            <th className="th-w15">Phone</th>
                            <th className="th-w10">Tin</th>
                            <th className="th-w10">Status</th>
                            <th className="th-w10">Active</th>{" "}
                            {/* Added "Active" column */}
                            <th className="th-w10">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading
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
                            : currentsuppliers != undefined &&
                              currentsuppliers.map((supplier) => (
                                <tr key={supplier.id} className="f-13">
                                  <td className="td-w20">
                                    {supplier.supplier_name}
                                  </td>
                                  <td className="td-w15 text-end">322670.00</td>
                                  <td className="td-w15 text-end">322670.00</td>
                                  <td className="td-w15">
                                    {supplier.description}
                                  </td>
                                  <td className="td-w15">{supplier.phone}</td>
                                  <td className="td-w10">{supplier.tin}</td>
                                  <td className="td-w10 text-danger">
                                    {supplier.status
                                      ? supplier.status
                                      : "Active"}
                                  </td>
                                  <td className="td-w30">
                                    <Form.Check
                                      className="switch"
                                      type="switch"
                                      disabled={true}
                                      checked={supplier.is_active === 1}
                                      id={`custom-switch-${supplier.id}`}
                                    />
                                  </td>
                                  <td className="td-w10">
                                    <Row>
                                      <Col className="text-center">
                                        <Button
                                          title="Edit"
                                          className="btnlogo"
                                          onClick={() =>
                                            handleSupplierEdit(supplier.id)
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
                                            handleSupplierDelete(supplier.id)
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrash}
                                            color="#ee3432"
                                          />
                                        </Button>
                                      </Col>{" "}
                                    </Row>
                                  </td>
                                </tr>
                              ))}
                        </tbody>
                      </Table>
                    </Box>
                    <CustomPagination
                      perPage={perPage}
                      totalUsers={filteredsuppliers.length}
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
  );
}
