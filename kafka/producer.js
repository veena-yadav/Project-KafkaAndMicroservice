const { Kafka } = require("kafkajs");
const nodemailer = require("nodemailer");

const kafka = new Kafka({
  clientId: "kafkaex",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
producer.connect();
module.exports = function (message) {
  //   console.log(message);
  var a = JSON.parse(message);
  //console.log(a[1].itemName)
  var ar = [];

  //var n=message.length;
  //console.log(n)
  for (let it in a) {
    var m1 = a[it].itemName;
    ar.push(m1);
  }
  //console.log(ar)

  const msg = {
    from: "telstrakafkanetworking2@gmail.com",
    to: "kamatsayush@gmail.com",
    subject: "Reordering.....",
    text: "Reorder Below medicines ",
    html: "<b>Below medicines are low in stock:   <br/>" + ar + "</b>",
  };

  producer.send({
    topic: "reorder",
    messages: [
      {
        value: JSON.stringify(ar),
        data: nodemailer
          .createTransport({
            service: "gmail",
            auth: {
             user: "telstrakafkanetworking2@gmail.com",
              pass: "yznqnswnzohcdisw",
              //  user: process.env.EID,
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
};
