const { Kafka } = require("kafkajs");
const axios = require('axios')
const kafka = new Kafka({
    clientId: "kafkaex",
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'mygrp' })
consumer.connect()
consumer.subscribe({ topic: 'reorder', fromBeginning: true })


module.exports = function () {
    consumer.run({
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
