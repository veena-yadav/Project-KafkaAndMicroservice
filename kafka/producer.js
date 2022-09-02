const { Kafka } = require("kafkajs");
const nodemailer=require("nodemailer")

const kafka=new Kafka({
    clientId:"kafkaex",
    brokers:['localhost:9092']
})

const producer = kafka.producer()
producer.connect()
module.exports = function(message) {
console.log(message[0])

    const msg={
        from:"telstrakafkanetworking2@gmail.com",
        to:"deshmukhmanasi9@gmail.com",
        subject:"Reordering.....",
        text:"Reorder Below medicines ",
        html:"<b>"+message+"</b>",
       
    
    }


producer.send({topic:'reorder',messages:[{value:message,data:nodemailer.createTransport({
    service:'gmail',
    auth:{
    // user:"telstrakafkanetworking2@gmail.com",
    //pass:"yznqnswnzohcdisw",
       user:process.env.EID,
       pass:process.env.PASS,
        port:465,
        host:"smtp.gmail.com"
    }
}).sendMail(msg,(err)=>{
    if(err)
    return console.log("error",err)
    else return console.log(msg.text.data.iteName)
})


}]})
}
