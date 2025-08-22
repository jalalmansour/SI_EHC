// src/routes/budget.routes.js
import { Router } from "express";
import { budgetController } from "@controllers/budget.controller";
import { authenticateUser } from "../middlewares/authenticationMiddleware";
import { authorizeUser } from "../middlewares/authorizationMiddleware";
import { validateBody, validateParams } from "../middlewares/validationMiddleware";
import budgetSchema from "../validations/budget.schema";
import { z } from "zod";

const router = Router();

// We can now re-enable these as the file paths are fixed.
router.use(authenticateUser);

console.log("Budget routes loaded");
router.get("/", 
    authorizeUser('budgets:read'), 
budgetController.getAllBudgets);

router.get("/:id",
    authorizeUser('budgets:read'),
 validateParams(z.object({ id: z.string() })),
 budgetController.getBudgetById);

router.post(
  "/",
authorizeUser('budgets:create'),
  validateBody(budgetSchema.create),
  budgetController.createBudget
);

router.put(
  "/:id",
authorizeUser('budgets:update'),
  validateParams(z.object({ id: z.string() })),
  validateBody(budgetSchema.update),
  budgetController.updateBudget
);

router.delete("/:id",
    authorizeUser('budgets:delete'),
      validateParams(z.object({ id: z.string() })), 
      budgetController.deleteBudget);

export default router;