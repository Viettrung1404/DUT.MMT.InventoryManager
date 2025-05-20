import { Router } from "express";
import * as inventoryController from "../controllers/inventory.controller.js";
import { ValidateMiddleware } from "../middlewares/validate.middleware.js";
import { VerifyMiddleware } from "../middlewares/verify.middleware.js";

const router = Router();

router.get("/",
  VerifyMiddleware.validateToken,
  inventoryController.getInventory);

router.get(
  "/:id",
  ValidateMiddleware.validateId,
  VerifyMiddleware.validateToken,
  inventoryController.getProductById
);

router.post("/", 
  ValidateMiddleware.validateCreateProduct,
  VerifyMiddleware.validateToken,
  inventoryController.createProduct);

router.put(
  "/:id",
  ValidateMiddleware.validateId,
  ValidateMiddleware.validateUpdateProduct,
  VerifyMiddleware.validateToken,
  inventoryController.updateProduct);

router.delete("/:id", 
  ValidateMiddleware.validateId,
  VerifyMiddleware.validateToken,
  inventoryController.deleteProduct);

export default router;