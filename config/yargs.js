yargsOptions = {
    command: 'viewport',
    describe: 'Viewport size',

    builder: {
        vw: {
            describe: 'Viewport width, example: 1920',
            type: 'number',
            default: 1920
        },
        vh: {
            describe: 'Viewport height, example: 1080',
            type: 'number',
            default: 1080
        },
    }
}

module.exports = yargsOptions;