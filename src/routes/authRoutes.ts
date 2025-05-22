import express from "express";
import passport from "passport";
import { SignIn, SignUp } from "../controllers/auth";

const router = express.Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/signin" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// Facebook OAuth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/signin" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

export default router;
