const net = require('net');
const [host, port] = process.argv[2].split(':');
const command = process.argv.slice(3).join(' ');
const timeout = 300000; // 5 minute timeout

async function checkKafka() {
  return new Promise((resolve) => {
    const socket = net.connect(port, host, () => {
      socket.end();
      resolve(true);
    });
    socket.on('error', () => resolve(false));
    socket.setTimeout(1000, () => {
      socket.destroy();
      resolve(false);
    });
  });
}

async function wait() {
  const start = Date.now();
  console.log(`Waiting for Kafka at ${host}:${port}...`);
  
  while (!(await checkKafka())) {
    if (Date.now() - start > timeout) {
      console.error('Timeout waiting for Kafka');
      process.exit(1);
    }
    await new Promise(res => setTimeout(res, 1000));
  }
  
  console.log('Kafka is ready!');
  require('child_process').exec(command);
}

wait().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});