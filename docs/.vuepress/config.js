module.exports = {
    title: 'Crash-ui',
    description: 'Just playing around',
    base: '/crash-ui/',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '组件文档', link: '/guide/component/swiper' },
            { text: 'GitHub', link: 'https://github.com/maxw2/crash-ui' },
        ],
        sidebar: [
            {
                title: '入门',   // 必要的
                // collapsable: false, // 可选的, 默认值是 true,
                // sidebarDepth: 2,    // 可选的, 默认值是 1
                children: [
                    '/guide/foo/install'
                ]
            },
            {
                title: '组件',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                children: [
                    '/guide/component/swiper',
                    '/guide/component/calender',
                    '/guide/component/pagination',
                    '/guide/component/collapse',
                    '/guide/component/rate',
                    '/guide/component/tabs',
                    '/guide/component/scrollAnimate',
                    '/guide/component/scroll'
                ]
            }
        ]
    },
    plugins: [
        [
            'vuepress-plugin-typescript',
            {
                tsLoaderOptions: {
                    // ts-loader 的所有配置项
                    configFile:'tsconfig.json'
                },
            },
        ],
    ],
}