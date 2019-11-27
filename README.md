# generator-jhipster-pulsar
[![NPM version][npm-image]][npm-url] [![Build Status][github-image]][github-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module to support Apache Pulsar in your JHipster app

# Introduction

This is a [JHipster](https://www.jhipster.tech/) module, that is meant to be used in a JHipster application.
It provides integration with the [Apache Pulsar](https://pulsar.apache.org/) messaging system.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) module, we expect you have JHipster and its related tools already installed (see [installing JHipster](https://www.jhipster.tech/installation/))

# Installation

To install this module:

```bash
npm install -g generator-jhipster-pulsar
```

To update this module:

```bash
npm update -g generator-jhipster-pulsar
```

# Usage
At the root of your JHipster app folder, enter:
```
yo jhipster-pulsar
```

This will generate:

* a docker-compose file that can be used in development to spawn a dockerized pulsar instance. To launch it:
```
docker-compose -f src/main/docker/pulsar.yml up -d
```
* an HTTP endpoint to publish messages:
```
curl -X POST "http://localhost:8080/api/pulsar/publish/my-topic?message=test"
```
* an HTTP endpoint to create a subscription and susbscribe to a topic:
```
curl -X PUT "http://localhost:8080/api/pulsar/subscriptions/my-subscription?topic=my-topic"
```
* an HTTP endpoint to read messages from a subscription:
```
curl "http://localhost:8080/api/pulsar/subscriptions/my-subscription/records"
```
* an HTTP endpoint to delete a subscription:
```
curl -X DELETE "http://localhost:8080/api/pulsar/subscriptions/my-subscription"
```
* integration tests using the [Pulsar Testcontainers module](https://www.testcontainers.org/modules/pulsar/)

# License

Apache-2.0 © [Christophe Bornet](https://github.com/cbornet)


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-pulsar.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-pulsar
[github-image]: https://github.com/cbornet/generator-jhipster-pulsar/workflows/Build/badge.svg
[github-url]: https://github.com/cbornet/generator-jhipster-pulsar/actions
[daviddm-image]: https://david-dm.org/cbornet/generator-jhipster-pulsar.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cbornet/generator-jhipster-pulsar
