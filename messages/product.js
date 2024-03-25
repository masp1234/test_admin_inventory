import connect from './connection.js'

async function publishProductEvent(product, productStatus) {
    if (!product || !productStatus) {
        throw new Error('Invalid parameters: need to have both product and productStatus arguments')
    }
        console.log(
            'test'
        )
        
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

