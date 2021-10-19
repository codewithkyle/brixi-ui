module.exports = {
    src: [
        {
            files: "./test/js/*.js",
            publicDir: "/js"
        },
        {
            files: "./test/css/*.css",
            publicDir: "/css"
        },
        {
            files: "./audio/*.wav",
            publicDir: "/audio"
        },
        {
            files: "./static/*",
            publicDir: "/static",
        },
    ],
    output: "./service-worker-assets.js",
};
