import 'dotenv/config';
import apm from 'elastic-apm-node';

apm.start({});
// Configuration via ENV: https://www.elastic.co/guide/en/apm/agent/nodejs/current/configuration.html

export default apm;