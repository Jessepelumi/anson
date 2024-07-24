import { Router } from "express";
import "../strategies/local_strategy.js";
import passport from "passport";

const router = Router();

router.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(201);
});

router.get("/api/auth/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

router.post("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);

  req.logout((error) => {
    if (error) return res.status(400).send("Unable to logout");
    res.sendStatus(200);
  });
});

export default router;
