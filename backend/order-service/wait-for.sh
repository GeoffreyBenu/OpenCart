# For order-service
echo '#!/bin/sh
host=$1
port=$2
shift 2

echo "Waiting for Kafka at $host:$port..."
while ! nc -z $host $port; do
  sleep 1
done

echo "Kafka is ready!"
exec "$@"' > order-service/wait-for.sh

