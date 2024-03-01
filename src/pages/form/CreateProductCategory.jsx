import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { LabelField } from "../../components/fields";
import MultiSelectField from "../../components/fields/MultiSelectField";
import PageLayout from "../../layouts/PageLayout";
import axiosInstance from "../../api/baseUrl";
import SelectField from "../../components/fields/SelectField";

export default function CreateProductCategory() {
  const [clients, setClients] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branches, setBranches] = useState([]);
  const[isupdate,setIsUpdate]=useState(false);
  const [editid,setEditid]=useState(null)
  const [taxCategories, setTaxCategories] = useState([]);
  const [form, setForm] = useState({
    cd_client_id: "",
    cd_brand_id: "",
    cd_branch_id: "",
    td_tax_category_id: "",
    is_active: 1,
    product_category_name: "",
    product_category_code: "",
    product_category_description: "",
    product_category_image: null,
    created_by: "1",
    updated_by: "1",
  });

  const location = useLocation();

  const formatData = (data, idKey) =>
    data.map((item) => ({ label: item.name, value: item[idKey] }));

  const fetchClients = async () => {
    try {
      const res = await axiosInstance.get("/cdclients");
      const formattedData = formatData(res.data, "cd_client_id");
      setClients(formattedData);
      console.log("clinet",formattedData)
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
    try {
      const res = await axiosInstance.get("/tax_category");
      const formattedData = formatData(
        res.data.tax_category,
        "td_tax_category_id"
      );
      setTaxCategories(formattedData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryData = async () => {
  const productid =localStorage.getItem("productid")
  setEditid(productid);
  if(productid){
    setIsUpdate(true)
      try {
        const response = await axiosInstance.get(`/product_category/${productid}`);
        const categoryData = response.data.product_category[0];
        console.log("data",categoryData)
        setForm({
          
          cd_client_id: categoryData.cd_client_id || "",
          cd_brand_id: categoryData.cd_brand_id || "",
          cd_branch_id: categoryData.cd_branch_id || "",
          td_tax_category_id: categoryData.td_tax_category_id || "",
          product_category_name: categoryData.product_category_name || "",
          product_category_code: categoryData.product_category_code || "",
          product_category_description:
            categoryData.product_category_description || "",
            is_active:1,
          product_category_image:categoryData.product_category_image,
          created_by:"1",
          updated_by:"1",
        });
        localStorage.removeItem("productid")
      } catch (error) {
        console.log(error);
      }
    }}
  

  const handleClientChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_client_id: selectedIds,
    }));
  };

  const handleBrandChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_brand_id: selectedIds,
    }));
  };

  const handleBranchChange = (selectedIds) => {
    setForm((prevForm) => ({
      ...prevForm,
      cd_branch_id: selectedIds,
    }));
  };

  const handleTaxCategoryChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      td_tax_category_id: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "product_category_image") {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (isupdate) {
      try {
        await axiosInstance.post(`/product_category_update/${editid}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setEditid(null)
        toast.success("Category updated successfully", {
          autoClose: true,
        });
      } catch (error) {
        console.log(error, "Error updating product category");
      }
    } else {
      try {
        const response = await axiosInstance.post(
          "/product_category_store",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Category created successfully", {
          autoClose: true,
        });
      } catch (error) {
        console.log(error, "Error creating product category");
      }
    }
  };

  useEffect(() => {
    fetchClients();
    fetchBrands();
    fetchBranches();
    fetchTaxCategories();
fetchCategoryData()
    // if (location.state?.id) {
    //   fetchCategoryData(location.state?.id);
      
    // }
  }, []);

  return (
    <div>
      <PageLayout>
        <Row>
          <Col md={12}>
              <h3>Add New Category</h3>
          </Col>
          <Col md={12}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <Row>
                  <Col md={4}>
                    <MultiSelectField
                      label="Role"
                      name="cd_client_id"
                      type="select"
                      title="Client"
                      options={clients}
                      value={form.cd_client_id}
                      onChange={handleClientChange}
                    />
                  </Col>
                  <Col md={4}>
                    <MultiSelectField
                      label="Role"
                      name="cd_brand_id"
                      type="select"
                      title="Brand"
                      options={brands}
                      value={form.cd_brand_id}
                      onChange={handleBrandChange}
                    />
                  </Col>
                  <Col md={4}>
                    <MultiSelectField
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
                    <LabelField
                      label="Category name"
                      className="wfield"
                      name="product_category_name"
                      type="text"
                      placeholder="Enter category name"
                      value={form.product_category_name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      label="Category Code"
                      name="product_category_code"
                      type="text"
                      className="wfield"
                      placeholder="Enter category code"
                      value={form.product_category_code}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={4}>
                    <LabelField
                      label="Category Description"
                      name="product_category_description"
                      type="textarea"
                      className="wfield"
                      placeholder="Enter category desc"
                      value={form.product_category_description}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6}>
                    <label htmlFor="image">Upload Image</label>
                    <input
                      type="file"
                      id="image"
                      name="product_category_image"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={12}>
                    <button type="submit" className="cus-btn">
                      Create
                    </button>
                    <Link to="/product-category">
                      <button
                        style={{
                          backgroundColor: "#0f6973",
                          color: "white",
                          borderColor: "#0f6973",
                        }}
                        className="cus-btn-bor"
                      >
                        Back
                      </button>
                    </Link>
                  </Col>
                </Row>
            </form>
          </Col>
        </Row>
      </PageLayout>
    </div>
  );
}
