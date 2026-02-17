# ConvertX Fork

基于 [C4illin/ConvertX](https://github.com/C4illin/ConvertX) 的分支。

## 修改内容

- 移除账号系统，无需登录即可使用
- 镜像只推送到 GitHub Packages (ghcr.io)

## 部署

```yml
services:
  convertx:
    image: ghcr.io/zcbyby/convertx
    container_name: convertx
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
```

或

```bash
docker run -p 3000:3000 -v ./data:/app/data ghcr.io/zcbyby/convertx
```
