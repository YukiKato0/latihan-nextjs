import { useState, useMemo } from "react";
import {
  initialCategories,
  Products as initialProducts,
} from "../mock/isiProducts";
import { IProducts, ProductsFormData } from "@/types/products.type";

export default function useProductsPage() {
  const [products, setProducts] = useState<IProducts[]>(initialProducts);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<IProducts | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const getSubCategories = (catId: string): string[] => {
    const found = initialCategories.find((c) => c.id === catId);
    return found ? found.subCategories : [];
  };

  const defaultCategory = initialCategories[0]?.id || "";
  const defaultSubCategory = getSubCategories(defaultCategory)[0] || "";

  const [formData, setFormData] = useState<ProductsFormData>({
    name: "",
    price: 0,
    rating: 0,
    reviewsCount: 0,
    category: defaultCategory,
    subCategory: defaultSubCategory,
    image: "",
    description: "",
    isBestSeller: false,
  });

  const handleShowModal = (product?: IProducts | null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || "",
        price: product.price ?? "",
        rating: 0,
        reviewsCount: 0,
        category: product.category || defaultCategory,
        subCategory: product.subCategory || "",
        image: product.image || "",
        description: product.description || "",
        isBestSeller: Boolean(product.isBestSeller),
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: 0,
        rating: 0,
        reviewsCount: 0,
        category: defaultCategory,
        subCategory: defaultSubCategory,
        image: "",
        description: "",
        isBestSeller: false,
      });
    }
    setShowModal(true);
  };

  const handleCategoryChangeInForm = (newCategory: string) => {
    const subCategories = getSubCategories(newCategory);
    setFormData((prev) => ({
      ...prev,
      category: newCategory,
      subCategory: subCategories[0] || "",
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                price: Number(formData.price) || 0,
                category: formData.category,
                subCategory: formData.subCategory,
                image: formData.image,
                description: formData.description,
                isBestSeller: formData.isBestSeller,
              }
            : p
        )
      );
    } else {
      const newProduct: IProducts = {
        id: `prod-${Date.now()}`,
        name: formData.name,
        price: Number(formData.price) || 0,
        rating: 0,
        reviewsCount: 0,
        category: formData.category,
        subCategory: formData.subCategory,
        image: formData.image,
        description: formData.description,
        isBestSeller: formData.isBestSeller,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    setShowModal(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  return {
    showModal,
    setShowModal,
    handleShowModal,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    editingProduct,
    formData,
    setFormData,
    getSubCategories,
    handleCategoryChangeInForm,
    handleSaveProduct,
    handleDeleteProduct,
    filteredProducts,
    formatRupiah,
  };
}
