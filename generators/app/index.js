const chalk = require('chalk');
const semver = require('semver');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');
const yaml = require('js-yaml');
const packagejs = require('../../package.json');

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getAllJhipsterConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster pulsar')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {
                const currentJhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
                const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
                if (!semver.satisfies(currentJhipsterVersion, minimumJhipsterVersion)) {
                    this.warning(`\nYour generated project used an old JHipster version (${currentJhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
                }
            }
        };
    }

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        this.writeAppConfig = function (filePath) {
            const configPulsar = `
pulsar:
  client:
    serviceUrl: pulsar://localhost:6650
`;

            const appConfigFileContent = this.fs.read(filePath);
            const appConfig = yaml.safeLoad(appConfigFileContent);
            if (!appConfig.pulsar) {
                this.fs.write(filePath, appConfigFileContent + configPulsar);
            }
        };

        // read config from .yo-rc.json
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.buildTool = this.jhipsterAppConfig.buildTool;

        // use constants from generator-constants.js
        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const testDir = `${jhipsterConstants.SERVER_TEST_SRC_DIR + this.packageFolder}/`;
        const dockerDir = jhipsterConstants.DOCKER_DIR;
        const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
        const testResourceDir = jhipsterConstants.SERVER_TEST_RES_DIR;

        this.template('pulsar.yml.ejs', `${dockerDir}pulsar.yml`);
        this.template('PulsarProperties.java.ejs', `${javaDir}config/PulsarProperties.java`);
        this.template('PulsarResource.java.ejs', `${javaDir}web/rest/PulsarResource.java`);
        this.template('PulsarResourceTest.java.ejs', `${testDir}web/rest/PulsarResourceTest.java`);

        if (this.buildTool === 'maven') {
            this.addMavenDependency('org.apache.pulsar', 'pulsar-client', '2.4.1');
            this.addMavenDependency('org.testcontainers', 'pulsar', '1.12.3', '            <scope>test</scope>');
        } else if (this.buildTool === 'gradle') {
            this.addGradleDependency('implementation', 'org.apache.pulsar', 'pulsar-client', '2.4.1');
            this.addGradleDependency('testImplementation', 'org.testcontainers', 'pulsar', '1.12.3');
        }
        this.writeAppConfig(`${resourceDir}config/application.yml`);
        this.writeAppConfig(`${testResourceDir}config/application.yml`);
    }
};
