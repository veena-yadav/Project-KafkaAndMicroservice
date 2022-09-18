const { Kafka } = require("kafkajs");
const nodemailer = require("nodemailer");

const kafka = new Kafka({
  clientId: "kafkaex",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
producer.connect();
module.exports = function (message) {

  var a = JSON.stringify(message)

  //  console.log("msg"+message[0]);
  for (let i = 1; i < message.length; i++) {


    const msg = {
      from: "telstrakafkanetworking2@gmail.com",
      to: message[i],
      subject: "Vicks ki goli lo hich khich dur kro",
      text: "Reorder Below medicines ",
      html: "<b>Bhailog medicine " + message[0] + " available hai...<br/></b>",
    };

    producer.send({
      topic: "notification",
      messages: [
        {
          value: a,
          data: nodemailer
            .createTransport({
              service: "gmail",
              auth: {
                 user: "telstrakafkanetworking2@gmail.com",
                pass: "yznqnswnzohcdisw",
                // user: process.env.EID,
                // pass: process.env.PASS,
                port: 465,
                host: "smtp.gmail.com",
              },
            })
            .sendMail(msg, (err) => {
              if (err) return console.log("error", err);
              else return console.log("sent");
            }),
        },
      ],
    });
  }
};