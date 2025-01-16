import express, { Request, Response } from "express";
import mongoose, { Document } from "mongoose";
import { Category, ICategory } from "../../models/category";
import { Item, ItemProps } from "../../models/item";
import { isAuthenticated } from "../../utils/auth";
import { extractToken } from "../../utils/middleware";

const designRouter = express.Router();

interface IDbCategory extends Document, ICategory {}

designRouter.get("/categories", async (req: Request, res: Response) => {
  const categories = await Category.find({}).populate("categories");
  const { id } = req.query;
  const result = id
    ? categories.find((c) => String(c._id) === id)
    : categories.filter((c) => !c.parent);
  if (!result) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  res.status(200).json(result);
});

designRouter.post(
  "/categories",
  async (req: Request<{}, {}, ICategory>, res: Response) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const { name, img, categories, items } = req.body;
    await new Category({
      name: name.split(" ").join("_").toLowerCase(),
      img,
      categories,
      items,
    }).save();
    res.status(204).json({ message: "success" });
  }
);

designRouter.delete("/:key", async (req: Request, res: Response) => {
  if (!isAuthenticated(extractToken(req))) {
    res.status(400).json({ error: "invalid token" });
    return;
  }
  const { key } = req.params;
  const temp = await Category.findOne({ name: key });
  if (!temp) {
    res.status(404).json({ error: "no such category found" });
    return;
  }
  for (const categoryId of temp.categories) {
    await Category.findByIdAndDelete(categoryId);
  }
  for (const itemId of temp.items) {
    await Item.findByIdAndDelete(itemId);
  }
  await temp.deleteOne();
  res.status(204).json({ message: "successfully deleted" });
});

designRouter.get("/:key/categories", async (req: Request, res: Response) => {
  const { key } = req.params;
  const { id } = req.query;
  const temp = await Category.findOne({ name: key });
  if (!temp) {
    res.status(404).json({ error: "no such category found" });
    return;
  }
  const currentCategory = await temp?.populate("categories");
  const result = id
    ? currentCategory.categories.find((c) => String(c._id) === id)
    : currentCategory.categories;
  if (!result) {
    res.status(400).json({ error: "Bad request" });
    return;
  }
  res.status(200).json(result);
});

designRouter.get("/:key/items", async (req: Request, res: Response) => {
  const { key } = req.params;
  const temp = await Category.findOne({ name: key });
  if (!temp) {
    res.status(404).json({ error: "no such category found" });
    return;
  }
  res.status(200).json((await temp.populate("items")).items);
});

designRouter.post(
  "/:key/categories",
  async (req: Request<{ key: string }, {}, ICategory>, res: Response) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const { key } = req.params;
    const currentCategory = await Category.findOne({
      name: key,
    });
    if (!currentCategory) {
      res.status(404).json({ error: "no such category found" });
      return;
    }

    const category = await new Category({
      ...req.body,
      name: req.body.name.split(" ").join("_").toLowerCase(),
      parent: currentCategory._id,
    }).save();

    currentCategory.categories = [...currentCategory.categories, category._id];
    await currentCategory.save();
    res.status(200).json(category);
  }
);

designRouter.delete(
  "/:category1/:category2",
  async (
    req: Request<{ category1: string; category2: string }>,
    res: Response
  ) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const { category1, category2 } = req.params;
    const currentCategory = await Category.findOne({
      name: category2,
    });
    const parentCategory = await Category.findOne({
      name: category1,
    });

    if (
      !currentCategory ||
      (parentCategory &&
        String(parentCategory._id) !== String(currentCategory.parent))
    ) {
      res.status(404).json({ error: "no such category found" });
      return;
    }
    for (let itemId of currentCategory.items) {
      await Item.findByIdAndDelete(itemId);
    }
    await currentCategory.deleteOne();
    res.status(204).json({ message: "successfully deleted" });
  }
);

designRouter.get(
  "/:category1/:category2/items",
  async (
    req: Request<{ category1: string; category2: string }>,
    res: Response
  ) => {
    const { category1, category2 } = req.params;
    const currentCategory = await Category.findOne({
      name: category2,
    });
    const parentCategory = await Category.findOne({
      name: category1,
    });

    if (
      !currentCategory ||
      (parentCategory &&
        String(parentCategory._id) !== String(currentCategory.parent))
    ) {
      res.status(404).json({ error: "no such category found" });
      return;
    }
    res.status(200).json((await currentCategory.populate("items")).items);
  }
);

designRouter.post(
  "/:category1/:category2/items",
  async (
    req: Request<{ category1: string; category2: string }, {}, ItemProps>,
    res: Response
  ) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const { category1, category2 } = req.params;
    const currentCategory = await Category.findOne({
      name: category2,
    });
    const parentCategory = await Category.findOne({
      name: category1,
    });

    if (
      !currentCategory ||
      (parentCategory &&
        String(parentCategory._id) !== String(currentCategory.parent))
    ) {
      res.status(404).json({ error: "no such category found" });
      return;
    }

    const existedItem = req.body.id && (await Item.findById(req.body?.id));

    if (existedItem) {
      existedItem.title = req.body.title;
      existedItem.img = req.body.img;
      existedItem.rating = req.body.rating;
      existedItem.info = req.body.info;
      existedItem.links = req.body.links;
      await existedItem.save();
      res.status(200).send({ message: "successfully updated" });
      return;
    }

    const item = await new Item({
      ...req.body,
      category: currentCategory._id,
    }).save();
    currentCategory.items = [...currentCategory.items, item._id];
    if (parentCategory) {
      parentCategory.items = [...parentCategory.items, item._id];
    }
    await Promise.all([
      currentCategory.save(),
      parentCategory && parentCategory.save(),
    ]);

    // Respond with the created item
    res.status(201).json({ message: "Item created successfully", item });
  }
);

designRouter.get("/items", async (req: Request, res: Response) => {
  const items = await Item.find({});
  res.status(200).json(items);
});

// delete specific item
designRouter.delete(
  "/items/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    if (!(await isAuthenticated(extractToken(req)))) {
      res.status(400).json({ error: "invalid token" });
      return;
    }
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ error: "no such an item found" });
      return;
    }
    let category: mongoose.Types.ObjectId | null = item?.category;
    while (category) {
      const tempCategory = (await Category.findById(category)) as IDbCategory;
      if (tempCategory) {
        tempCategory.items = tempCategory.items.filter(
          (id) => String(id) !== String(item._id)
        );
        await tempCategory.save();
      }
      category = tempCategory?.parent;
    }
    await item.deleteOne();
    res.status(204).json({ message: "successfully deleted" });
  }
);

export default designRouter;
