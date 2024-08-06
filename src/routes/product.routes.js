import { Router } from "express";
import { addProduct, getProduct } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.route("/add").post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    addProduct
  );

router.route("/get").get(getProduct);
// router.route("/getAll").get(getAllCategory);

export default router;
