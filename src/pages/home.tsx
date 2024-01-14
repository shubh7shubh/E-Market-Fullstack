import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"
import { useLatestProductsQuery } from "../redux/api/productAPI"
import toast from "react-hot-toast"
import Loader, { Skeleton } from "../components/loader"

const Home = () => {


    const { data, isLoading, isSuccess, error, isError } = useLatestProductsQuery("")

    const addToCartHandler = () => {

    }

    if (isError) toast.error("Cannot Fetch the Products")

    return (
        <div className="home">
            <section></section>

            <h1>
                Latest Products
                <Link to="/search" className="findmore">
                    More
                </Link>
            </h1>

            <main>
                {isLoading ? <Skeleton width="80vw" /> : data?.products.map((i) => (
                    <ProductCard
                        key={i._id}
                        productId={i._id}
                        name={i.name}
                        price={i.price}
                        photo={i.photo}
                        stock={i.stock}
                        handler={addToCartHandler} />
                ))}
            </main>
        </div>
    )
}
export default Home