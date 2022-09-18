const { Kafka } = require("kafkajs");
const nodemailer = require("nodemailer");

const kafka = new Kafka({
  clientId: "kafkaex",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
producer.connect();
module.exports = function (message) {
  var a = JSON.parse(message);
  if (a.length < 1) {
    console.log("Message is empty");
    return;
  }

  var result = "<table border = 10 style='border-style:hidden;'>";
  for (let it in a) {
    result += "<tr style = 'border-bottom-color:cyan; border-left-color:cyan; border-right-color:cyan; border-top-color:gold'>";
    result += "<td  style = 'font-size:15px; text-align: center; width:200px; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; border-top-right-radius: 5px;'>" + a[it].itemName + "</td>";
    result += "</tr>";
  }
  result += "</table>";

  const msg = {
    from: "telstrakafkanetworking2@gmail.com",
    to: "kamatsayush@gmail.com",
    subject: "Reorder Stock Notification",
    text: "Reorder Below medicines ",
    html: "<center><h2><b>Below medicines are low in stock:</h2>   <br/>" + result + "</b><br/><br/></center>",
  };

  producer.send({
    topic: "reorder",
    messages: [
      {
        value: JSON.stringify(a),
        data: nodemailer
          .createTransport({
            service: "gmail",
            auth: {
              user: "telstrakafkanetworking2@gmail.com",
              pass: "yznqnswnzohcdisw",
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
