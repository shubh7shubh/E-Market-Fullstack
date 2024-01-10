import { useState } from "react";
import ProductCard from "../components/product-card";

const Search = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const addToCartHandler = () => { }

    const isPrevPage = page > 1
    const isNextPage = page < 4
    return (
        <div className="product-search-page">
            <aside>
                <h2>Filters</h2>
                <div>
                    <h4>Sort</h4>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>

                <div>
                    <h4>Max Price: {maxPrice || ""}</h4>
                    <input
                        type="range"
                        min={100}
                        max={100000}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                </div>

                <div>
                    <h4>Category</h4>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">ALL</option>
                        <option value="">Sample1</option>
                        <option value="">Sample2</option>
                        {/* {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))} */}

                    </select>
                </div>
            </aside>
            <main>
                <h1>Products</h1>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )} */}
                <div className="search-product-list">
                    <ProductCard
                        productId="hjfashkda" name="macbook" price={1999} photo="https://m.media-amazon.com/images/I/71eXNIDUGjL._SX679_.jpg" stock={10} handler={addToCartHandler}
                    />
                </div>

                <article>
                    <button
                        disabled={!isPrevPage}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        Prev
                    </button>
                    <span>
                        {/* {page} of {searchedData.totalPage} */}
                        {page} of {4}
                    </span>
                    <button
                        disabled={!isNextPage}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </article>
                {/* {searchedData && searchedData.totalPage > 1 && (
                    <article>
                        <button
                            disabled={!isPrevPage}
                            onClick={() => setPage((prev) => prev - 1)}
                        >
                            Prev
                        </button>
                        <span>
                            {page} of {searchedData.totalPage}
                        </span>
                        <button
                            disabled={!isNextPage}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </article>
                )} */}
            </main>
        </div>
    )
}
export default Search