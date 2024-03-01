import { Col, Row, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ChromePicker } from "react-color";
import { Box } from "../../components/elements";
import { LabelField } from "../../components/fields";
import CreateRecipe from "../../components/createProduct/CreateRecipe";
import ModifiersTable from "../../components/createProduct/ModifiersTable";
import ColorDivs from "../../components/Tabs/ColorDivs";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";
import { useProduct } from "../../components/createProduct/productContext";
import ManageModifier from "../master/ManageModifier";

export default function CreateProduct() {
  const {
    clients,
    brands,
    branches,
    categories,
    taxCategories,
    diets,
    allergies,
    stations,
    menus,
    menuId,
    UOMs,
    // menuSections,
    errors,
    setErrors,
    imagePreviewURL,
    setDeletingMethod,
    deletingMethod,
    editProductId,
    form,
    setForm,
    setClients,
    setBrands,
    setBranches,
    setCategories,
    ingredients,
    setTaxCategories,
    setDiets,
    setAllergies,
    setStations,
    setMenus,
    // setMenuId,
    // setMenuSections,
    setImagePreviewURL,
    setEditProductId,

    handleClientChange,
    handleBrandChange,
    handleBranchChange,
    handleCategoryChange,
    updateProductDetail,
    handleDietsChange,
    handleAllergyChange,
    // handleMenuChange,
    handleMenuSectionChange,
    handleStationChange,
    handleChange,
    handleTaxCategoryChange,
    handleUomChange,
    handleCheckboxChange,
    handleSubmit,
  } = useProduct();

  const [activeTab, setActiveTab] = useState(0);
  const [action, setAction] = useState();
  const location = useLocation();

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    console.log(stations, menus, UOMs, "context");
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
        deleting_method: "",
        totel_weight: "",
        md_product_category_id: "",
        md_station_id: "",
        md_allergy_id: "",
        product_color: "",
        md_diet_id: "",
        is_active: 1,
        md_uom_id: "",
        product_name: "",
        maximun_day_of_product_return: "",
        cooking_time: "",
        description: "",
        gift: false,
        portion: false,
        ignore_service_charges: false,
        bundle: false,
        not_allow_apply_discount: "",
        sold_by_weight: false,
        sale_price: "",
        barcode: "",
        product_image: null,
        product_price: "",
        created_by: "1",
        updated_by: "1",
        product_details: [],
      });
    }
  }, []);
  const [productColor, setProductColor] = useState(""); // State to store selected color

  const handleColorChange = (color) => {
    setProductColor(color.hex); // Update productColor state with the selected color code
    setForm((prevForm) => ({
      ...prevForm,
  product_color: color.hex,
      // {
      //   // name: "", // Set the name as 'Product_color'
      //   value: color.hex, // Store the hex value in the form for submission
      // },
    }));
  };

  const getPreSelectIds = (productData, field) => {
    // console.log(productData, field);
    const categoryIds = productData.map((item) => item[field]);
    console.log("ids here ->>" + categoryIds, field);
    return categoryIds;
  };
  const fetchProductData = async () => {
    if (location.state?.id) {
      const id = location.state?.id;
      const type = location.state?.type;
      try {
        const response = await axiosInstance.post(`/product_edit/${id}`, {
          type: type,
        });
        // const response = await axiosInstance.get(`/product_edit/${id}`);
        // console.log(response, "response is here");
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
          td_tax_category_id: productData.td_tax_category_id,
          ingredients: productData.ingredients,
          product_name: productData.product_name,
          maximun_day_of_product_return:
            productData.maximun_day_of_product_return,
          sold_by_weight: productData.sold_by_weight,
          sale_price: productData.sale_price,
          is_active: productData.is_active,
          description: productData.description,
          gift: productData.gift,
          ignore_service_charges: productData.ignore_service_charges,
          portion: productData.portion,
          cooking_time: productData.cooking_time,
          barcode: productData.barcode,
          bundle: productData.bundle,
          totel_weight:productData.totel_weight,
          product_code: productData.product_code,
          not_allow_apply_discount: productData.not_allow_apply_discount,
          md_allergy_id: getPreSelectIds(
            productData.product_allergy,
            "md_allergy_id"
          ),
          md_uom_id:
            //  getPreSelectIds(
            productData.md_uom_id,
          //   "md_uom_id"
          // ),
          md_menu_id: productData.md_menu_id,
          md_menu_section_id: productData.md_menu_section_id,
          md_diet_id: getPreSelectIds(productData.product_diet, "md_diet_id"),
          md_station_id:
            // getPreSelectIds(
            productData.md_station_id,
          //   "md_station_id
          // ),
          product_code: productData.product_code,
          product_price: productData.product_price,
          product_image: productData.product_image,
          product_details: productData.product_details,
        }));
      } catch (error) {}
    }
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };
  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
            <h3>
              {action === "updateProduct"
                ? "Update Product"
                : "Add New Product"}
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
                    Recipe
                  </button>
                </Box>

                <Box className="categories-btn">
                  <button
                    onClick={() => handleTabClick(2)}
                    className={activeTab === 2 ? "active" : ""}
                  >
                    Modifiers
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
              </div>
            </div>

            {/* <Box className="categories-btn"> */}

            {/* </Box> */}
          </Col>
          <Col md={12}>
            {activeTab === 0 && (
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col md={4}>
                        <SelectField
                          className="wfield"
                          label="Client"
                          name="cd_client_id"
                          options={clients}
                          value={form.cd_client_id}
                          onChange={handleClientChange}
                          onFocus={() => clearError("cd_client_id")}
                        />
                        {errors.cd_client_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.cd_client_id}
                          </span>
                        )}
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
                          onFocus={() => clearError("cd_brand_id")}
                        />
                        {errors.cd_brand_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.cd_brand_id}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        <MultiSelectField
                          required
                          // className="wfield"
                          label="Role"
                          name="cd_branch_id"
                          type="select"
                          title="Branch"
                          options={branches}
                          value={form.cd_branch_id}
                          onFocus={() => clearError("cd_branch_id")}
                          onChange={handleBranchChange}
                        />
                        {errors.cd_branch_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.cd_branch_id}
                          </span>
                        )}
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
                          onFocus={() => clearError("md_product_category_id")}
                        />
                        {errors.md_product_category_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.md_product_category_id}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        <SelectField
                          className="wfield"
                          label="Tax Category"
                          name="td_tax_category_id"
                          options={taxCategories}
                          value={form.td_tax_category_id}
                          onChange={handleTaxCategoryChange}
                          onFocus={() => clearError("td_tax_category_id")}
                        />
                        {errors.td_tax_category_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.td_tax_category_id}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        {/* <SelectField
                            label="Diet"
                            name="md_diet_id"
                            options={diets}
                            value={form.md_diet_id}
                            onChange={handleDietsChange}
                          /> */}

                        <MultiSelectField
                          required
                          label="Diet"
                          name="md_diet_id"
                          className="wfield"
                          type="select"
                          title="Diet"
                          options={diets}
                          value={form.md_diet_id}
                          onChange={handleDietsChange}
                          onFocus={() => clearError("md_diet_id")}
                        />
                        {errors.md_diet_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.md_station_id}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        {/* <SelectField
                            label="Allergy"
                            name="md_allergy_id"
                            options={allergies}
                            value={form.md_allergy_id}
                            onChange={handleAllergyChange}
                          /> */}
                        <MultiSelectField
                          required
                          label="Allergy"
                          className="wfield"
                          name="md_allergy_id"
                          title="Allergy"
                          options={allergies}
                          value={form.md_allergy_id}
                          onFocus={() => clearError("md_allergy_id")}
                          onChange={handleAllergyChange}
                        />
                        {errors.md_allergy_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.md_allergy_id}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        <SelectField
                          label="Station"
                          className="wfield"
                          name="md_station_id"
                          options={stations}
                          value={form.md_station_id}
                          onChange={handleStationChange}
                          onFocus={() => clearError("md_station_id")}
                        />
                        {errors.md_station_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.md_station_id}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        <SelectField
                          label="Unit of Measurement"
                          name="md_uom_id"
                          className="wfield"
                          options={UOMs}
                          value={form.md_uom_id}
                          onChange={handleUomChange}
                          onFocus={() => clearError("md_uom_id")}
                        />
                        {errors.md_uom_id && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.md_uom_id}
                          </span>
                        )}
                      </Col>
                      {/* <Col md={6}>
                          <SelectField
                            // className="w-50"
                            label="Menus"
                            name="md_menu_id"
                            options={menus}
                            value={form.md_menu_id}
                            onChange={handleMenuChange}
                          />
                        </Col>
                        <Col md={6}>
                          {form.md_menu_id && (
                            <SelectField
                              // className="w-50"
                              label="Menu Section"
                              name="md_menu_id"
                              options={menuSections}
                              value={form.md_menu_section_id}
                              onChange={handleMenuSectionChange}
                            />
                          )}
                        </Col> */}
                      <Col md={4}>
                        <LabelField
                          required
                          className="wfield"
                          label="Product name"
                          name="product_name"
                          type="text"
                          value={form.product_name}
                          placeholder="Enter product name"
                          onChange={handleChange}
                          onFocus={() => clearError("product_name")}
                        />
                        {errors.product_name && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.product_name}
                          </span>
                        )}
                      </Col>
                      <Col md={4}>
                        <LabelField
                          className="wfield"
                          label="Product Code"
                          type="number"
                          name="product_code"
                          placeholder="Enter product code"
                          value={form.product_code}
                          onChange={handleChange}
                          onFocus={() => clearError("product_code")}
                        />
                        {errors.product_code && (
                          <span
                            style={{
                              fontSize: "10px",
                              paddingLeft: "5px",
                              color: "red",
                            }}
                          >
                            {errors.product_code}
                          </span>
                        )}
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
                        <LabelField
                          className="wfield"
                          label="Cooking Time"
                          type={"number"}
                          name="cooking_time"
                          placeholder="Enter Cooking time"
                          value={form.cooking_time}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <LabelField
                          className="wfield"
                          label="Product return days"
                          type="number"
                          name="maximun_day_of_product_return"
                          placeholder="Number of days to return"
                          value={form.maximun_day_of_product_return}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <LabelField
                          className="wfield"
                          label="Description"
                          name="description"
                          type="text"
                          value={form.description}
                          placeholder="Enter product description"
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <LabelField
                          className="wfield"
                          label="Product Price"
                          type="number"
                          name="product_price"
                          placeholder="Enter product Price"
                          value={form.product_price}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={4}>
                        <LabelField
                          className="wfield"
                          label="Sale Price"
                          type="number"
                          name="sale_price"
                          placeholder="Enter Sale Price"
                          value={form.sale_price}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={6}>
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
                      <Col md={6}>
                        <label htmlFor="colorPicker">Photo and Color</label>
                        <ChromePicker
                          color={productColor}
                          onChangeComplete={handleColorChange}
                        />
                      </Col>
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
                      {/* <Col md={6}>
                         <ColorDivs onSelectColor={handleColorSelect} /> 
                       
                        </Col> */}
                      {/* <Col md={6} style={{marginTop:"5rem"}}>
                        <label htmlFor="image">
                          Upload Image<span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="product_image"
                          onChange={handleChange}
                        />
                      </Col> */}
                      <Col md={12}>
                        <button className="cus-btn">
                          {" "}
                          {action === "updateProduct" ? "Update" : "Create"}
                        </button>
                        <Link to="/product-list">
                          <button
                            style={{
                              backgroundColor: "#0F6973",
                              color: "white",
                              borderColor: "#0F6973",
                            }}
                            className="cus-btn-bor"
                          >
                            Back
                          </button>
                        </Link>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </form>
            )}

            {activeTab === 1 && <CreateRecipe />}
            {/* {activeTab === 2 && <SelectModifiers />} */}
            {activeTab === 2 && <ModifiersTable />}
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
