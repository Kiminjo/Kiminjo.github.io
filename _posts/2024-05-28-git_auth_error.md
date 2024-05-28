---
layout: article
title: Git push 시 발생하는 권한 문제 해결
aside:
  toc: true
cover: /assets/others/github.jpeg
excerpt: "Git Push 시 remote: No anonymous write access.fatal: Authentication failed 에러 해결하기"
---


# 1. 문제 상황 

<br>

평소와 다름없이 코딩을 완료하고 작업물을 push하려는데 못보던 에러가 발생했다. 

<br>

```bash
Error: connect ECONNREFUSED /run/user/1002/vscode-git-681ccdc781.sock
    at PipeConnectWrap.afterConnect [as oncomplete] (node:net:1247:16) {
  errno: -111,
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '/run/user/1002/vscode-git-681ccdc781.sock'
}
remote: No anonymous write access.
fatal: Authentication failed for <YOUR_REPOSITORY>
```

<br>

에러 메시지를 읽어보니 권한 문제인 것 같은데 내 레포에 내가 푸쉬하는데 대체 왜 권한 문제가 발생하는건지 모르겠다. 

혹시 몰라 git config 파일도 확인해봤지만 별다른 이상은 없었다. 

<br>

<br>

# 2. 문제 해결 

<br>

[https://mingg123.tistory.com/112](https://mingg123.tistory.com/112)

<br>

위 블로그대로 따라하니 문제가 해결되었다. 

결과적으론 내 repository에 접근하기 위한 access token에 대한 정보가 없어서 발생했던 문제였다. 

그래서 `.git/config` 파일에 있는 URL에 내 토큰 정보를 추가해주니 정상적으로 Push가 되었다. 

<br>

```bash
vi .git/config
```

<br>

```bash
# 수정 전 
...
[remote "origin"]
	url = https://github.com/Kiminjo/<MY_REPOSITORY.git> # 여기에 액세스토큰 추가     
...

# 수정 후
...
[remote "origin"]
	url = https://<YOUR_ACCESS_TOKEN>@github.com/Kiminjo/<MY_REPOSITORY.git> 
...
```

<br>

액세스 토큰을 발급 받는 방법은 위 블로그에 나와있으니 그걸 보고 따라하면 된다. 

<br>

<br>
