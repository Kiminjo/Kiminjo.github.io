---
layout: article
title: base64를 이용해 이미지 데이터 압축하기
permalink: /others/base64
aside:
  toc: true
cover: /assets/others/python.jpg
tags: 
    - base64
    - encoding
    - image encoding
excerpt: 고차원의 데이터를 압축하기 위한 base64 인코딩 방법에 대한 기본 개념에 대해 알아보고 파이썬으로 구현해보겠습니다. 
---


# 1. 인코딩이란? 

- 데이터의 표준화, 보안, 처리 속도 향상 등을 목적으로 다른 형식이나 형태로 변환하는 것을 의미함
- 데이터를 압축하는 과정으로 이해하면 됨 

<br>

<br>

# 2. Base64 인코딩 

- 0과 1로 이루어진 Binary data를 Text 형태로 변환하는 인코딩 

![base64_table](/assets/others/base64/base64_table.webp)

<br>

- 64는 64진법을 의미 
	-  `A-Z`, `a-z`, `0-9`, `+`, `/` 의 기호들을 다 합치면 모두 64개임 
	- 이들을 사용해서 데이터를 표현하는 방식을 Base64라고 부름

<br>

- 1바이트는 8개의 비트의 묶음 인것과 같이, Base64는 4개의 문자열을 하나의 그룹으로 봄
	- 왜 하필 4개의 문자열을 하나로 볼까? 
		- 바이트와의 단위를 맞추기 위함 
		
        <br>

	- $64 = 2^6$ 으로 Base64의 문자열 하나로 6비트의 데이터를 표현할 수 있음 
		- 그런데, 일반적으로 1byte는 8비트임 
		- 이로 인해, 2비트의 차이가 생김 
		
        <br>

	- 이때문에 1바이트와 Base64의 최소 공배수인 24비트를 기준으로 변환을 진행함 
		- Base64 변환 시에는, 3바이트의 문자열을 4개의 문자열로 변환함 
		- 3바이트 문자열은  3 * 8비트으로 24비트 
		- 4개의 문자열은 4 * 6비트로 24비트

<br>

- `=`  기호의 의미  
	- 패딩 문자열 
	- 인코딩하는 컨텐츠가 3개의 문자열로 끝날 시, 길이를 맞춰주기 위해 마지막에 `=`를 넣음 

<br>

<br>

# 3. Base64 변환 예시 

1. **Man Encoding 예시**


![man_encoding_example](/assets/others/base64/man_encoding.webp)


`Man` 이라는 알파벳을 2진법으로 표현한 경우와 Base64로 표현한 경우를 보여줌 
공교롭게, Man이 3바이트로 표현되므로, 4개의 문자열로 표현이 가능함 

<br>

2. **Ma Encoding 예시**

![ma_encoding_example](/assets/others/base64/ma_encoding.webp)

`Ma` 라는 단어를 인코딩 시에, 총 16개의 비트(2바이트)로 표현이 가능함 
다만, Base64는 6의 배수로만 동작하므로 18 비트를 사용해야함 

이때, 남은 2비트에 0을 채운 뒤, 이에 해당하는 문자열을 사용함 

3개의 문자열로 Ma를 표현 후 마지막 남은 한개의 공간은 =로 채워줌 

<br>

<br>

# 4. Base64 인코딩 및 디코딩 파이썬 코드 구현 

```python 
import base64
import numpy as np
from PIL import Image 


# 이미지 주소를 기반으로 인코딩하기
with open("image.jpg", "rb") as image_file: encoded_string = 
	encoded_img = base64.b64encode(image_file.read()).decode()

# numpy array를 기반으로 인코딩하기 
img = Image.open("image.jpg").convert("RGB")
img = np.array(img)

img = img.tobytes()
encoded_img = base64.b64encode(img).decode()
```

- b64encode() 시, byte 문자열로 변환 해줌 
- 이를 텍스트 형태로 변환하기 위해서는 .decode() method를 실행해야함 

<br>

```python 
# 인코딩된 텍스트를 다시 numpy array로 변환하기 
import numpy as np
import base64

img = base64.b64decode(encoded_img)
img = np.frombuffer(img, dtype=np.uint8)

img = np.reshape(img, (h, w, -1))   # 디코딩 시, 1 array 형태로 출력되므로 이미지 모양으로 복원 필요
```

<br>

<br>

