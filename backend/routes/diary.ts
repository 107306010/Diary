import {
    getDiaries,
    getDiary,
    createDiary,
    updateDiary,
    deleteDiary
  } from "../controllers/diary";
  import express from "express";
  
  const router = express.Router();
  
  // GET /api/cards
  router.get("/", getDiaries);
  
  // GET /api/cards/:id
  router.get("/:id", getDiary);
  
  // POST /api/cards
  router.post("/", createDiary);
  
  // PUT /api/cards/:id
  router.put("/:id", updateDiary);
  
  // DELETE /api/cards/:id
  router.delete("/:id", deleteDiary);
  
  // export the router
  export default router;