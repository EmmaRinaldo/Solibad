// next.config.mjs
import { i18n } from 'next-i18next';

const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['fr', 'en', 'zh', 'id', 'ja', 'ko'],
        defaultLocale: 'fr',
        localeDetection: false, // Pour activer la détection automatique de la langue
    },
};

export default nextConfig;
