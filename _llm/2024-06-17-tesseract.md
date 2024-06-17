---
layout: article
title: "Tesseract로 한국어 OCR 진행하기"
aside:
  toc: true
cover: /assets/ml/tesseract/Tesseract OCR.jpg
excerpt: OCR 엔진인 Tesseract의 사용법과 한국어 OCR 진행 방법에 대해 알아보겠습니다. 
tags:
    - OCR
    - tesseract
    - Korean OCR
---

# 1. 설치

## 1-1. Tessearct 설치 
```bash
brew install tesseract
brew install tesseract-lang
```

<br>

- 일반 tesseract는 영어 등 소수의 언어만 지원함 
- 한국어 OCR을 진행하기 위해서는 별도의 `tesseract-lang` 라이브러리도 설치해야함 

<br>

## 1-2. Python용 Tesseract 라이브러리 설치 
```bash 
# pip 
pip install pytesseract

# poetry 
poetry add pytesseract
```

<br>

## 1-3. 한국어 pretrained 모델 다운로드 받기 

[다운로드 링크](https://github.com/tesseract-ocr/tessdata/)

- 위 링크에서 `kor.traineddata` 파일 다운로드 
- 다운로드 과정에서 이름이 변경될 수 있음 
	- 이 경우, 다시 `kor.traineddata`로 이름 변경해주면 됨 

<br>

## 1-4. tessdata 폴더에 다운 받은 한국어 pretrained 파일 위치 시키기 

- 맥의 경우, 통상적으로 `/usr/local/share/tessdata/` 위치에 tessdata 폴더가 생성됨 

<br>

**해당 위치에 tessdata 폴더가 없는 경우, tessdata 폴더를 찾는 방법**
```bash
brew install tesseract
```
위 명령어를 통해서 tesseract가 설치된 폴더를 찾을 수 있음  
-  해당 폴더는 대게 `/usr/local/Cellar/tesseract/4.1.1/` 와 같은 형태이-> 마지막은 버전 
-  이경우, tessdata 폴더는 `/usr/local/Cellar/tesseract/4.1.1/share/tessdata/` 경로에 위치함
- 해당 위치에 다운로드 받은 `kor.traineddata` 파일을 붙여넣으면 됨
{:.info} 

<br>

<br>

# 2. 예제 코드 

한국어 OCR 

```python
from PIL import Image import pytesseract 

# 이미지 열기 
image = Image.open('path_to_your_image.png') 

# 한국어 설정으로 이미지에서 텍스트 추출 
text = pytesseract.image_to_string(image, lang='kor') 

print(text)
```


<br>

한국어 + 영어 OCR 

```python
from PIL import Image import pytesseract 

# 이미지 열기 
image = Image.open('path_to_your_image.png') 

# 한국어 설정으로 이미지에서 텍스트 추출 
text = pytesseract.image_to_string(image, lang='kor+en') 

print(text)
```

<br>

<br>



