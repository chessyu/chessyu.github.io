---
title: docker映射nginx配置文件及静态资源目录
sidebar: 'auto'
date: 2021-07-20
tags:
 - docker
categories:
 - 持续集成

---

## docker 常用命令
   |     命令 |   描述   |
   | :--------| :------: |
   | docker pull { } | 安装镜像 ` 镜像名 ` |
   | docker images | 列出所有已安装的镜像列表 |
   | docker rmi { } | 删除某个镜像 ` 镜像ID` |
   | docker ps | 列出在运行的容器列表 |
   | docker ps -a | 列出所有容器列表 |
   | docker start { } | 运行容器 ` 容器ID/容器名 ` |
   | docker stop { } | 停止容器 ` 容器ID/容器名 ` |
   | docker rm { } | 删除容器 ` 容器ID/容器名 ` , 前提是此容器已停止 |
   | docker restart { } | 重启容器 ` 容器ID/容器名 ` |
   | docker exec -it { } bash | 进入容器 ` 容器ID/容器名 ` |
   | docker cp { }:{path} {path} | 复制容器内的文件到本机 ，` 容器ID/容器名 `|


## 创建容器并运行
   ### 第一步基于已安装的 Nginx 镜像创建容器
    ```bash
    docker run --name nginx-web -p 3055:80  -d nginx
    # --name  给容器命名；
    # -p 宿主ip 映射 ：容器 ip ;
    # -d 启动哪一个镜像；
    ```
   ![](/BC48FDA2-EEFD-4770-AF8B-F556BCAC08FA.png)

   创建好容器后，会返回一串容器 ID ，此时在浏览器 URL 栏输入服务器 IP 加端口就可以访问，不出意外的话是可以得到 Nginx 的欢迎页的。 也可以用 Linx 命令来访问 。
   *** 如果访问不到的话，有可能是你的 端口 ` 3055 ` 没有开放，也就是 进站 与 出站 没有配置；**
   ```bash
    curl localhost:3055
   ```
   ![](/94B9D932-362B-4c68-AB20-B26133220788.png)

   ### 第二步在本地创建挂载目录( 后续与容器的配置做映射 )
   批量创建目录 ` mkdir -p /data/nginx/{conf,conf.d,html,logs} ` ，查看已创建好的目录。目录可随意放置，我个人比较喜欢放在 ` data ` 目录下
   ![](/C2DCEC89-000C-4d38-905A-DB139E7365C7.png)

   ### 第三步将部分容器里的配置文件复制到挂载目录下
   我们只需要容器内的两个配置文件` nginx.conf ` , ` conf.d/default.conf `。依次把文件复制到对应目录下。
   ```bash
    docker cp 容器ID:/etc/nginx/nginx.conf /data/nginx/conf/
    docker cp 容器ID:/etc/nginx/conf.d/default.conf  /data/nginx/conf.d/
   ``` 
   ![](/D3DA1570-F98E-4020-AE78-1AD331169003.png)

   ### 第四步 最为关键的步骤
   首先，我们需要把之前创建的容器停掉并删除掉。
   ```bash
   docker stop 容器ID    #停止容器
   docker rm 容器ID #删除容器
   ```
   创建这个容器，仅仅为了复制他的配置文件而已，也就是 ` nginx.conf` ,` default.conf  `这两个文件 。不想手动去创建这俩文件，个人觉得比较麻烦。你不闲麻烦的话完全可手动去创建，并忽略 第一步 和 第三步。

   重新创建容器，同时映射配置文件的路径。
   ```bash
    docker run --name nginx-web -p 3055:80 -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/conf.d:/etc/nginx/conf.d -v /data/nginx/html:/usr/share/nginx/html  -v/data/nginx/logs:/var/log/nginx -d nginx

    docker run  #运行容器
    --name nginx-web  #给创建的容器命名
    -p 3055:80  #映射容器端口号，左边的服务器的端口，右边的是容器的端口
    -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf    #映射 nginx 配置文件
    -v /data/nginx/conf.d:/etc/nginx/conf.d  # 映射配置文件的包含目录
    -v /data/nginx/html:/usr/share/nginx/html   #映射静态资源 存的目录
    -v/data/nginx/logs:/var/log/nginx  # 映射日志记录文件
    -d nginx  # 启动 nginx 镜像
   ```
   运行成功后会返回一串容器 ID 此时，重新去浏览器访问试试看，如果页面正常能访问 或 显示 403 的话，表明目录和文件已经映射成功了，显示 403 的原因是因为 ` /data/nginx/html ` 下面没有放置 ` index.html ` 文件。放入一个文件就可以了。 


