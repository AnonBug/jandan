#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 提交 docs 的更新
git add .
# 通过 双引号下的 $1 可以获取传递的参数，这里传递的是提交信息
git commit -m "$1"
git push github main
# 同步更新到 gitee
git push gitee main

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "$1"

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:AnonBug/jandan.git master:gh-pages
# 同步发布到 gitee 
git push -f git@gitee.com:anonbug/jandan.git master:gh-pages

cd -