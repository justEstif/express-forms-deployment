import { Router } from "express"

const router = Router()

// GET home page.
router.get("/", (_, res) => {
  res.redirect("/catalog")
})

export default router
