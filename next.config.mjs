/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
                source: "/login",
                headers: [
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "unsafe-none",
                    },
                ],
                source: "/",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "docusignclone.firebaseapp.com", // Set your origin
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "/", // Set your origin
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },

                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type"
                    }, {
                        key: "Access-Control-Allow-Headers",
                        value: "Authorization"
                    }, {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Range"
                    }, {
                        key: "Access-Control-Allow-Headers",
                        value: "Accept-Ranges"
                    }, {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "unsafe-none",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;

