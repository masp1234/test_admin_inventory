import 'dotenv/config';
import amqp from 'amqplib';

let connection = null;
let channel = null;
const exchange = 'product';

async function connectToRabbitMQ() {

    if (channel) {
        console.log(`Reusing already open channel to exchange: ${exchange}`)
        return { channel, exchange };
    }

    console.log(`Connecting to RabbitMQ exchange: "${exchange}"...`);

    try {
        connection = await amqp.connect(`amqp://${process.env.AMQP_HOST}`);
        channel = await connection.createChannel();

        channel.assertExchange(exchange, 'fanout', {
            durable: true
        });
    } catch (error) {
        console.log(error);
    }

    console.log(`Connection to RabbitMQ exchange: "${exchange}" established`);
    return { channel, exchange };
}

export default connectToRabbitMQ;
