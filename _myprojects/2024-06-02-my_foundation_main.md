---
layout: article
title: "나만의 Foundation 모델 라이브러리 만들기 - Overview"
permalink: /projects/my_foundations/overview
aside:
  toc: true
sidebar:
  nav: my_foundation
cover: /assets/projects/my-foundations/llm_thumbnail.png
tags: my_foundations
excerpt: 저만의 Custom Foundation Model용 라이브러리를 구축한 이유와 주요 모델들에 대해 설명드릴게요.
---


## 1. 목적

<br>

- **간편한 응용** 
	- 핵심 Foundation 모델을 모듈화해둠으로서 개인 프로젝트 시, 간편하게 import 하여 사용하는 것을 목표로 함 
	- 사이드 프로젝트 과정에서 AI 파트에 대한 공수는 최소화하고 백엔드 구현에 최대한 집중할 수 있음 

<br>

- **빠른 신기술 적용** 
	- OpenAI, Meta 등에서 발표하는 신기술을 빠르게 적용하고 테스트할 수 있음
	- ChatGPT, Llama 계열 등 기존에 발표했던 모델과 유사한 형태의 인터페이스로 배포하기 때문에, 한번 모듈화해두면 빠르게 적용해볼 수 있음 

<br>

<br>

## 2. Langchain을 사용하지 않는 이유 

<br>

쉽게 사용할 수 있는 LLM 라이브러리는 이미 많이 있음

대표적으로 `Langchain` & `LlamaIndex`

그런데 왜 나는 위의 라이브러리를 사용하지 않고 직접 만들고자 하는가? 

<br>

가장 주요한 이유: 속도 

<br>

연구 목적에서는 최대한 파라미터 크기를 키우는 것이 중요함 

그러나, <u>제품 및 서비스화 하는 과정에서는 빠른 속도 및 경량화가 더 중요하다고 판단하였음</u>

<u>Langchain의 경우, 간편한 사용성 및 높은 성능을 보장하지만, 다소 속도가 느린 경향이 있음</u>

이에, 앱을 구현하는 과정에서 사용하기엔 부적합하다 판단하였음 

<br>

이러한 이유로 나만의 Custom Foundation Model을 모아둔 별도의 라이브러리를 구축하기로 결심

<br>

<br>

## 3. 구현 범위 

<br>

### 3-1. Text 

**Models** 
- OpenAI 
- Ollama
- Groq 
- LMStudio 

<br>

**Tools** 
- RAG 
- Model compare 

<br>

### 3-2. Image 

**Models**
- SAM(SegmentAnythingModel)
- YOLO v8 

<br>

**Tools**
- Search Similar Object

<br>

### 3-3. Audio

**Models**
- OpenAI
	- GPT-4o 
	- Whisper

<br>

### 3-4. Multi-Modal

**Models**
- GroundingDino
	- 텍스트를 기반으로 zero shot object detection 수행 
- OWL
	- 텍스트를 기반으로 zero shot object detection 수행 
- GroundedSAM 
	- 텍스트를 기반으로 zero shot semantic segmentation 수행
- Stable-diffusion 
	- 텍스트를 기반으로 이미지 생성  

<br>

**Tools**
- Search Similar Object

<br>

### 3-5. Light Model 

**Methods**
- Quantization
- Pruning

<br>

<br>