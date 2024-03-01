import { useState, useEffect } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import LabelField from "../../components/fields/LabelField";
import { Pagination, Breadcrumb } from "../../components";
import CustomPagination from "../../components/CustomPagination";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from "../../components/elements/Table";
import {
  Anchor,
  Heading,
  Box,
  Text,
  Input,
  Image,
  Icon,
  Button,
} from "../../components/elements";
import PageLayout from "../../layouts/PageLayout";
import data from "../../data/master/ingredients.json";
import { Link, useNavigate } from "react-router-dom";
import SkeletonCell from "../../components/Skeleton";
import CustomModal from "./Modal";
import IngredientsTable from "../../components/tables/IngredientsTable";
import instance from "../../api/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage] = useState(10);
  const [totalNumber, setTotalNumber] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  
  const navigate = useNavigate();

  const fetchIngredients = async () => {
    setIsLoading(true);
    try {
      const response = await instance.get("/ingredient", {
        params: {
          search: searchTerm,
          page: currentPage,
        },
      });
      setIngredients(response.data.data);
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDelete = (id) => {
    setBrandToDelete(id)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (brandToDelete) {
      try {
         await instance.delete(`/ingredient_delete/${brandToDelete}`);
        fetchIngredients();
        toast.success("Ingredient deleted successfully",
         { autoClose: 5000
         });
        setShowDeleteModal(false);
      } catch (error) {
        toast.error("Error deleting Ingredient", { autoClose: 5000 });
      
    };
  }}
  
  const cancelDelete = () => {
    setBrandToDelete(null);
    setShowDeleteModal(false);
  };
  
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await instance.delete(`/ingredient_delete/${id}`);
  //     toast.success("Ingredient deleted successfully", { autoClose: 5000 });
  //     fetchIngredients();
  //   } catch (error) {
  //     toast.error("Error deleting Ingredient", { autoClose: 5000 });
  //   }
  // };

  const handleEdit = async (id) => {
    navigate("/create-ingredient", {
      state: {
        id: id,
      },
    });
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchIngredients();
  }, [searchTerm, currentPage]);
  return (
    <>
    <PageLayout>
      <Row>
        <Col xl={12}>
        
            <Breadcrumb title="Ingredient"></Breadcrumb>
        </Col>

        <Col md={12}>
            <Row >
              <Col md={2}>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="wfield"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "40px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <button type="submit">
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </span>
                </div>
              </Col>
              {/* <Col md={10}> */}
                {/* <Row className="product-filter-pl"> */}
                  {data?.ingredients.filter.slice(0, 4).map((item, index) => (
                    <Col
                      md={2}
                      key={index}
                      // className="col-2-filters"
                      fieldSize="field-select  "
                    >
                      <LabelField
                        type={item.type}
                        option={item.option}
                        placeholder={item.placeholder}
                        labelDir="label-col"
                        // fieldSize="field-select  w-sm h-md "
                        className="wfield"
                      />
                    </Col>
                  ))}
                {/* </Row> */}
              {/* </Col> */}
              {/* <Col
                md={2}
                // className="ingredients-left-btns"
              ></Col> */}
              {/* <Row> */}
                {data?.ingredients.filter.slice(-1).map((item, index) => (
                  <Col md={2}  className="w-10">
                    <LabelField
                      type={item.type}
                      option={item.option}
                      placeholder={item.placeholder}
                      labelDir="label-col"
                      className="wfield"
                      // fieldSize="field-select w-200 h-md"
                    />
                  </Col>
                ))}

                <Col md={2} style={{marginLeft:"90%"}} className="ingre-btn-w">
                  <div>
                    {/* <button className="add-product-btn-pre">
                        + Bulk create
                      </button> */}
                    <Link to="/create-ingredient">
                      <button className="pm-create-btn">
                        <FontAwesomeIcon icon={faPlus} /> Create
                      </button>
                    </Link>
                  </div>
                </Col>
              {/* </Row> */}

              <Col xl={12}>
                <Box className="mc-table-responsive">
                  <Table className="mc-table preparation">
                    <Thead className="mc-table-head">
                      <Tr>
                        <Th>Name</Th>
                        <Th>Unit</Th>
                        <Th>Category</Th>
                        <Th>Cost Price</Th>
                        <Th>Base Unit Weight, Kg</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody className="mc-table-body text-center">
                    {isLoading ? ( // Render skeleton when loading is true
                        <>
                          {Array.from({ length: 5 }).map((_, index) => (
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
                         ))}
                        </>
                      ) : ( 
                        ingredients &&
                        ingredients?.map((item, index) => (
                          <Tr key={index}>
                            {/* <Td>
                              <Box className="mc-table-group  ">
                                <Link
                                  to="/ingredient-details"
                                  state={{ id: `${item.id}` }}
                                >
                                  <Heading as="h6">Ingredient</Heading>
                                </Link>
                              </Box>
                            </Td> */}
                            <Td>{item.name}</Td>
                            <Td>
                              <Box className="mc-table-price">
                                <Text>{item.unit}</Text>
                              </Box>
                            </Td>
                            <Td>
                                <Text>{item.md_ingredient_id}</Text>
                              
                            </Td>
                            <Td>{item.cost_price}</Td>
                            <Td>{item.base_unit}</Td>
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
                                      handleDelete(item.md_ingredient_id)
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
                                      handleEdit(item.md_ingredient_id)
                                    }
                                  />
                                </Box>
                              </Box>
                            </Td>
                          </Tr>
                        ))
                      )}
                    </Tbody>
                  </Table>
                </Box>
                <CustomPagination
                  perPage={perPage}
                  totalUsers={totalNumber}
                  paginate={paginate}
                  currentPage={currentPage}
                />
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
    </>
  );
}
