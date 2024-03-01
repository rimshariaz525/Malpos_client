import React, { useState, useEffect } from "react";
import PageLayout from "../../layouts/PageLayout";
import { Row, Col,Form } from "react-bootstrap";
import { LabelField } from "../../components/fields";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";
import MultiSelectField from "../../components/fields/MultiSelectField";
import SelectField from "../../components/fields/SelectField";
import { Box } from "../../components/elements";
import { useLocation,Link,useNavigate } from "react-router-dom";
import axiosInstance from "../../api/baseUrl";
import ConProductVarientTab from "../../components/Tabs/ConProductVarientTab";
import ConProductEmenuTab from "../../components/Tabs/ConProductEmenuTab";


export default function CreateProductreadydish() {
  const navigate=useNavigate()
    const [activeTab, setActiveTab] = useState(0);
    const handleTabClick = (index) => {
        setActiveTab(index);
      };
      const location=useLocation();
      const [imagePreviewURL, setImagePreviewURL] = useState("");
      const [clients, setClients] = useState([]);
      const [brands, setBrands] = useState([]);
      const [branches, setBranches] = useState([]);
      const [categories, setCategories] = useState([]);
      const [brandDetails, setBrandDetails] = useState("");
      const [taxCategories, setTaxCategories] = useState([]);
      const [editProductId, setEditProductId] = useState(null);
      const [UOMs, setUOMs] = useState([]);
      const [action, setAction] = useState();     
      const [show, setShow] = useState(false);
      const [imgfile, setImgFile] = useState([]);
      // const [value, setValue] = useState("");
      // const [errorMessage, setErrorMessage] = useState("");
      const [form, setForm] = useState({
        cd_client_id: "1",
        cd_brand_id: "1",
        cd_branch_id: "1",
        td_tax_category_id: "",
        totel_weight: 500,
        md_product_category_id: "2",
        is_active: 1,
        product_name: "",
        product_code: "",
        maximun_day_of_product_return: "",
        description: "",
        gift: false,
        portion: false,
        sold_by_weight:false,
        ignore_service_charges:false,
        bundle: false,
        not_allow_apply_discount: "",
        sale_price: "",
        barcode: "",
        product_image: null,
        product_price: "",
        created_by: "1",
        updated_by: "1",
      });
    
      // Utility Functions
      const formatData = (data, idKey, nameKey = "name") =>
        data.map((item) => ({
          label:
            item[nameKey] ||
            item.name ||"",
          value: item[idKey],
          md_uom_id: item.md_uom_id,
        }));
        const fetchClients = async () => {
      
          try {
            const res = await axiosInstance.get("/cdclients");
            const formattedData = formatData(res.data, "cd_client_id");
            setClients(formattedData);
          } catch (error) {
            console.log(error);
          }
        };
        const fetchUom = async () => {
             
          try {
            const res = await axiosInstance.get("/uom");
            const formattedData = formatData(res.data.data.data, "md_uom_id");
            setUOMs(formattedData);
            console.log("uom details", res.data.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        const fetchCategories = async () => {
          try {
            const res = await axiosInstance.get("/product_category");
            const formattedData = formatData(
              res.data.product_category,
              "md_product_category_id",
              "product_category_name"
            );
      
            setCategories(formattedData);
          } catch (error) {
            console.log(error);
          }
        };
      
        const fetchBrands = async () => {
          try {
            const res = await axiosInstance.get("/cdbrand");
            const formattedData = formatData(res.data, "cd_brand_id");
            setBrands(formattedData);
          } catch (error) {
            console.log(error);
          }
        };
      
        const fetchBranches = async () => {
          try {
            const res = await axiosInstance.get("/cdbranch");
            const formattedData = formatData(res.data, "cd_branch_id");
            setBranches(formattedData);
          } catch (error) {
            console.log(error);
          }
        };
      
        const fetchTaxCategories = async () => {
          console.log("is tax_category");
          try {
            const res = await axiosInstance.get("/tax_category");
            console.log(res, "tax_category");
            const formattedData = formatData(
              res.data.tax_category,
              "td_tax_category_id"
            );
            setTaxCategories(formattedData);
          } catch (error) {
            console.log(error);
          }
        };

        
        const handleClientChange = (e) => {
          setForm((prevForm) => ({
            ...prevForm,
            cd_client_id: e.target.value,
          }));
        };
      
        const handleBrandChange = (selectedIds) => {
          const brand_detail = selectedIds.map((value) => ({
            cd_brands: value,
          }));
          setBrandDetails((prevBrandDetails) => ({
            ...prevBrandDetails,
            cd_brand_id: brand_detail,
          }));
          setForm((prevForm) => ({
            ...prevForm,
            cd_brand_id: selectedIds,
            product_brand: brand_detail,
          }));
        };
      
        const handleBranchChange = (selectedIds) => {
            ;
          const branch_detail = selectedIds.map((value) => ({
            cd_branches: value,
          }));
          setBrandDetails((prevBrandDetails) => ({
            ...prevBrandDetails,
            cd_branch_id: branch_detail,
          }));
          setForm((prevForm) => ({
            ...prevForm,
            cd_branch_id: selectedIds,
            product_branch: branch_detail,
          }));
        };
      
        const handleCategoryChange = (selectedIds) => {
            ;
          const category_detail = selectedIds.map((value) => ({
            md_product_categories: value,
          }));
          setBrandDetails((prevBrandDetails) => ({
            ...prevBrandDetails,
            md_product_category_id: category_detail,
          }));
          setForm((prevForm) => ({
            ...prevForm,
            md_product_category_id: selectedIds,
            product_category: category_detail,
          }));
        };
        const handleChange = (e) => {
          const { name, value, files } = e.target;
      
          if (name === "product_image") {
            let reader = new FileReader();
      
            reader.onloadend = () => {
              // Set the image preview URL
              setImagePreviewURL(reader.result);
            };
      
            if (files[0]) {
              reader.readAsDataURL(files[0]);
              setForm((prevForm) => ({
                ...prevForm,
                [name]: files[0],
              }));
            } else {
              // Reset the image preview URL if the file input is cleared
              setImagePreviewURL("");
            }
          } else {
            setForm((prevForm) => ({
              ...prevForm,
              [name]: value,
            }));
          }
        };
      
        const handleTaxCategoryChange = (e) => {
          setForm((prevForm) => ({
            ...prevForm,
            td_tax_category_id: e.target.value,
          }));
        };
      
        const handleUomChange = (e) => {
             
          setForm((prevForm) => ({
            ...prevForm,
            md_uom_id: e.target.value,
          }));
        };
      
      
        const handleCheckboxChange = (event) => {
          const { name, checked } = event.target;
      
          // Update state with 1 if checked and 0 if not checked
          setForm((prevState) => ({
            ...prevState,
            [name]: checked ? 1 : 0,
          }));
        };
      useEffect(() => {
        console.log(location.state, "locations");
        if (location.state?.id) {
          setEditProductId(location.state?.id);
          setAction(location.state?.action);
          fetchProductData();
        } else {
          setImagePreviewURL("");
          setEditProductId(null);
          setForm({
            cd_client_id: "",
            cd_brand_id: "",
            cd_branch_id: "",
            td_tax_category_id: null,
            is_active: 1,
            product_name: "",
            product_code:"",
            maximun_day_of_product_return: "",
            gift: false,
            portion: false,
            ignore_service_charges:false,
            not_allow_apply_discount: "",
            sold_by_weight: false,
            sale_price: "",
            barcode: "",
            product_image: null,
            product_price: "",
            created_by: "1",
            updated_by: "1",
          });
        }
      }, []);
      const getPreSelectIds = (productData, field) => {
        // console.log(productData, field);
        const categoryIds = productData.map((item) => item[field]);
        console.log("ids here ->>" + categoryIds, field);
        return categoryIds;
      };
    
      const showDetails = () => {
        setShow(!show);
      };
    
      const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
          setImgFile([...imgfile, reader.result]);
        };
    
        reader.readAsDataURL(file);
      };
      const handleImageRemove = (index) => {
        const newImgFile = [...imgfile];
        newImgFile.splice(index, 1);
        setImgFile(newImgFile);
      };
    
      const fetchProductData = async () => {
        if (location.state?.id) {
          const id = location.state?.id;
          const type = location.state?.type;
          try {
            const response = await axiosInstance.post(`/product_edit/${id}`,{type: type});
            console.log(response, "response is here");
            const productData = response.data;
            setImagePreviewURL(productData.product_image);
            setForm((prevForm) => ({
              ...prevForm,
              cd_client_id: productData.cd_client_id,
              cd_brand_id: getPreSelectIds(
                productData.product_brand,
                "cd_brand_id"
              ),
              cd_branch_id: getPreSelectIds(
                productData.product_branch,
                "cd_branch_id"
              ),
              md_product_category_id: getPreSelectIds(
                productData.product_product_category,
                "md_product_category_id"
              ),
              product_name: productData.product_name,
              product_code:productData.product_code,
              maximun_day_of_product_return:
                productData.maximun_day_of_product_return,
              sale_price: productData.sale_price,
              is_active: productData.is_active,
              description: productData.description,
              gift: productData.gift,
              sold_by_weight:productData.sold_by_weight,
              tax_category:productData.tax_category,
              md_uom_id:productData.md_uom_id,
              ignore_service_charges:productData.ignore_service_charges,
              portion:productData.portion,
              barcode: productData.barcode,
              not_allow_apply_discount: productData.not_allow_apply_discount,
              product_price: productData.product_price,
              product_image: productData.product_image,
              }));
          } catch (error) {}
        }
      };
      const [productColor, setProductColor] = useState(""); // State to store selected color
      const handleColorChange = (color) => {
        setProductColor(color.hex); // Update productColor state with the selected color code
        setForm((prevForm) => ({
          ...prevForm,
      product_color: color.hex,
          
        }));
      };
      const handleSubmit = async (e,type) => {
  
        e.preventDefault();
      const filteredObject = { ...form };
      delete filteredObject.md_product_category_id;
      delete filteredObject.cd_brand_id;
      delete filteredObject.cd_branch_id;
      filteredObject.type = type;
      if (editProductId !== null) {
        try {
          await axiosInstance.post(
            `/product_update/${editProductId}`,
            filteredObject,
            {
              //   headers: {
              //     "Content-Type": "multipart/form-data",
              //   },
            }
          );
          toast.success("Ready_made updated successfully", {
            autoClose: true,
          });
          navigate("/product-list")
        } catch (error) {
          console.log(error, "Error updating Ready_made");
        }
      } else {
        try {
          const response = await axiosInstance.post(
            "/product_store",
            filteredObject,
          );
          toast.success("Ready_made created successfully", {
            autoClose: true,
          });
          navigate("/product-list")
          setForm({
            cd_client_id: "1",
            cd_brand_id: "1",
            cd_branch_id: "1",
            td_tax_category_id: null,
            total_weight: 500,
            md_product_category_id: "2",
            is_active: 1,
            product_name: "",
            maximun_day_of_product_return: "",
            cooking_time: "",
            description: "",
            gift: false,
            portion: false,
            bundle: false,
            not_allow_apply_discount: "",
            sold_by_weight: false,
            sale_price: "",
            barcode: "",
            product_image: null,
            product_price: "",
            created_by: "1",
            updated_by: "1",
          });
        } catch (error) {
          toast.error("Error creating Ready_made", {
            autoClose: true,
          });
        }
      }
    };
    useEffect(() => {
      fetchBranches();
      fetchBrands();
      fetchCategories();
      fetchClients();
      fetchProductData();
      fetchTaxCategories();
      fetchUom();
    }, [])
    
    return (
        <div>
            <PageLayout>
            <Row>
          <Col md={12}>

            <h3>
              {action === "updatereadyitem"
                ? "Update Ready Item"
                : "Add New Ready Item"} 
            </h3>
            <div className="d-flex justify-content-between">
              <Box className="tabs-btn d-flex pt-3">
                <Box className="categories-btn">
                  <button
                    onClick={() => handleTabClick(0)}
                    className={activeTab === 0 ? "active" : ""}
                  >
                    General
                  </button>
                </Box>

                <Box className="categories-btn">
                  <button
                    onClick={() => handleTabClick(1)}
                    className={activeTab === 1 ? "active" : ""}
                  >
                    Variant
                  </button>
                </Box>

                <Box className="categories-btn">
                  <button
                    onClick={() => handleTabClick(2)}
                    className={activeTab === 2 ? "active" : ""}
                  >
                    EMenus
                  </button>
                </Box>
              </Box>
              <div className="d-flex align-self-end">
                <button
                  className="add-product-btn-pl"
                
                  onClick={(e) => handleSubmit(e, location?.state?.type)}
                >
                  Submit
                </button>
                <Link to="/product-list">
                   <button
                   className="add-product-btn-pl"
                     style={{
                       backgroundColor: "#0F6973",
                       color: "white",
                       borderColor: "#0F6973",
                       marginLeft: "10px",
                       fontSize: "14px",
                     }}
                    //  className="cus-btn-bor"
                   >
                     Back
                   </button>
                 </Link>
              </div>
            </div>
            </Col>
            <Col md={12}>
            {activeTab === 0 && (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
       <Col md={12}>

   <Row>
   <Col md={4}  >
                   <SelectField
                     className="wfield"
                     label="Client"
                     name="cd_client_id"
                     options={clients}
                     value={form.cd_client_id}
                     onChange={handleClientChange}
                   />
                 </Col>
                 <Col md={4}>
                   <MultiSelectField
                     required
                     label="Role"
                     className="wfield"
                     name="cd_brand_id"
                     type="select"
                     title="Brand"
                     options={brands}
                     value={form.cd_brand_id}
                     onChange={handleBrandChange}
                   />
                 </Col>
                 <Col md={4}   >
                   <MultiSelectField
                     required
                     className="wfield"
                     label="Role"
                     name="cd_branch_id"
                     type="select"
                     title="Branch"
                     options={branches}
                     value={form.cd_branch_id}
                     onChange={handleBranchChange}
                   />
                 </Col>
                 <Col md={4}>
                   <LabelField
                     required
                     className="wfield"
                     label="Name"
                     name="product_name"
                     type="text"
                     value={form.product_name}
                     placeholder="Enter product name"
                     onChange={handleChange}
                   />
                 </Col>
                 <Col md={4}>
                   <LabelField
                     required
                     className="wfield"
                     label="Product Code"
                     name="product_code"
                     type="text"
                     value={form.product_code}
                     placeholder="Enter product code"
                     onChange={handleChange}
                   />
                 </Col>
                 <Col md={4}>
                   <LabelField
                    className="wfield"
                     label="Barcode"
                     type="text"
                     name="barcode"
                     placeholder="Enter barcode"
                     value={form.barcode}
                     onChange={handleChange}
                   />
                 </Col>
                 <Col md={4}>
                   <MultiSelectField
                     required
                     label="Category"
                     className="wfield"
                     name="md_product_category_id"
                     type="select"
                     title="Category"
                     options={categories}
                     value={form.md_product_category_id}
                     onChange={handleCategoryChange}
                   />
                 </Col>
                 <Col md={4}>
                   <SelectField
                    className="wfield"
                     label="Tax Category"
                     name="td_tax_category_id"
                     options={taxCategories}
                     value={form.td_tax_category_id}
                     onChange={handleTaxCategoryChange}
                   />
                 </Col>
                 <Col md={4}>
                   <SelectField
                     label="UOMS"
                     className="wfield"
                     name="md_station_id"
                     options={UOMs}
                     value={form.md_station_id}
                     onChange={handleUomChange}
                   />
                 </Col>
                 <Col md={4}>
                   <LabelField
                    className="wfield"
                     label="Maxium day of product return"
                     type="number"
                     name="maximun_day_of_product_return"
                     placeholder="Number of days to return"
                     value={form.maximun_day_of_product_return}
                     onChange={handleChange}
                   />
                 </Col>
                 <Col md={8}>
                   <Box className="basicInfo-checkBoxes">
                     <Form.Check
                       type="checkbox"
                       label="Inactive"
                       name="is_active"
                       value={form.is_active}
                       checked={form.is_active === 1}
                       onChange={handleCheckboxChange}
                     />

                     <Form.Check
                       type="checkbox"
                       label="Gifts"
                       name="gift"
                       value={form.gift}
                       checked={form.gift === 1}
                       onChange={handleCheckboxChange}
                     />
                     <Form.Check
                       type="checkbox"
                       label="Can't be Discounted"
                       name="not_allow_apply_discount"
                       value={form.not_allow_apply_discount}
                       checked={form.not_allow_apply_discount === 1}
                       onChange={handleCheckboxChange}
                     />
                     <Form.Check
                       type="checkbox"
                       label="Ignore Service Charges"
                       name="ignore_service_charges"
                       value={form.ignore_service_charges}
                       checked={form.ignore_service_charges === 1}
                       onChange={handleCheckboxChange}
                     />
                     {/* <Form.Check
                       type="checkbox"
                       label="Bundle"
                       name="bundle"
                       value={form.bundle}
                       checked={form.bundle === 1}
                       onChange={handleCheckboxChange}
                     /> */}
   <Form.Check
                            type="checkbox"
                            label="Bundle"
                            name="bundle"
                            value={form.bundle}
                            checked={form.bundle === 1}
                            onChange={handleCheckboxChange}
                          />
                     <Form.Check
                       type="checkbox"
                       label="Sold by Weight"
                       name="sold_by_weight"
                       value={form.sold_by_weight}
                       checked={form.sold_by_weight === 1}
                       onChange={handleCheckboxChange}
                     />
                     <Form.Check
                       type="checkbox"
                       label="Portion"
                       name="portion"
                       value={form.portion}
                       checked={form.portion === 1}
                       onChange={handleCheckboxChange}
                     />
                   </Box>
                 </Col>
                 <Col md={4} >
                        <label htmlFor="colorPicker">Photo and Color</label>
                        <ChromePicker
                          color={productColor}
                          onChangeComplete={handleColorChange}
                        />
                      </Col>
     {/* <Col md={4}>
       <LabelField
         type="number"
         className="wfield"
         placeholder="Default: 1"
         label="Maxium day of product return"
         // fieldSize="w-100 h-md"
         onChange={handleChange}
       />
       {errorMessage && (
         <p className="error" style={{ color: "red", fontSize: "10px" }}>
           {errorMessage}
         </p>
       )}
     </Col> */}
     {/* <Col md={6}>
       <FormLabel>Inactive</FormLabel>
       <Form.Check type="switch" id="custom-switch" label="" />
       <Box className="basicInfo-checkBoxes">
         <Form.Check type="checkbox" label="Ignor Stock" />
         <Form.Check type="checkbox" label="Gifts" />
         <Form.Check type="checkbox" label="Portion" />
         <Form.Check type="checkbox" label="Can't be Discounted" />
         <Form.Check type="checkbox" label="Sold by Weight" disabled />
       </Box>
     </Col> */}
     <Col md={12}>
       <Row>
       <Col md={6}>
                        {imagePreviewURL && (
                          <Form>
                            <Form.Group controlId="formFile">
                              <Form.Label>Product image</Form.Label>
                              <Box className="pl-img">
                                <img src={imagePreviewURL} alt="Product" />
                              </Box>
                            </Form.Group>
                          </Form>
                          
                        )}
                           <label htmlFor="image">
                          Upload Image<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="product_image"
                          onChange={handleChange}
                        />
                      </Col>
         {/* <Col md={8}>
           <Form>
             <Form.Group controlId="formFile">
               <Form.Label>Image</Form.Label>
               <Box className="pl-img">
                 {imgfile.length === 0 ? (
                   <>
                     <input
                       type="file"
                       id="fileInput"
                       accept=".jpg, .jpeg, .png"
                       onChange={handleImageUpload}
                     />
                   </>
                 ) : (
                   <>
                     {imgfile.map((elem, index) => (
                       <span key={elem} style={{ display: "block" }}>
                         <button
                           onClick={() => handleImageRemove(index)}
                           style={{
                             float: "right",
                             marginBottom: "10px",
                           }}
                           >
                           ✖
                         </button>
                         <img
                           src={elem}
                           height="200"
                           width="200"
                           alt="med1"
                           style={{ float: "left", marginRight: "10px" }}
                         />
                       </span>
                     ))}
                   </>
                 )}
               </Box>
             </Form.Group>
           </Form>
         </Col> */}
         {/* <Col md={6}>
           <ColorDivs />
         </Col> */}
        
         {/* <Col md={12}>
           <FormLabel>According to Venue</FormLabel>
           <Form.Check
             type="switch"
             id="custom-switch"
             label=""
             onClick={showDetails}
           />
         </Col>
         {show ? (
           <div>
             <Col md={12}>
               <Table>
                 <thead className="thead-recipe">
                   <tr>
                     <th>Name</th>
                     <th>Price</th>
                     <th className="">Inactive</th>
                     <th className=""> Hide on e-menu</th>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Main</td>
                     <td>
                       <Col md={2}>
                         <input
                           className="conProduct-input "
                           type="number"
                           placeholder="0"
                         />
                       </Col>
                     </td>
                     <td className="">
                       {" "}
                       <Form.Check type="checkbox" />
                     </td>
                     <td className="">
                       {" "}
                       <Form.Check type="checkbox" />
                     </td>
                   </tr>
                   <tr>
                     <td>B2</td>
                     <td>
                       <Col md={2}>
                         <input
                           className="conProduct-input"
                           type="number"
                           placeholder="0"
                         />
                       </Col>
                     </td>
                     <td className="">
                       <Form.Check type="checkbox" />
                     </td>
                     <td className="">
                       {" "}
                       <Form.Check type="checkbox" />
                     </td>
                   </tr>
                   <tr>
                     <td>Bakery</td>
                     <td>
                       <Col md={2}>
                         <input
                           className="conProduct-input"
                           type="number"
                           placeholder="0"
                         />
                       </Col>
                     </td>
                     <td className="">
                       <Form.Check type="checkbox" />
                     </td>
                     <td className="">
                       {" "}
                       <Form.Check type="checkbox" />
                     </td>
                   </tr>
                 </tbody>
               </Table>
             </Col>
           </div>
         ) : (
           ""
         )} */}

         <Col md={12}>
           <Row>
           <Col md={4}>
                   <LabelField
                    className="wfield"
                     label="Cost "
                     type="number"
                     name="product_price"
                     placeholder="Enter product cost"
                     value={form.product_price}
                     onChange={handleChange}
                   />
                 </Col>
                 <Col md={4}>
                   <LabelField
                    className="wfield"
                     label="Price"
                     type="number"
                     name="sale_price"
                     placeholder="Enter Sale Price"
                     value={form.sale_price}
                     onChange={handleChange}
                     />
                 </Col>
             {/* <Col md={4}>
               <LabelField
                 type="number"
                 placeholder="0"
                 className="wfield"
                 label="Cost Price"
                 // fieldSize="w-100 h-md"
               />
             </Col>
             <Col md={4}>
             <LabelField
                 type="number"
                 className="wfield"
                 placeholder="0"
                 label="Price"
                 // fieldSize="w-100 h-md"
               />
             </Col> */}
           </Row>
         </Col>

       </Row>
     </Col>
   </Row>
                 {/* <Col md={12} style={{marginTop:"2rem"}}>
                 <button
           className="cus-btn"
           onClick={(e) => handleSubmit(e, location?.state?.type)}
         >
           Submit
         </button>
 
               </Col> */}
 </Col>
                 </form>

            )}
                      {activeTab === 1 && <ConProductVarientTab />}
            {/* {activeTab === 2 && <SelectModifiers />} */}
            {activeTab === 2 && <ConProductEmenuTab />}
            </Col>
            </Row>
            </PageLayout>
            </div>
    );
}