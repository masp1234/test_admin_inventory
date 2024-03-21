import * as connection from '../../messages/connection.js'
import { publishProductEvent } from '../../messages/product.js'

test('Should call channel.publish() with the right arguments', async () => {
    // spying on connection function and implementing a mock function instead
    const connectionSpy = jest.spyOn(connection, 'default');

    // mocking the publish method from the channel object
    const publishMock = jest.fn().mockImplementation(() => {})
    connectionSpy.mockImplementation(async () => {
        return {
            channel: {
                publish: publishMock
            },
            exchange: 'test exchange'
        }
    });
    const testMessage = {
        status: 'deleted',
        product: {}
    }

    await publishProductEvent(testMessage.product, testMessage.status);

    // testing that the mocked publish method was called with the testMessage variable
    expect(publishMock.mock.calls[0])
        .toStrictEqual([
            "test exchange",
             "",
            Buffer.from(JSON.stringify(testMessage))]);
})
