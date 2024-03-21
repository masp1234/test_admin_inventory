import 'dotenv/config';
import amqp from 'amqplib';

export default async function connectToRabbitMQ(){

    const exchange = 'product';
    let channel = null;

    console.log(`Connecting to RabbitMQ exchange: "${exchange}"...`)

    try {
        const connection = await amqp.connect(`amqp://${process.env.AMQP_HOST}`);
        channel = await connection.createChannel();

        channel.assertExchange(exchange, 'fanout', {
        durable: false
    });
    
    }
    catch(error) {
        console.log(error);
    }
    console.log(`Connected to RabbitMQ exchange: "${exchange}`)
    return {
        channel,
        exchange
    }
    }