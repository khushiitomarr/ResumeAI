import express from "express";
import{
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from '../controllers/resumeControllers.js';
import verifyUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, createResume);

router.get("/", verifyUser, getResumes);

router.get("/:id", verifyUser, getResumeById);

router.put("/:id", verifyUser, updateResume);

router.delete("/:id", verifyUser, deleteResume);

export default router;