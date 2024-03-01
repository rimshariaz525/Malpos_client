import React, { useState ,useEffect} from "react";
import { CardGroup, Col, Row, Form } from "react-bootstrap";
import { CardLayout } from "../../components/cards";
import PageLayout from "../../layouts/PageLayout";
import { Link,useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination";
import instance from "../../api/baseUrl";
import MultiSelectNoLabel from "../../components/fields/MultiSelectNoLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faEdit,
  faCheck,
  faEllipsis,
  faMinus,
  faCopy,
  faTrash,
  faCircleXmark,
  faUserEdit,
  faDownload
} from "@fortawesome/free-solid-svg-icons";
import { Box } from "../../components/elements";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import CustomModal from "./Modal";
export default function Transfers() {
const navigate=useNavigate();
  const [openDot, CloseDot] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transfer, setTransfer] = useState([]);
  const [perPage] = useState(10); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [totalNumber, setTotalNumber] = useState(0); 
  const handleDotBox = () => {
    CloseDot(!openDot);
    
  };

  const fetchTransfer = async () => {
    try {
      const response = await instance.get("/md_stock_transfer", {
        
      });
      const transferdata=response.data.data;
 
      const transferdetail= await Promise.all(
        transferdata.map(async (transfer)=>{
          const transferid = transfer.id;
          const groupresponse= await instance.get(`/md_stock_transfer/${transferid}/edit`)
          // console.log("product",groupresponse)
        return{
          ...transfer,
        groupname:groupresponse.data.stock_transfer_lines[0]?.product?.product_name || "NA",
      }
    }

      ))
      setTransfer(transferdetail);
      console.log(transferdetail)
      setTotalNumber(response.data.total);
    } catch (error) {
      console.log(error);
      // Show error message to user here
    } 
    
  };

  const handleDelete = (id) => {
    setBrandToDelete(id)
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (brandToDelete) {
      try {
         await instance.delete(`/md_stock_transfer/${brandToDelete}`);
        fetchTransfer();
        toast.success("Transfer deleted successfully",
         { autoClose: 5000
         });
        setShowDeleteModal(false);
      } catch (error) {
        toast.error("Error Transfer Ingredient", { autoClose: 5000 });
      
    };
  }}
  
  const cancelDelete = () => {
    setBrandToDelete(null);
    setShowDeleteModal(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEdit = async (id) => {
  localStorage.setItem(id,"transferid") 
  console.log(id) 
}

  useEffect(() => {
    fetchTransfer();
  }, []);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12} style={{fontSize:"1.5rem"}} > 
            Transfers
          </Col>
          <Col md={12}>
              <Row>
                <Col md={12}>
                  <Row>
                    <Col md={2}>
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
                    <Col md={6} className="p-0">
                      <Row>
                        <Col md={3} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="From Storage"
                            options={[
                              { label: "Return ", value: "Return" },
                              {
                                label: "Return ",
                                value: "Return",
                              },
                              {
                                label: "Back Stor ",
                                value: "Back Stor",
                              },
                            ]}
                          />
                        </Col>
                        <Col md={3} className="col-4-pr-0">
                          <MultiSelectNoLabel
                            label="To Storage"
                            options={[
                              { label: "Return ", value: "Return" },
                              {
                                label: "Return ",
                                value: "Return",
                              },
                              {
                                label: "Back Stor ",
                                value: "Back Stor",
                              },
                            ]}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={3} className="rs-btn-create">
                      <Link to={"/transfers-create"}>
                        <button className="acc-create-btn rs-btn-create">
                          <FontAwesomeIcon icon={faPlus} /> Create{" "}
                        </button>
                      </Link>
                    </Col>
                    <Col md={12}>
                      <Box className={"transfer-table-wrap"}>
                        <Table className="transfer-table">
                          <thead className="thead-dark text-center">
                      
                            <tr>
                              <th className="th-w50">Id</th>
                              <th className="th-w300">Product</th>
                              <th className="th-w130">Operation Time</th>
                              <th className="th-w130">From Storage</th>
                              <th className="th-w130">To Storage</th>
                              <th className="th-w100">Reason</th>
                              <th className="th-w100">Process</th>
                              <th className="th-w100">
                                Total Cost
                                <br />
                                <span>0.223 SAR</span>
                              </th>
                              <th className="th-w50">Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                          {  transfer &&
                        transfer?.map((item, index) => (
                            <tr key={index}>
                              <td className="td-w50">
                                <Link
                                  className="link"
                                  to={"/transfers-details"}
                                >
                                  {" "}
                                  {item.id}
                                </Link>
                              </td>
                              <td className="td-w300">
                                {item.groupname}
                              </td>
                              <td className="td-w130">{item.operation_time}</td>
                              <td className="td-w130">{item.md_from_storage_id}</td>
                              <td className="td-w130">{item.md_to_storage_id}</td>
                              <td className="td-w100">
                                {item.reason}
                              </td>
                              <td className="td-w100">
                                <span className="span-g-check">
                                  {item.is_deleted}
                                </span>
                              </td>
                              <td className="td-w100">100.00 SAR</td>
                              <td className="text-end-td ">
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
                                      handleDelete(item.id)
                                    }
                                  />
                                </Box>
                            <Link to={"/transfers-create"}>    <Box
                                  className="text-center px-2"
                                  style={{ cursor: "pointer" }}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    color="#f29b30"
                                    onClick={() =>
                                      handleEdit(item.id)
                                    }
                                  />
                                </Box>
                                </Link>
                              </Box>
                            </td>
                            </tr>
                            ))}
                          </tbody>
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
