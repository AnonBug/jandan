const fs = require('fs')
const path = require('path')

const getSidebar = (dirsGroup) => {
    const sidebar = {}
    for (let [key, dirs] of Object.entries(dirsGroup)) {
        // 基础配置
        const childbar = dirs.map(item => ({
            title: item,
            children: []
        }))
        // 根据文件夹内容生成链接
        for (let [i, dir] of dirs.entries()) {
            let files = fs.readdirSync(path.join(__dirname, `../../${key}/${dir}`))

            for (let file of files) {
                if (file.includes('.')) {
                    file = file.match(/(.*)\.md$/)[1]
                    if (file === 'README') {
                        childbar[i].path = `/${key}/${dir}/`
                    } else {
                        childbar[i].children.push(`/${key}/${dir}/${file}`)
                    }
                }
            }
        }

        // 为不同路由定义不同的 sidebar
        sidebar[`/${key}/`] = childbar
    }

    return sidebar
}

// 通过图片生成 md 文档（主要用于无聊图的归档）
const generatorMd = (dir_names) => {
    for (let dir_name of dir_names) {
        const files = fs.readdirSync(path.join(__dirname, `../../loaf/${dir_name}`))
        // 获取文件夹
        for (let file of files) {
            if (!file.includes('.') && file !== 'imgs') {
                const dir = path.join(__dirname, `../../loaf/${dir_name}/${file}`)
                const pics = fs.readdirSync(dir)
                console.log(pics);
                let content = `---\npageClass: loaf-page\n---\n\n`
                content += `# ${file} \n\n`
                for (let pic of pics) {
                    content += `## ${pic.split('.')[0]}\n\n![](./${file}/${pic})\n\n`
                }
                fs.writeFileSync(path.join(dir, `../${file}.md`), content)

            }
        }
    }
}

module.exports = {
    getSidebar,
    generatorMd
}