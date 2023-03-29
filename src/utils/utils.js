export function checkResponse(response, options) {
    try {
    if (response.ok) {
        options()
    } else {
        console.error(`Ошибка ${response.status}:`);
    }
    } catch (error) {
        console.error('Ошибка при отправке заказа:', error);
    }
}

