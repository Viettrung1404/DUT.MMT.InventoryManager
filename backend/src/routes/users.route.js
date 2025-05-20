import { Router } from "express";
import * as userController from "../controllers/users.controller.js";
import { ValidateMiddleware } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", userController.getAllUsers);

router.get(
  "/:id",
  ValidateMiddleware.validateId,
  userController.getUserById
);

router.post("/", 
  ValidateMiddleware.validateCreateUser,
  userController.createUser);

router.put(
  "/:id",
  ValidateMiddleware.validateId, 
  userController.updateUser);

router.delete("/:id", 
  ValidateMiddleware.validateId,
  userController.deleteUser);

export default router;