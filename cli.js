#!/usr/bin/env node

'use strict';

const meow = require('meow');
const got = require('got');
const Ora = require('ora');

meow(`
	Usage
	  $ status-git
`);

const spinner = new Ora();

spinner.start('Checking service status...');

(async () => {
	try {
		const response = await got('https://status.github.com/api/last-message.json');
		const data = JSON.parse(response.body);

		if (data.status === 'good') {
			spinner.succeed(data.body);
		} else if (data.status === 'minor') {
			spinner.warn(data.body);
		} else if (data.status === 'major') {
			spinner.fail(data.body);
		}
	} catch (error) {
		spinner.fail('Something went wrong!');
	}
})();
