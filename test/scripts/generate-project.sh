#!/bin/bash

cd test/templates/maven
jhipster --with-entities --no-insight
yo jhipster-pulsar
./mvnw -ntp verify