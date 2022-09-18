const { Kafka } = require("kafkajs");
const axios = require('axios')
const kafka = new Kafka({
    clientId: "kafkaex",
    brokers: ['localhost:9092']
})

const consumer1 = kafka.consumer({ groupId: 'mygrp1' })
consumer1.connect()
consumer1.subscribe({ topic: 'notification', fromBeginning: true })


module.exports = function () {
    consumer1.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(JSON.parse(message.value))

            axios({
                method: 'post', url: 'http://localhost:5050/getnotification',
                data: JSON.parse(message.value)
            }).then((e) => {
                console.log(e.data)
            })
        }

    })
}