# elasticsearch-node-vue

A real-time search engine using Node.js, Elasticsearch, and Vue.js.

## Steps to run the code:
Install Elasticsearch and Kibana through docker
If you want to use kibana with elasticsearch locally with docker, they have to communicate with each other. To do so, according to the doc, you need to link the containers. You can give a name to the elasticsearch container with --name:
```
docker run                        \
  --name elasticsearch            \
  -p 9200:9200                    \
  -p 9300:9300                    \
  -e "discovery.type=single-node" \
  docker.elastic.co/elasticsearch/elasticsearch:6.2.2
```
And then link this container to kibana:
```
docker run                            \
  --name kibana                       \
  -p 5601:5601                        \
  --link elasticsearch:elasticsearch  \
  -e "ELASTICSEARCH_URL=http://elasticsearch:9200" \
  docker.elastic.co/kibana/kibana:6.2.2

The port 5601 is exposed locally to access it from your browser. You can check in the monitoring section that elasticsearch's health is green.

```
Clone the repository:
```
git clone https://github.com/poo17nam/elasticsearch-node-vue.git
```
Install dependencies:
```
npm install
```
Create index and add documents to elasticsearch 
```
node data.js
``` 
Run the server
```
node index.js
```
Browse to http://localhost:3001/ to start searching cities.
