import test from 'ava';
import execa from 'execa';

test('Check status', async t => {
	const ret = await execa.shell('node cli.js');
	t.regex(ret.stderr, /✔/ || /⚠/ || /✖/);
});

test('Help message', async t => {
	const ret = await execa.shell('node cli.js --help');
	t.regex(ret.stdout, /Usage/);
});

test('Version number', async t => {
	const {stdout} = await execa.shell('node cli.js --version');
	t.true(stdout.length < 6);
});
