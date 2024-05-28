---
layout: article
title: Pytorch Lightning에서 GPU 지정하기
aside:
  toc: true
cover: /assets/backend_mlops/ptl.png
excerpt: Pytorch Lightening에서 특정 GPU 클러스터를 사용하는 방법에 대해 알아보겠습니다.
---

# 1. 배경

<br>

파이토치에서는 아래와 같이 텐서에 특정 GPU id를 할당할 수 있다.

<br>

```python
img.to(”cuda:2”) # 2번 GPU에 할당
```

<br>

그러나 파이토치 라이트닝은 multi GPU 환경을 기본으로 하다보니 특정 GPU를 설정하는 기능은 없고 GPU의 갯수만 설정이 가능하다.

<br>

[파이토치 라이트닝 공식 문서](https://pytorch-lightning.readthedocs.io/en/0.9.0/multi_gpu.html)

 위 공식문서에 따르면 분명히 GPU selection을 가능하다고 하지만 토치 라이트닝 2.0.6 버전을 기준으로 gpus라는 argument는 더 이상 사용되지 않는듯하다. 

<br>

<br>

# 2. 해결 방법

파이토치 라이트닝 2.0 버전부터 gpus대신 devices 사용
{:.info}

파이토치 라이트닝 2.0 버전부터는 gpus 대신에 devices argument를 이용해서 GPU device 설정이 가능하다. 

<br>

```python
trainer = Trainer(devices=[0, 1]) # GPU 0, 1번을 이용해서 학습 진행
```

<br>

<br>
