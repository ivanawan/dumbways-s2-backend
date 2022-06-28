const {User,Profile} = require("../models/index-model");
const Chat= require("../models/chat");
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

let connectedUser = {}

const socketIo = (io) => {
  
    io.use((socket, next) => {
        if (socket.handshake.auth && socket.handshake.auth.token ) {
            // jwt.verify(socket.handshake.auth.token,"86eb7ad1792dc09c02626f6b9ec543c15e3bd7b345152769de955793321510fed36078e83749604b8b5a7164296a80d90506ea189ff54b336827a76eb7a8b801", (err, user) => {
            //     if (err) next(new Error("Not Authorized"));
            //      data =user;
                next();
            // })
        } else {
          next(new Error("Not Authorized"));
        }
      });
     
  
       
     

    io.on('connection', (socket) => {
      console.log('client connect', socket.id);
      // console.log('data user :',data.id);

      const {id:idUser} =jwt.verify(socket.handshake.auth.token,"86eb7ad1792dc09c02626f6b9ec543c15e3bd7b345152769de955793321510fed36078e83749604b8b5a7164296a80d90506ea189ff54b336827a76eb7a8b801");
      connectedUser[idUser] = socket.id

      socket.on("load ADMIN contact", async () => {
        try {
          const adminContact = await User.findAll({
            where: {
              status: "ADMIN"
            },
            include:{ model: Profile, as: "Profil" ,attributes:["phone","gender","image","address"]},
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          });
      console.log(adminContact);
        // emit event to send admin data on event “admin contact”
        socket.emit("ADMIN contact", adminContact)
        } catch (err) {
          console.log(err)
        }
      })

      socket.on("load MEMBER contact", async () => {
        try {
          const adminContact = await User.findAll({
            where: {
              status: "MEMBER"
            },
            include:{ model: Profile, as: "Profil" ,attributes:["phone","gender","image","address"]},
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          });
       
        // emit event to send admin data on event “admin contact”
        socket.emit("MEMBER contact", adminContact)
        } catch (err) {
          console.log(err)
        }
      })

      socket.on("load messages", async (payload) => {
        const idRecipient = payload;
        const idSender = idUser;
  
        const data = await Chat.findAll({
          where: {
            idsender: {
              [Op.or]: [idRecipient,idSender]
            },
            idreceiver: {
              [Op.or]: [idRecipient,idSender]
            },
          },
          attributes: {
            exclude: ['createdAt','updatedAt', 'idRecipient', 'idSender']
          },
          order: [['createdAt','ASC']]
        })
  
        socket.emit('messages',data)
      })

      socket.on("send message", async (payload) => {
        // console.log( payload);
        try {
          const { chat, idreceiver } = payload       
          
          await Chat.create({
            chat,
            idreceiver,
            idsender: idUser
          })
          
          io.to(socket.id).to(connectedUser[idreceiver]).emit("new message")
        } catch (error) {
          console.log(error)
        }
      })    

      socket.on('disconnect', () => {
        console.log('client disconnect', socket.id);
      })
  
    })
  }
  
  module.exports = socketIo