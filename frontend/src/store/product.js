import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    
    setProducts: (products) => set({ products }),

    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            const data = await res.json();

            if (res.ok) {
                // Update the products state with the new product
                set((state) => ({
                    products: [...state.products, data.data]
                }));

                return { success: true, message: "Product created successfully." };
            } else {
                return { success: false, message: data.message || "Failed to create product." };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: data.message };
    },

    updateProduct: async (pid, updatedProduct) => {  // Changed function name to updateProduct
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? data.data : product
            ),
        }));
        return { success: true, message: "Product updated successfully." };  // Return success message
    },
}));
