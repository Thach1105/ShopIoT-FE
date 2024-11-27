import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getProductBySlug } from "../../../../services/apiProduct";
import Loading from "../../../../utils/Loading";
import { formatNumber } from "../../../../utils/format";
import SpecificationTable from "./SpecificationTable";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import ProductReview from "./ProductReview";
import { addProductToCart, themVaoGioHang } from "../../../../services/apiCart";

// Components
const StarRating = ({ rating }) => (
  <div className="flex items-center mt-2">
    <div className="text-yellow-500">
      {[...Array(5)].map((_, index) => (
        <i key={index} className="fas fa-star"></i>
      ))}
    </div>
    <div className="ml-2 text-gray-500">{rating} review</div>
  </div>
);

const QuantitySelector = ({ quantity, onIncrease, onDecrease, onChange }) => (
  <div className="mt-4">
    <span className="font-bold">Quantity:</span>
    <div className="flex items-center mt-2">
      <button
        onClick={onDecrease}
        className="px-2 py-1 border border-gray-300 hover:bg-gray-100"
      >
        -
      </button>
      <input
        type="text"
        value={quantity}
        onChange={onChange}
        className="w-12 py-1 text-center border border-gray-300 mx-2"
      />
      <button
        onClick={onIncrease}
        className="px-2 py-1 border border-gray-300 hover:bg-gray-100"
      >
        +
      </button>
    </div>
  </div>
);

function ProductPage() {
  const location = useLocation();
  const { slug } = useParams();
  const { state } = location;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();
  console.log(product);

  useEffect(() => {
    if (!state) {
      async function fetchProduct() {
        const response = await getProductBySlug(slug);
        const { data } = response;
        setProduct(data?.content);
      }

      fetchProduct();
    } else {
      setProduct(state);
    }
  }, [slug, state]);

  // Handlers
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(Math.max(1, value));
  };

  async function handleAddToCart() {
    const reqBody = {
      product_id: product.id,
      quantity,
    };
    await addProductToCart(reqBody);
  }

  async function testFunc() {
    const response = await themVaoGioHang();
    console.log(response);
  }

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

  return product ? (
    <div className="flex gap-6">
      <div className="flex-1 my-2 ">
        <ProductImage imageUrl={product.image_url} altText={product.name} />

        {/* Mô tả */}
        <div className="p-4 shadow-xl mt-6 rounded-md">
          <h1 className="font-semibold text-xl text-blue-900">Mô Tả</h1>
          {product.longDescription && (
            <ProductDescription description={product.longDescription} />
          )}
        </div>

        {/* Thông số sản phẩm */}
        <div className="p-4 shadow-xl mt-6 rounded-md space-y-2">
          <h1 className="font-semibold text-xl text-blue-900">
            Thông số kỹ thuật
          </h1>
          {product.productDetails && (
            <SpecificationTable productDetails={product.productDetails} />
          )}
        </div>

        {/* Bình luận */}
        <div className="p-4 shadow-xl mt-6 rounded-md">
          <h2 className="text-xl font-medium mb-4">Đánh giá & nhận xét</h2>
          <ProductReview productId={product.id} />
        </div>
      </div>

      <div className="w-2/5 my-2 sticky top-4 h-fit">
        <div className="shadow-lg p-4">
          <h1 className="text-2xl font-bold text-blue-900">{product.name}</h1>
          <div className="text-red-600 font-bold mt-2 bg-gradient-to-r from-lime-500 to-green-500 w-fit p-1 rounded-md">
            {`Giảm ${product.discountPercentage}%`}
          </div>
          <div className="text-gray-500">{`SKU: ${product.sku}`}</div>

          <StarRating rating={1} />

          <div className="mt-4">
            <span className="text-red-600 text-2xl font-bold">
              {formatNumber(product.cost)} đ
            </span>
            <span className="text-gray-500 line-through ml-2">
              {formatNumber(product.price)} đ
            </span>
          </div>

          <div className="mt-4">
            <span className="text-green-600 font-bold">
              {`Còn ${product.stock} sản phẩm, sẵng sàng vận chuyển`}
            </span>
          </div>

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onChange={handleQuantityChange}
          />

          <div className="mt-4 flex justify-between">
            <button
              onClick={handleAddToCart}
              className="bg-blue-400 w-1/2 font-semibold text-white px-4 py-2 mr-2 hover:bg-blue-700/80 transition-colors"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              onClick={testFunc}
              className="bg-red-500 w-1/2 text-white font-semibold px-4 py-2 hover:bg-red-700/80 transition-colors"
            >
              Mua ngay
            </button>
          </div>
        </div>

        {/* Thanh toán */}
        <div className="p-4 mt-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-semibold text-lg text-blue-900">Thanh Toán</h1>
            <i className="fas fa-lock text-gray-500"></i>
          </div>

          <div className="mb-4">
            <h2 className="text-sm text-gray-600 mb-2">
              Phương thức thanh toán
            </h2>
            <div className="flex gap-2">
              <img src="/visa.png" alt="Visa" className="h-8" />
              <img src="/mastercard.png" alt="Mastercard" className="h-8" />
              <img src="/amex.png" alt="American Express" className="h-8" />
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Thông tin thanh toán của bạn được xử lý an toàn. Chúng tôi không lưu
            trữ chi tiết thẻ tín dụng cũng như không có quyền truy cập vào thông
            tin thẻ tín dụng của bạn.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

// PropTypes

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ProductPage;