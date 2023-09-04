const userModel = require("../models/userModel")
const tickModel = require("../models/ticketModel")
const ticketsModel = require("../models/ticketsModel")
const cloudinary = require("../utils/cloudinaryConfig")
const bcryptjs = require("bcryptjs");
const { generateToken, verifyToken } = require("../services/sessionService");
const seatsModel = require("../models/seatsModel");
const transactModel = require("../models/transactionModel");


const signup = async (req, res, next)=>{
    try {
        const {firstName, lastName , email, password} = req.body;

        const checkExistingDetails = await userModel.findOne({
            $or:[{email: email} ]
        })
        if (checkExistingDetails) {
            return res.status(409).send({ message: "Email already in use", status: false })
        }
        const result = await userModel.create({ firstName, lastName, email, password })
        if (!result) {
            return res.status(500).send({ message: "Error creating your account, please try again" })
        }
        if(!checkExistingDetails){
            sendMail(email, firstName)
            return res.status(201).send({ message: "Account created successfully", status: true })
           }
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

const signIn = async (req, res, next) => {
    try {
        const {  email, password } = req.body;
        const result = await userModel.findOne({
            $or: [{ email: email }]
        })
        console.log(result, 33)
        if (!result) {
            return res.status(404).send({ message: "Account does not exist, try creating one", status: false })
        }
        const compare = await bcryptjs.compare(password, result.password)
        console.log(compare)
        if (!compare) {
            return res.status(409).send({ message: "Invalid password", status: false })
        }
        const email2 = result.email
        const token = generateToken(email2)
        return res.status(200).send({ message: `Welcome ${result.firstName}`, status: true, token })

    } catch (error) {
        console.log(error)
        next(error)
    }
}
const imageUpload = async (req, res, next) => {
    const { files } = req.body
    try {
        // console.log(files)
        const result = await cloudinary.uploader.upload(files)
        // console.log(result)
        const image_url = result.secure_url
        const public_id = result.public_id
        return res.status(200).send({message:"Upload successful", status:true, secure_url: image_url})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const verifyUserToken = async (req, res, next) => {
    try {
        const auth = req.headers.authorization
        const token = auth.split(' ')[1]
        if (!token) {
            return res.status(401).send({ message: "Unauthorized", status: false })
        }
        const userEmail = verifyToken(token)
        const checkUser = await userModel.findOne({ email: userEmail })
        console.log(checkUser)
        if (checkUser){
            return res.status(200).send({ message: "Verification successful", checkUser,  status: true })

        }
        if (!checkUser) {
            return res.status(401).send({ message: "Unauthorized", status: false })
        }
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
 const createTicket = async (req, res) => {
    try {
        const { ticketName, ticketPic, ticketLocation } = req.body;
        console.log(ticketName, ticketPic, ticketLocation)

        // Check if a ticket with the same ticketName already exists
        const existingTicket = await tickModel.findOne({ ticketName });

        if (existingTicket) {
            return res.status(400).send({ message: 'Ticket with the same name already exists' });
        }

        const newTicket = await tickModel.create({ ticketName, ticketPic, ticketLocation });
        res.status(201).send({message: "ticket created"});
    } catch (error) {
        res.status(500).send({ message: 'Failed to create ticket' });
    }
};

// Create a new concert
const createConcert = async (req, res) => {
    try {
        const { owner, consertMonth, concertDay, tour, time, venue, city } = req.body;
        const newConcert = await ticketsModel.create({ owner, consertMonth,  tour, concertDay, time, venue, city });
        res.status(201).send({message: "ticket created"});
    } catch (error) {
        res.status(500).send({ message: 'Failed to create concert' });
    }
};

const createSeat = async (req, res) => {
    try {
        const { section, owner, venue, row, price } = req.body;
        // console.log(section, owner, venue, row, price)
        const newSeat = await seatsModel.create({ section, owner, venue, row, price });
        res.status(201).send({message: "seat created"});
    } catch (error) {
        res.status(500).send({ message: 'Failed to create seat' });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await tickModel.find();
        res.status(200).send({tickets});
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch tickets' });
    }
};

// Get a single ticket by ID
const getTicketById = async (req, res) => {
    const { id } = req.body
    // console.log(id)
    try {
        const ticket = await tickModel.findOne({ticketName: id});

        // console.log(ticket)
        if (!ticket) {
            return res.status(404).send({ message: 'Ticket not found' });
        }
        return res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch ticket' });
    }
};
const getEvents = async (req, res, next)=>{
    const {id} = req.body
    try {
        const events = await ticketsModel.find({owner: id})
        if (!events){
            return res.status(404).send({message: "No events available"})
        }
        return res.status(200).send(events)
    } catch (error) {
        res.status(500).send({message: "error"})
    }

}

const getConcert = async (req, res, next)=>{
    const id = req.params.id
    try {
        const event = await ticketsModel.findOne({_id: id})
        if(!event){
            return res.status(404).send({message: "Ticket not found"})
        }
        return res.status(200).send(event)
    } catch (error) {
        res.status(500).send({message: "internal server error"})
    }
}
const getSeats = async (req, res, next)=>{
    const { owner, venue } = req.body
    // console.log(owner)
    try {
        const seats = await seatsModel.find({owner, venue})
        
        if (!seats){   
            return res.status(404).send({message: "seats not found"})

        }
        return res.status(200).send(seats)

    } catch (error) {
        res.status(500).send({message: "internal server error"})
    }
}

const getSeatsById = async (req, res, next)=>{
    const {el} = req.body
    console.log(el)
    try {
        const seat = await seatsModel.findOne({_id: el})
        if(!seat){
            return res.status(404).send({message: "seat not found"})

        }
        return res.status(200).send(seat)
    } catch (error) {
        res.status(500).send({message: "Internal server errror"})
    }

}

// Update a ticket by ID
const updateTicketById = async (req, res) => {
    try {
        const { ticketName, ticketPic, ticketLocation } = req.body;
        const updatedTicket = await tickModel.findByIdAndUpdate(
            req.params.id,
            { ticketName, ticketPic, ticketLocation },
            { new: true }
        );
        if (!updatedTicket) {
            return res.status(404).send({ message: 'Ticket not found' });
        }
        res.status(200).send(updatedTicket);
    } catch (error) {
        res.status(500).send({ message: 'Failed to update ticket' });
    }
};

// Delete a ticket by ID
const deleteTicketById = async (req, res) => {
    try {
        const deletedTicket = await tickModel.findByIdAndDelete({_id: req.params.id});
        if (!deletedTicket) {
            return res.status(404).send({ error: 'Ticket not found' });
        }
        res.status(200).send({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete ticket' });
    }
};

const postTicket = async (req,res, next)=>{
    try {
        const {artist, price, receipt} = req.body
        console.log(artist, price, receipt)
        const transact = await transactModel.create({artist, price, receipt})
        res.status(201).send({message: "Transaction successful"});
    } catch (error) {
        res.status(500).send({ message: 'Transaction Failed' });
    }
}


module.exports = {signup, signIn, verifyUserToken, postTicket, getConcert, imageUpload, getSeatsById, getSeats, createTicket, getEvents, createConcert, createSeat, getAllTickets, getTicketById, updateTicketById, deleteTicketById}
