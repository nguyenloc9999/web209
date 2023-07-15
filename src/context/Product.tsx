/* import axios from "axios";
import { createContext, useState } from "react";

const ProductContext = createContext([]);

const ProductProvider = ({ children }: any) => {
    const [products, setProducts] = useState([] as any);
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [errorProduct, setErrorProduct] = useState(null);

    const fetchProducts = async () => {
        setIsLoadingProduct(true);
        try {
            const { data } = await axios.get("http://localhost:3000/products");
            setProducts(data);
        } catch (error) {
            setErrorProduct(error.message);
        } finally {
            setIsLoadingProduct(false);
        }
    };
    const addProduct = async (product: any) => {
        const { data } = await axios.post("http://localhost:3000/products", product);
        setProducts([...products, data]);
    };
    const deleteProduct = async (id: any) => {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter((item: any) => item.id !== id));
    };
    const updateProduct = async (product: any) => {
        // call api
        await axios.put(`http://localhost:3000/products/${product.id}`, product);
        //rerender
        setProducts(products.map((item: any) => (item.id === product.id ? product : item)));
    };
    return (
        <ProductContext.Provider
            value={
                {
                    products,
                    setProducts,
                    fetchProducts,
                    addProduct,
                    deleteProduct,
                    updateProduct,
                    errorProduct,
                    isLoadingProduct,
                } as any
            }
        >
            {children}
        </ProductContext.Provider>
    );
};

export { ProductProvider };
export default ProductContext; */




import { createContext, useReducer } from "react";
import { produce } from "immer";

const ProductContext = createContext([]);

const initialState = {
    products: [],
    isLoading: false,
    error: "",
};
const productReducer = (state: any, action: any) => {
    switch (action.type) {
        case "FETCH_PRODUCTS":
            state.products = action.payload;
            return;
        case "ADD_PRODUCT":
            state.products.push(action.payload);
            return;
        case "REMOVE_PRODUCT":
            // eslint-disable-next-line no-case-declarations
            const id = action.payload;
            state.products = state.products.filter((item: any) => item.id !== id);
            return;
        case "UPDATE_PRODUCT":
            // eslint-disable-next-line no-case-declarations
            const product = action.payload;
            state.products = state.products.map((item: any) =>
                item.id === product.id ? product : item
            );
            return;
        default:
            return state;
    }
};

const ProductProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(produce(productReducer), initialState);
    return (
        <ProductContext.Provider value={{ state, dispatch } as any}>
            {children}
        </ProductContext.Provider>
    );
};

export { ProductProvider };
export default ProductContext;