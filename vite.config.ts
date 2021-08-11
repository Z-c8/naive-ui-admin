const path = require('path')

module.exports = {
    base: '/',
    alias: {
        '/@/': path.resolve(__dirname, './src')
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve('src/style/global/config.less')}";`,
                },
                javascriptEnabled: true,
            }
        }
    },
}