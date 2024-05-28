---
layout: article
title: "DDP에서 텐서 조작 시 발생하는 에러: Process 3 terminated with signal SIGSEGV"
aside:
  toc: true
cover: /assets/others/python.jpg
excerpt: DDP에서 텐서를 임의 조작 시, 발생하는 Process terminated 에러를 해결해봅시다.
---

# 1. 문제 상황

<br>

Pytorch lightning을 이용해서 Semantic Segmentation 모델을 학습 한 후, 이미지를 저장하는 콜백 함수를 구현하였다.

이미지를 저장하기 위해서 img.detach().cpu()를 진행하니 아래와 같은 에러가 발생한다.

```bash
Process 3 terminated with signal SIGSEGV
```

<br>

<br>

# 2. 배경

<br>

파이토치 라이트닝은 기본적으로 Multi GPU를 지원한다.

대게 DistributedDataParallel 방식을 많이 사용하게 되는데, 기존의 파이토치로 복잡하게 구현해야하는 것들을 신경쓰지 않아도 되어 매우 편리하다.

**DDP는 학습을 진행하면 가용 GPU 갯수만큼 프로세스를 나누어 실행한다.**

**이 때문에 위의 문제가 발생한다.**

**내가 특정 텐서를 cpu로 이동시켜 달라는 요청을 보냈지만, 여러 GPU에 텐서가 분할되어 있기 때문에, 파이썬이 어느 GPU의 텐서를 확인해야할지 모르고 길을 잃는것이다**.

때문에, DDP 환경에서 텐서를 조작하기 위해서는 GPU의 인덱스를 명확히 지정해줘야한다.

<br>

<br>

# 3. 해결 방법

<br>

**기존 콜백 함수**

```python
imgs = outputs["image"]
masks = outputs["mask"]

for img, mask in zip(imgs, masks):
	img = to_pil_image(img.detach().cpu())
	y_hat = Image.fromarray(mask.cpu().numpy())
```

<br>

**수정된 콜백 함수**

```python
gpu_idx = trainer.local_rank # 추가된 부분 

imgs = outputs["image"]
masks = outputs["mask"]

if gpu_idx in [0, 1, 2, 3]: # 추가된 부분. 내 경우 GPU가 4개라 이렇게 설정하였음
	for img, mask in zip(imgs, masks):
		img = to_pil_image(img.detach().cpu())
		y_hat = Image.fromarray(mask.cpu().numpy())
```

<br>

위와 같이 현재 프로세스가 돌고 있는 GPU의 인덱스를 확인하고, 해당 GPU를 지정해주는 과정을 추가해주면 문제없이 돌아간다.

<br>