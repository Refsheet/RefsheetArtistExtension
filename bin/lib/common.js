const { spawnSync } = require('child_process');

async function run(cmd, args) {
    console.log(`=> ${cmd} ${args.join(" ")}`);

    const result = spawnSync(cmd, args);
    if (result.stdout) process.stdout.write("" + result.stdout);
    if (result.stderr) process.stderr.write("" + result.stderr);

    if (result.status === 0) {
        console.log(`Done: Exit ${result.status}`)
    } else if (result.error) {
        console.error(`Error: ${result.error}`)
    } else {
        console.error(`Error: Exit ${result.status}`)
    }

    await flush();
    return result
}

async function flush() {
    return new Promise((r) => process.stdout.write("\n", r));
}

async function start(main) {
    while (process.argv.length && process.argv[0].match(/([\\/]node(\.exe)?|[\\/]bin[\\/]version)$/)) {
        process.argv.shift()
    }

    main(process.argv).then(e => {
        if(e) console.log(e)
    });
}

module.exports = {
    run, flush, start
};