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





import ProductContext from "@/context/Product.tsx";
import axios from "axios";
import { useContext, useEffect } from "react";

const List = () => {
    const { state, dispatch } = useContext(ProductContext) as any;
    console.log("state", state);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/products");
                dispatch({ type: "FETCH_PRODUCTS", payload: data });
            } catch (error) { /* empty */ } finally { /* empty */ }
        };
        fetchProducts();
    }, []);

    const addProduct = async (product: any) => {
        try {
            // call api
            const { data } = await axios.post("http://localhost:3000/products", product);
            // rerender
            dispatch({ type: "ADD_PRODUCT", payload: data });
        } catch (error) { /* empty */ }
    };
    const updateProduct = async (product: any) => {
        try {
            // call api
            const { data } = await axios.put(
                "http://localhost:3000/products/" + product.id,
                product
            );
            // rerender
            dispatch({ type: "UPDATE_PRODUCT", payload: data });
        } catch (error) { /* empty */ }
    };
    const deleteProduct = async (id: any) => {
        try {
            // call api
            await axios.delete("http://localhost:3000/products/" + id);
            // rerender
            dispatch({ type: "REMOVE_PRODUCT", payload: id });
        } catch (error) { /* empty */ }
    };
    return (
        <div>
            {state?.products.map((item: any) => {
                return <div key={item.id}>{item.name}</div>;
            })}
            <button className="border bg-blue-500 p-2" onClick={() => addProduct({ name: "test" })}>
                Add Product
            </button>
            <button
                className="border bg-blue-500 p-2"
                onClick={() => updateProduct({ name: "test updated", id: 4 })}
            >
                Update Product
            </button>
            <button className="border bg-blue-500 p-2" onClick={() => deleteProduct(4)}>
                Delete Product
            </button>
        </div>
    );
};

export default List;