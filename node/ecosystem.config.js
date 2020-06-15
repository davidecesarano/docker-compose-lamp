module.exports = {
    apps : [{
        name: "app1",
        cwd: "/opt/node/app1/",
        script: "index.js",
        watch: true,
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}