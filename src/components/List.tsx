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





import { addProduct, deleteProduct, fetchProducts, updateProduct } from "@/actions/product";
import axios from "axios";
import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const List = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const { products } = useSelector((state: any) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    return (
        <div>
            {products?.map((item: any) => {
                return <div key={item.id}>{item.name}</div>;
            })}
            <button className="border bg-blue-500 p-2" onClick={() => dispatch(addProduct({ name: "test" }))}>
                Add Product
            </button>
            <button
                className="border bg-blue-500 p-2"
                onClick={() => dispatch(updateProduct({ name: "test updated", id: 3 }))}
            >
                Update Product
            </button>
            <button className="border bg-blue-500 p-2" onClick={() => dispatch(deleteProduct(3))}>
                Delete Product
            </button>
        </div>
    );
};

export default List;