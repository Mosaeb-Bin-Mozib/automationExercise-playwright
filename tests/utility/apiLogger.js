export function printApiResponseOne(title, response, responseBody) {

    console.log('\n');
    console.log('╔══════════════════════════════════════════════════╗');
    console.log(`║ ${title.padEnd(48)}║`);
    console.log('╠══════════════════════════════════════════════════╣');
    console.log(`║ Status Code : ${response.status()}`.padEnd(49) + '║');
    console.log('╠══════════════════════════════════════════════════╣');
    console.log('║ Response Body                                   ║');
    console.log('╠══════════════════════════════════════════════════╣');

    if (typeof responseBody === 'object') {
        console.log(JSON.stringify(responseBody, null, 2));
    } else {
        console.log(responseBody);
    }

    console.log('╚══════════════════════════════════════════════════╝');
    console.log('\n');
}

export function printApiResponseTwo(title, response, responseBody) {

    console.log('\n');
    console.log('╔══════════════════════════════════════════════╗');
    console.log(`║ ${title.padEnd(44)}║`);
    console.log('╠══════════════════════════════════════════════╣');
    console.log(`║ Status Code : ${response.status()}`.padEnd(45) + '║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log('║ Response Body:                               ║');
    console.log('╠══════════════════════════════════════════════╣');
    console.log(JSON.stringify(responseBody, null, 2));
    console.log('╚══════════════════════════════════════════════╝');
    console.log('\n');
}

export function printApiResponseThree(title, response, responseBody) {

    console.log('\n');
    console.log('╔══════════════════════════════════════════════════╗');
    console.log(`║ ${title.padEnd(48)}║`);
    console.log('╠══════════════════════════════════════════════════╣');
    console.log(`║ Status Code : ${response.status()}`.padEnd(49) + '║');
    console.log('╠══════════════════════════════════════════════════╣');
    console.log('║ Response Body                                    ║');
    console.log('╠══════════════════════════════════════════════════╣');

    if (typeof responseBody === 'object') {
        console.log(JSON.stringify(responseBody, null, 2));
    } else {
        console.log(responseBody);
    }

    console.log('╚══════════════════════════════════════════════════╝');
    console.log('\n');
}
