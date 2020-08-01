
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
        lines.push(`${ annotation }: ${annotations[ annotation ]}`);
    }

    const message = `\n  ${ lines.join('\n  ') }`

    return message;
}

function getServers() {
    validateServers();
    const servers = process.env.PROMETHEUS_SERVERS.split(' ');
    
    return servers;
}

function handleError({ server, statusCode }) {
    const responseCodeMessage =  statusCode ?
        `, returned "${ statusCode }"` : '';
    const message = `Could not connect to ${ server }${ responseCodeMessage }.`;

    console.error('\x1b[31m%s\x1b[0m', message);
}

function validateServers() {
    if (!process.env.PROMETHEUS_SERVERS) {
        console.error('No servers provided! Exiting...');
        process.exit(1);
    }
}

module.exports = {
    extractLabels,
    generateAnnotationMsg,
    getServers,
    handleError,
    validateServers,
};
