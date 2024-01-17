import { FaPlus } from "react-icons/fa"
import { CartItem } from "../types/types";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

// const server = "sjdhfasd"

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="product-card">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          onClick={() =>
            handler({
              productId,
              price,
              name,
              photo,
              stock,
              quantity: 1
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  )
}
export default ProductCard