import { Router } from "express";
import { products } from "../static/products.js";

const router = Router();

router.get("/api/products", (req, res) => {
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res
      .status(200)
      .send(products.filter((product) => product[filter].includes(value)));

  res.status(200).send(products);
});

router.get("/api/products/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const selectedProduct = products.find((product) => product.id === parsedId);
  res.status(200).send(selectedProduct);
});

router.post("/api/products", (req, res) => {
  const { body } = req;

  const newProductId = products[products.length - 1].id + 1;
  const newProduct = { id: newProductId, ...body };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

router.put("/api/products/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const selectedProductIndex = products.findIndex(
    (product) => product.id === parsedId
  );

  products[selectedProductIndex] = { id: selectedProductIndex + 1, ...body };
  res.sendStatus(200);
});

router.patch("/api/products/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const selectedProductIndex = products.findIndex(
    (product) => product.id === parsedId
  );

  products[selectedProductIndex] = {
    ...products[selectedProductIndex],
    ...body,
  };
  res.sendStatus(200);
});

router.delete("/api/products/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const selectedProductIndex = products.findIndex(
    (product) => product.id === parsedId
  );
  products.splice(selectedProductIndex, 1);
  res.sendStatus(200);
});

export default router;
