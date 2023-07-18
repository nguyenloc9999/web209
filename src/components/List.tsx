/* import ProductContext from "@/context/Product.tsx";
import { useContext, useEffect } from "react";

const List = () => {
    const { products, fetchProducts, addProduct, deleteProduct, updateProduct } = useContext(
        ProductContext
    ) as any;
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div>
            {products.map((item: any) => {
                return (
                    <div key={item.id}>
                        {item.name}
                        <button onClick={() => deleteProduct(item.id!)}>Delete</button>
                        <button
                            onClick={() =>
                                updateProduct({ name: "Product C updated", id: item.id })
                            }
                        >
                            Edit
                        </button>
                    </div>
                );
            })}
            <button onClick={() => addProduct({ name: "Product C" })}>Add</button>
        </div>
    );
};

export default List; */





import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const List = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state: any) => state.products);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/products");
                dispatch({ type: "products/fetchProducts", payload: data });
            } catch (error) { /* empty */ } finally { /* empty */ }
        };
        fetchProducts();
    }, []);

    const addProduct = async (product: any) => {
        try {
            // call api
            const { data } = await axios.post("http://localhost:3000/products", product);
            // rerender
            dispatch({ type: "products/addProduct", payload: data });
        } catch (error) { /* empty */ }
    };
    const updateProduct = async (product: any) => {
        try {
            // call api
            const { data } = await axios.put(
                "http://localhost:3000/products/" + product.id,
                product
            );
            console.log("data", data);
            // rerender
            dispatch({ type: "products/updateProduct", payload: data });
        } catch (error) { /* empty */ }
    };
    const deleteProduct = async (id: any) => {
        try {
            // call api
            await axios.delete("http://localhost:3000/products/" + id);
            // rerender
            dispatch({ type: "products/deleteProduct", payload: id });
        } catch (error) { /* empty */ }
    };
    return (
        <div>
            {products?.map((item: any) => {
                return <div key={item.id}>{item.name}</div>;
            })}
            <button className="border bg-blue-500 p-2" onClick={() => addProduct({ name: "test" })}>
                Add Product
            </button>
            <button
                className="border bg-blue-500 p-2"
                onClick={() => updateProduct({ name: "test updated", id: 3 })}
            >
                Update Product
            </button>
            <button className="border bg-blue-500 p-2" onClick={() => deleteProduct(3)}>
                Delete Product
            </button>
        </div>
    );
};

export default List;