import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextEditor from "../../../../utils/TextEditor";
import { faCloudArrowUp, faX } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategoriesTree } from "../../../../services/apiCategory";
import { createNewProduct } from "../../../../services/apiProduct";
import { TextField } from "@mui/material";

function categorySelect(categories, depth = 0) {
  return categories.map((category, index) => (
    <React.Fragment key={index}>
      <option className="text-xs" key={index} value={category.id}>
        {"--".repeat(depth) + " " + category.name}
      </option>
      {category.children && categorySelect(category.children, depth + 1)}
    </React.Fragment>
  ));
}

function ProductAdd() {
  const [image, setImage] = useState();
  const [productName, setProductName] = useState("");
  const [sku, setSKU] = useState("");
  const [stock, setStock] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [price, setPrice] = useState();
  const [cost, setCoset] = useState();
  const [active, setActive] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState("");
  //   const [options, setOptions] = useState([{ option: "", value: "" }]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategoriesTree();
        const { data } = res;
        setCategories(data?.content);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleAddOption = () => {
    setOptions([...options, { option: "", value: "" }]);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = options.map((opt, idx) =>
      idx === index ? { ...opt, [field]: value } : opt
    );
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, idx) => idx !== index);
    setOptions(updatedOptions);
  };

  async function handleSaveNewProduct() {
    const newProduct = {
      name: productName,
      sku,
      stock: Number(stock),
      price: Number(price),
      cost: Number(cost),
      shortDescription,
      longDescription,
      slug,
      productDetails: options,
      category_id: Number(categoryId) || null,
      brand_id: Number(brandId) || null,
      active,
      discountPercentage: Number(
        (((Number(price) - Number(cost)) / Number(price)) * 100).toFixed(2)
      ),
    };

    try {
      const res = await createNewProduct(newProduct, image);
      console.log(res);
      navigate("/admin/product/list");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Add a new Product</h1>
        <div className="space-x-2">
          <button
            onClick={handleSaveNewProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-600"
          >
            Publish Product
          </button>
        </div>
      </div>
      <p className="text-gray-500 mb-6">Orders placed across your store</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Product information</h2>
            <label className="block mb-2 text-gray-600">Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              className="w-full p-2 mb-4 border rounded"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-2 text-gray-600">SKU</label>
                <input
                  type="text"
                  placeholder="SKU"
                  className="w-full p-2 border rounded"
                  value={sku}
                  onChange={(e) => setSKU(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-600">Stock</label>
                <input
                  type="number"
                  placeholder="Stock"
                  className="w-full p-2 border rounded"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mb-6">
              <span className="bg-gray-200 border border-r-0 rounded-l px-3 py-2">
                https://ShopIoT.com/san-pham/
              </span>
              <input
                type="text"
                className="w-full border rounded-r px-3 py-2"
                placeholder="dien-thoai"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-600">
                Short Description (Optional)
              </label>

              <TextField
                className="w-full border-2 rounded bg-white"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                id="filled-textarea"
                multiline
                variant="filled"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-600">
                Long Description (Optional)
              </label>
              <TextEditor text={longDescription} setText={setLongDescription} />
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-4">Product Image</h2>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg"
            >
              {image ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Product"
                    className="object-cover mb-4"
                  />
                  <button
                    onClick={removeImage}
                    className="text-red-600 py-1 px-2 bg-gray-100 border-red-600 border-2 rounded-2xl"
                  >
                    Xóa ảnh
                  </button>
                </div>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    className="text-gray-400 text-3xl mb-2"
                  />
                  <p className="mb-4">Kéo-thả ảnh vào đây hoặc</p>
                  <label className="text-blue-600 py-1 px-2 bg-gray-100 border-blue-600 border-2 rounded-2xl cursor-pointer">
                    Chọn ảnh
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Product Options</h2>
            <div className="border-dashed border-2 border-gray-300 p-6 text-center rounded-lg">
              {options.map((opt, index) => (
                <div key={index} className="flex items-center space-x-4 mb-4">
                  <div className="flex-1">
                    {/* <label className="block text-sm font-medium text-gray-700">
                      Option
                    </label> */}
                    <div className="mt-1 relative rounded-md shadow-sm">
                      {/* <input
                        type="text"
                        className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md p-2 mb-4 border"
                        value={opt.option}
                        onChange={(e) =>
                          handleOptionChange(index, "option", e.target.value)
                        }
                        placeholder="Option"
                      /> */}
                      <TextField
                        id="outlined-basic"
                        label="Option"
                        variant="outlined"
                        className="block w-full pr-10 sm:text-sm border-gray-300 rounded-md p-2 mb-4 border"
                        value={opt.option}
                        onChange={(e) =>
                          handleOptionChange(index, "option", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    {/* <label className="block text-sm font-medium text-gray-700">
                      Value
                    </label> */}
                    <div className="mt-1 relative rounded-md shadow-sm">
                      {/* <textarea
                        type="text"
                        className="block w-full sm:text-sm border-gray-300 rounded-md p-2 mb-4 border"
                        value={opt.value}
                        rows={1}
                        style={{ overflowY: "auto" }}
                        onChange={(e) =>
                          handleOptionChange(index, "value", e.target.value)
                        }
                        placeholder="Value"
                      /> */}
                      <TextField
                        className="block w-full sm:text-sm border-gray-300 rounded-md p-2 mb-4 border"
                        id="outlined-multiline-flexible"
                        label="Multiline"
                        multiline
                        maxRows={6}
                        value={opt.value}
                        onChange={(e) =>
                          handleOptionChange(index, "value", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveOption(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddOption}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-plus mr-2"></i> Add Another Option
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Pricing</h2>
            <div className="flex">
              <label className="p-2 font-semibold">Price: </label>
              <input
                type="number"
                placeholder="Price"
                className="w-full p-2 mb-4 border rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <p className="p-2 font-semibold">VND</p>
            </div>
            <div className="flex">
              <label className="p-2 font-semibold">Cost: </label>
              <input
                type="number"
                placeholder="Cost"
                className="w-full p-2 mb-4 border rounded"
                value={cost}
                onChange={(e) => setCoset(e.target.value)}
              />
              <p className="p-2 font-semibold">VND</p>
            </div>

            <div className="flex">
              <p className="p-2 font-semibold">Discount: </p>
              <p className="w-full p-2 mb-4 border rounded bg-white">
                {price && cost
                  ? (
                      ((Number(price) - Number(cost)) / Number(price)) *
                      100
                    ).toFixed(2)
                  : "0.00"}
              </p>
              <p className="p-2 font-semibold">%</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Organize</h2>
            <div className="flex items-center mb-4">
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value={0}>Select Category</option>
                {categorySelect(categories)}
              </select>

              <Link
                to={"/admin/category/create"}
                className="ml-2 p-2 bg-blue-600 text-white rounded-xl"
              >
                +
              </Link>
            </div>

            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value={0}>Select Brand</option>
            </select>

            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            >
              <option value={true}>Publish</option>
              <option value={false}>Hidden</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
