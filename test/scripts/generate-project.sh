#!/bin/bash

cd test/templates/maven
jhipster --with-entities
yo jhipster-pulsar
./mvnw -ntp verify