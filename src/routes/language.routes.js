import { Router } from "express";
import { methods as languageController } from "./../controllers/language.controller";
import { verifyToken } from "../middlewares";

const router = Router();

router.get("/", verifyToken, languageController.getLanguages);
router.get("/:id", languageController.getLanguage);
router.post("/", languageController.addLanguage);
router.put("/:id", languageController.updateLanguage);
router.delete("/:id", languageController.deleteLanguage);

export default router;
