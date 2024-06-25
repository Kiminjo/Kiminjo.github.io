---
layout: article
title: Git branch 이름 변경하기
permalink: /others/git_branch_rename
aside:
  toc: true
sidebar:
  nav: github
cover: /assets/others/github.jpeg
excerpt: Git의 branch 이름을 변경하는 방법에 대해 알아보겠습니다.
tags:
  - git 
  - branch
---

# 1. 문제 상황

<br>

Feature 브랜치를 따서 작업을 하던 도중, 요구 기능이 변경되었다. 

그래서 브랜치 명을 변경해야하는데 어떻게 하는지 모르겠다... 

내 경우에는 아직 기존 작업 branch가 remote로 push된 상태는 아니기 때문에 로컬에서만 브랜치명을 변경하면 된다. 

<br>

<br>

# 2. 문제 해결 

<br>

[https://thdev.tech/git/2016/12/19/Git-Branch-Name-Change/](https://thdev.tech/git/2016/12/19/Git-Branch-Name-Change/)

<br>

위 블로그를 참고하여 문제를 해결했다. 

다음 명령어를 통해 브랜치 명을 바꿀 수 있다. 

<br>

```bash
git branch -m <PREVIOUS_BRANCH> <NEW_BRANCH>
```

<br>

예를 들어, 기존에 있던 `feature/a` 브랜치를 `feature/b`로 변경하고 싶다면 아래와 같이 써주면 된다. 

<br>

```bash
git branch -m feature/a feature/b
```

<br>

내 경우는 기존의 feature/a 브랜치를 Remote에 push해두지 않았기 때문에 상관없지만 push했다면 remote의 브랜치명도 변경해야한다. 

이 경우는 리모트 브랜치를 삭제 후 새로운 이름의 브랜치를 push하는 방식으로 진행해야한다. 

<br> 

```bash
# 이전 브랜치명 제거 
git push origin :feature/a 

# 새로운 브래치명 push 
git push --set-upstream origin feature/b
```

<br>

브랜치 제거에 관련된 내용은 [여기](https://remagine.tistory.com/17)를 참고하면된다. 

`--set-upstream`에 관련된 내용은 [여기](https://velog.io/@ddoobukk2/upstreamorigin-%EC%B0%A8%EC%9D%B4-git-push-upstream-error)를 참고하면 된다.

<br>

<br>