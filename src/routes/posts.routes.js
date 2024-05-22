import { Router } from "express";
import { prisma } from "../db.js";

export const router = Router();

router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const postFindById = await prisma.post.findUnique({
    where: { id },
  });
  res.json(postFindById);
});

router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const postCreate = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  res.json(postCreate);
});

router.put("/:id", async (req, res) => {
  const id = +req.params.id;
  const { title, content } = req.body;
  const postUpdate = await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
    },
  });
  res.json(postUpdate);
});

router.delete("/:id", async (req, res) => {
  const id = +req.params.id;
  const postDelete = await prisma.post.delete({
    where: { id },
  });
  res.json(postDelete);
});
