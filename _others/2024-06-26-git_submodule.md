---
layout: article
title: Git Submodule을 이용해서 submodule 관리하기 
permalink: /others/git_submodule
aside:
  toc: true
sidebar:
  nav: github
cover: /assets/others/github.jpeg
tags: 
  - git
  - submodule
excerpt: git의 submodule을 이용하여 별도의 프로젝트들을 동시에 관리하는 방법에 대해 알아보겠습니다. 
---

# 1. Git Submodule이란? 

<br>

- Git Submodule은 하나의 Git 저장소 내에서 다른 Git 저장소를 서브 디렉토리로 포함할 수 있도록 하는 기능을 말함 

- 용도: 프로젝트의 일부분을 별도의 독립적인 버전 관리가 필요한 상황에서 유용함

<br>

<br>

# 2. Git Submodule을 사용하기 좋은 상황은?

<br>

- 공유 코드 라이브러리: 여러 프로젝트에서 공통으로 사용되는 라이브러리를 별도의 저장소로 관리

- 서드 파티 코드 포함: 외부에서 관리되는 오픈소스나 서드 파티 라이브러리를 포함할 때

- 모놀리식 레포에서의 분리: 큰 프로젝트를 작은 모듈로 나누어 독립적으로 관리하고자 할 때

<br>

<br>

# 3. Git Submodule 사용하기 

<br>

## 3-1. Submodule 추가하기

<br>

```sh
git submodule add <repository_url> <submodule_directory>

# 예시
git submodule add https://github.com/example/library.git lib/library
```

<br>

## 3-2. Submodule 초기화 및 버전 업데이트

<br>

```sh
git submodule init
git submodule update
```

<br>

## 3-3. Submodule을 최신 버전으로 업데이트

<br>

```sh
git submodule update --remote
```

`git submodule update`와 `git submodule update --remote`의 차이점
- `git submodule update`는 Submodule을 현재 커밋 상태로 업데이트함 
- `git submodule update --remote`는 Submodule을 원격 저장소의 최신 커밋으로 업데이트함
{:.info}



