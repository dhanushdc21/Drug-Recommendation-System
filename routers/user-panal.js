import { Router } from "express";
import { view_products } from "../controllers/cart_admin/view_products.js";
import { add_to_cart } from "../controllers/cart_user/add_to_cart.js";
import { list_cart } from "../controllers/cart_user/list_cart.js";
import { search_product } from "../controllers/search/search.js";


const router = Router();

router.post("/product-items", view_products);

router.post('/add-to-cart', add_to_cart);

router.post('/list-cart', list_cart);

router.post("/search-item", search_product);

export default router;
