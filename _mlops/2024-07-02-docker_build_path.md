---
layout: article
title: "Docker 빌드 시 경로 지정하기"
permalink: /mlops/docker_build_path
aside:
  toc: true
cover: /assets/backend_mlops/docker/docker.png
tags: docker 
sidebar:
  nav: docker
excerpt: Docker build 시 실행하고자하는 도커 파일의 경로를 지정해줍시다. 
---

# 디렉토리 구조 및 니즈 가정 

<br>

**디렉토리 구조**

```plain
project/
├── A/
│   ├── B/
│   │   ├── Dockerfile
│   │   ├── b.py
│   ├── C/
│   │   ├── Dockerfile
│   │   ├── c.py
│   ├── D/
│   │   ├── Dockerfile
│   │   ├── d.py
├── E/
│   ├── F/
│   │   ├── Dockerfile
│   │   ├── f.py
```

<br>

**도커 파일** 

```Dockerfile 

...

# 현재 디렉토리의 구조를 그대로 /app으로 복사하는 상황으로 가정
COPY . .

...
```

<br>

**니즈**

- B 디렉토리 하위에 있는 Dockerfile을 이용하여 이미지를 생성하기를 원한다고 가정

<br>

<br>

# 도커파일 실행 경로 변경하기 

<br>

크게 두 가지 방식으로 실행 도커파일을 지정할 수 있음 

1. Build 시 마지막 Argument로 경로 지정해주기 
2. `--file`(`-f`) Argument를 이용해서 경로 지정해주기 

<br>

## 방법 1. build 시 마지막 Argument로 경로 지정해주기 

<br>

```shell
docker build -t example .
```

<br>

- 위의 명령어에서 마지막 "."이 의미하는 것은 현재 디렉토리에 있는 Dockerfile을 실행하겠다는 의미임 
- 그러므로, B 디렉토리 하위에 있는 Dockerfile을 기반으로 이미지를 만들기 위해서는 아래와 같이 명령어를 지정하면 됨

<br>

```shell
docker build -t example ./A/B/
```

<br>

<u>이 방식은 특정된 경로를 기본 경로로 설정함</u>    
위의 예시에서 Dockerfile은 오직 `B` 폴더 하위 경로를 복사함 
{:.info}

<br>

- `b.py`  파일 실행하기 

<br>

```shell
python3 b.py
```

<br>

<br>

## 방법 2. build 시 -f(--file) Argument를 이용하여 경로 지정해주기 

<br>

- `--file`(`-f`) Argument: 도커파일이 있는 위치를 명시하는 Argument 

<br>

**`--file`(`-f`) Argument를 이용해서 도커 파일 빌드하기**

<br>

```shell
docker build -t example -f /A/B/ .
```

<br>

<u>이 방식은 build 명령어 실행 위치를 기본 경로로 설정함</u>     
위의 예시에서 Dockerfile은 `projects` 폴더 전체를 복사함 
{:.info}

<br>

- `b.py` 파일 실행하기 

<br>

```shell
python3 /app/projects/A/B/b.py
```

<br>

<br>

