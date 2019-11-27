/* global describe, beforeEach, it */

const path = require('path');
const fse = require('fs-extra');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('JHipster generator pulsar', () => {
    beforeEach((done) => {
        helpers
            .run(path.join(__dirname, '../generators/app'))
            .inTmpDir((dir) => {
                fse.copySync(path.join(__dirname, '../test/templates/default'), dir);
            })
            .withOptions({
                testmode: true
            })
            .on('end', done);
    });

    it('generates the files', () => {
        assert.file([
            'src/main/docker/pulsar.yml',
            'src/main/java/com/mycompany/myapp/config/PulsarProperties.java',
            'src/main/java/com/mycompany/myapp/web/rest/PulsarController.java',
            'src/test/java/com/mycompany/myapp/web/rest/PulsarControllerTest.java',
        ]);
        const expectedConfig = `# Test yaml
foo: bar

pulsar:
  client:
    serviceUrl: pulsar://localhost:6650
`;
        assert.equalsFileContent('src/main/resources/config/application.yml', expectedConfig);
        assert.equalsFileContent('src/test/resources/config/application.yml', expectedConfig);
    });
});
