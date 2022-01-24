module.exports = {
    src: [
        {
            files: "./public/js/*.js",
            publicDir: "/js",
        },
        {
            files: "./public/css/*.css",
            publicDir: "/css",
        },
        {
            files: "./public/audio/*.wav",
            publicDir: "/audio",
        },
        {
            files: "./public/static/*",
            publicDir: "/static",
        },
        {
            files: "./public/docs/components/*.md",
            publicDir: "/docs/components",
        },
        {
            files: "./public/raw/components/**/*",
            publicDir: "/raw/components",
        },
    ],
    output: "./public/service-worker-assets.js",
};
