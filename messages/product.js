import connect from './connection.js'

async function publishProductEvent(product, productStatus) {
        const { channel, exchange} = await connect();
        const message = {
            status: productStatus,
            product: product
        }
        channel.publish(exchange, 'product change', Buffer.from(JSON.stringify(message)));
    }

export {
    publishProductEvent
}

