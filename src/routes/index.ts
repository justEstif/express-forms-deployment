import { Router } from "express"

const router = Router()

/* GET users listing. */
router.get("/", function (_, res, __) {
  res.render("index", { title: "Express" })
})

export default router
