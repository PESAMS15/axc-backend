const express = require("express")
const { signup, signIn, createTicket, createConcert, createSeat, getAllTickets, getTicketById, updateTicketById, deleteTicketById, verifyUserToken, imageUpload, getEvents, getConcert, getSeats, getSeatsById, post, postTicket } = require("../controllers/userController")
const { validate } = require("../middlewares/validator")
const { userValidationSchema } = require("../middlewares/userValidationSchema")


const userRouter = express.Router()

userRouter.post("/signup", validate(userValidationSchema), signup)
userRouter.post("/signin", signIn)
userRouter.post("/tick", createTicket)
userRouter.post("/post", postTicket)
userRouter.post("/tickets", createConcert)
userRouter.get("/verify", verifyUserToken)
userRouter.post("/seats", createSeat)
userRouter.post("/upload", imageUpload)
userRouter.get("/alltick",  getAllTickets)
userRouter.post("/oneticket",  getTicketById)
userRouter.post("/events", getEvents)
userRouter.post("/seat", getSeats)
userRouter.post("/getseat", getSeatsById)
userRouter.get("/event/:id", getConcert)
userRouter.post("/updateticket",  updateTicketById)
userRouter.post("/deleteticket",  deleteTicketById)

module.exports = userRouter