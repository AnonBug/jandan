/*
 * @Author: zyc
 * @Description: file content
 * @Date: 2021-05-18 14:29:47
 * @LastEditTime: 2021-05-18 22:06:31
 */

const fs = require('fs')
const path = require('path')

const {getSidebar, generatorMd} = require('./utils/prehandle')


// 根据配置，动态设置左侧导航栏
const dirsGroup = {
    // "tech": ['语言基础', '数据结构与算法','计算机网络', '手撕代码', '类库'],
    "loaf": ['无聊图', '凡人优评'],
    // "life":['实习日记']
}

generatorMd(dirsGroup.loaf)

const sidebar = getSidebar(dirsGroup)

console.log(sidebar);

const config = {
    title: '',
    // description: '记录学习，生活',
    base: '/jandan/', // github 中的仓库名称
    head: [
        ['link', {
            rel: 'icon',
            href: '/ico.ico'
        }],
        ['meta', {
            name: 'theme-color',
            content: '#3eaf7c'
        }],
    ],
    themeConfig: {
        logo: "/logo.png",
        sidebar,
        lastUpdated: '最后更新时间',
        smoothScroll: true,
        nav: [{
                text: '摸鱼',
                link: '/loaf/'
            },
            {
                text: 'more',
                items: [{
                        text: 'Github',
                        link: 'https://github.com/AnonBug'
                    },
                    {
                        text: '摸鱼',
                        link: 'https://jandan.net/top-4h'
                    }
                ]
            }
        ]
    },
    plugins: [
        '@vuepress/medium-zoom', // 查看大图插件
        '@vuepress/nprogress', // 进度条插件
        '@vuepress/back-to-top', // 返回到顶部
        'vuepress-plugin-serve', // 本地静态服务器（测试build 结果）
        'vuepress-plugin-table-of-contents', // 目录组件
    ],
    markdown: {
        lineNumbers: true, // 显示行号
        toc: { // 目录
            // containerHeaderHtml:'<div class="toc-container-header">目录</div>',
        },
        extendMarkdown: md => {
            // 图片中文路径问题 https://segmentfault.com/a/1190000022275001
            md.use(require("markdown-it-disable-url-encode"));
        },
    }

}

module.exports = config