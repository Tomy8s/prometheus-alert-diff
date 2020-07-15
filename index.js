#!/usr/bin/env node

const https = require('https');

main()

async function main() {
    if (!process.env.PROMETHEUS_SERVERS) {
        console.error('No servers provided! Exiting...');
        process.exit(1);
    }
    const servers = process.env.PROMETHEUS_SERVERS.split(' ');
    const alertName = process.argv[2];
    if (!alertName) {
        console.error('No alert name provided! Exiting...');
        process.exit(1);
    }
    servers.forEach(getResult);

    function getResult(server) {
        https.get(`${server}/api/v1/rules?type=alerts`, handler);

        function handler(response) {
            let body = '';
            response.on('data', dechunker)
            response.on('end', print);

            function print() {
                try {
                    const { status, data } = JSON.parse(body.replace(/([\+-]Inf)/g, '"$1"'));
                    if (status === 'success') {
                        const { rules } = data.groups[0];
                        const alerts = rules.filter(alert => alert.name === alertName);
                        if (alerts.length) {
                            console.log(`${server}:`);
                            console.log(alerts.map(extractLabels).join('\n'));
                            console.log('======================================================');
                        } else {
                            console.log(`No matching alerts found on ${server}.`)
                        }
                    }
                } catch (error) {
                    console.error('Error calling ' + server);
                    console.error(error);
                }
            }

            function dechunker(chunk) {
                body += chunk.toString();
            }
        }
    }

}

function extractLabels({ name, query, duration, labels, annotations }) {
    const message = `
name: ${ name}
query: ${ query}
duration: ${ duration}
labels: ${ JSON.stringify(labels)}
annotations: ${ generateAnnotationMsg(annotations)}
`;

    return message;
}

function generateAnnotationMsg(annotations) {
    const lines = []

    for (const annotation in annotations) {
        lines.push(`${annotation}: ${annotations[annotation]}`);
    }

    const message = `\n  ${lines.join('\n  ')}`

    return message;
}
