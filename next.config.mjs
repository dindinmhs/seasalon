/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/dashboard',
                destination: '/dashboard/customer/booking',
                permanent: true,
            },
            {
                source: '/dashboard/customer',
                destination: '/dashboard/customer/booking',
                permanent: true,
            },
            {
                source: '/dashboard/admin',
                destination: '/dashboard/admin/services',
                permanent: true,
            },
        ]
    }
};

export default nextConfig;
