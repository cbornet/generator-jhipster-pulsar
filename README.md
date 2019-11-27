# generator-jhipster-pulsar
[![NPM version][npm-image]][npm-url] [![Build Status][github-image]][github-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Module to support Apache Pulsar in your JHipster app

# Introduction

This is a [JHipster](https://www.jhipster.tech/) module, that is meant to be used in a JHipster application.

# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this module:

```bash
npm install -g generator-jhipster-pulsar
```

To update this module:

```bash
npm update -g generator-jhipster-pulsar
```

## With Yarn

To install this module:

```bash
yarn global add generator-jhipster-pulsar
```

To update this module:

```bash
yarn global upgrade generator-jhipster-pulsar
```

# Usage

This module generates:

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

# License

Apache-2.0 © [Christophe Bornet](https://github.com/cbornet)


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-pulsar.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-pulsar
[github-image]: https://github.com/cbornet/generator-jhipster-pulsar/workflows/Build/badge.svg
[github-url]: https://github.com/cbornet/generator-jhipster-pulsar/actions
[daviddm-image]: https://david-dm.org/cbornet/generator-jhipster-pulsar.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cbornet/generator-jhipster-pulsar
