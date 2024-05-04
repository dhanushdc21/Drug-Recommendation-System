import { Router } from "express";
import { view_products } from "../controllers/cart_admin/view_products.js";
import { add_product } from "../controllers/cart_admin/add_product.js";
import { delete_product } from "../controllers/cart_admin/delete_product.js";
import { edit_product } from "../controllers/cart_admin/edit_product.js";
import { search_product } from "../controllers/search/search.js";


const router = Router();

router.post("/product-items", view_products);

router.post('/add-product', add_product);

router.delete('/delete-product', delete_product);

router.patch("/edit-product", edit_product);

router.post("/search-item", search_product);

export default router;
