<h2 align="center">Elastic Stack + Nginx + TS NodeJS EXpress APP on <b>Docker</b></h2>
<h3 align="center">Preconfigured Security, Tools, and Self-Monitoring</h3>

# Introduction
Elastic Stack (**ELK**) Docker Composition, preconfigured with **Security**, **Monitoring**, and **Tools**; Up with a Single Command.

Suitable for Demoing, MVPs and small production deployments.

Stack Version: [8.10.2](https://www.elastic.co/blog/whats-new-elastic-8-10-0) 🎉  - Based on [Official Elastic Docker Images](https://www.docker.elastic.co/)
> You can change Elastic Stack version by setting `ELK_VERSION` in `.env` file and rebuild your images. Any version >= 8.0.0 is compatible with this template.

Inspired by [sherifabdlnaby/elastdocker](https://github.com/sherifabdlnaby/elastdocker)

### Main Features 📜

- Configured as a Production Single Node Cluster.
- Security Enabled By Default.
- Configured to Enable:
  - Logging & Metrics Ingestion
  - APM
  - Alerting
  - Machine Learning
  - Anomaly Detection
  - SIEM (Security information and event management).
  - Enabling Trial License
- Use Docker-Compose and `.env` to configure your entire stack parameters.
- Persist Elasticsearch's Keystore and SSL Certifications.
- Self-Monitoring Metrics Enabled.
- Embedded Container Healthchecks for Stack Images.
- Integrated Nginx + TS NodeJS Express app with logging + APM

#### More points
And comparing nodejs-nginx-elk-docker and the popular [sherifabdlnaby/elastdocker](https://github.com/sherifabdlnaby/elastdocker)

<details><summary>Expand...</summary>
<p>

One of the most popular ELK on Docker repositories is the awesome [sherifabdlnaby/elastdocker](https://github.com/sherifabdlnaby/elastdocker).

nodejs-nginx-elk-docker differs from `sherifabdlnaby/elastdocker` in the following points.

- Remove multinode cluster

- Remove Prometheus Exporters

- Collect Docker logs by default

- Add simple NodeJS Express app  + collect logs + apm integrate

- Add Nginx for NodeJS Express app + collect logs

</p>
</details>

-----

# Requirements

- [Docker 20.05 or higher](https://docs.docker.com/install/)
- [Docker-Compose 1.29 or higher](https://docs.docker.com/compose/install/)
- 4GB RAM (For Windows and MacOS make sure Docker's VM has more than 4GB+ memory.)

# Setup

1. Clone the Repository
     ```bash
     git clone ...
     ```
2. Initialize Elasticsearch Keystore and TLS Self-Signed Certificates
    ```bash
    $ make setup
    ```
    > **For Linux's docker hosts only**. By default virtual memory [is not enough](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html) so run the next command as root `sysctl -w vm.max_map_count=262144`
3. Start Elastic Stack
    ```bash
    $ make start           <OR>         $ docker-compose up -d		<OR>		$ docker compose up -d
    ```
4. Visit Kibana at [https://localhost:5601](https://localhost:5601) or `https://<your_public_ip>:5601`

    Default Username: `elastic`, Password: `changeme`

    > - Notice that Kibana is configured to use HTTPS, so you'll need to write `https://` before `localhost:5601` in the browser.
    > - Modify `.env` file for your needs, most importantly `ELASTIC_PASSWORD` that setup your superuser `elastic`'s password, `ELASTICSEARCH_HEAP` & `LOGSTASH_HEAP` for Elasticsearch & Logstash Heap Size.
    
> Whatever your Host (e.g AWS EC2, Azure, DigitalOcean, or on-premise server), once you expose your host to the network, ELK component will be accessible on their respective ports. Since the enabled TLS uses a self-signed certificate, it is recommended to SSL-Terminate public traffic using your signed certificates.

## Additional Commands

<details><summary>Expand</summary>
<p>


#### To Start **Elastic Stack, Tools and Monitoring**
```
$ make start
```
#### To Rebuild Images
```shell
$ make build
```
#### Bring down the stack.
```shell
$ make down
```

#### Reset everything, Remove all containers, and delete **DATA**!
```shell
$ make prune
```

</p>
</details>

# Configuration

* Some Configuration are parameterized in the `.env` file.
  * `ELASTIC_PASSWORD`, user `elastic`'s password (default: `changeme` _pls_).
  * `ELK_VERSION` Elastic Stack Version (default: `8.10.2`)
  * `ELASTICSEARCH_HEAP`, how much Elasticsearch allocate from memory (default: 1GB -good for development only-)
  * `LOGSTASH_HEAP`, how much Logstash allocate from memory.
  * Other configurations which their such as cluster name, and node name, etc.
* Elasticsearch Configuration in `elasticsearch.yml` at `./sys/elasticsearch/config`.
* Logstash Configuration in `logstash.yml` at `./sys/logstash/config/logstash.yml`.
* Logstash Pipeline in `main.conf` at `./sys/logstash/pipeline/main.conf`.
* Kibana Configuration in `kibana.yml` at `./sys/kibana/config`.

### Setting Up Keystore

You can extend the Keystore generation script by adding keys to `./sys/setup/keystore.sh` script.

To Re-generate Keystore:
```
make keystore
```

### Notes


- ⚠️ Elasticsearch HTTP layer is using SSL, thus mean you need to configure your elasticsearch clients with the `CA` in `secrets/certs/ca/ca.crt`, or configure client to ignore SSL Certificate Verification (e.g `--insecure` in `curl`).

- Makefile is a wrapper around `Docker-Compose` commands, use `make help` to know every command.

- Elasticsearch will save its data to a volume named `elasticsearch-data`

- Elasticsearch Keystore (that contains passwords and credentials) and SSL Certificate are generated in the `./sys/secrets` directory by the setup command.

- Make sure to run `make setup` if you changed `ELASTIC_PASSWORD` and to restart the stack afterwards.

- For Linux Users it's recommended to set the following configuration (run as `root`)
    ```
    sysctl -w vm.max_map_count=262144
    ```
    By default, Virtual Memory [is not enough](https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html).
