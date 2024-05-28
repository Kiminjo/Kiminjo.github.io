---
layout: article
title: "Argument가 두개 이상의 데이터 타입을 가질 때 type 지정"
aside:
  toc: true
cover: /assets/others/python.jpg
excerpt: Argparse에서 value가 두가지 이상의 타입을 가질 수 있을 때 type을 지정하는 방법에 대해 알아보겠습니다.
---

# 1. 문제 상황 

<br>

parser를 사용하다보면 하나의 argument에 두개 이상의 value type이 가능한 경우가 있다.

내가 맞닥뜨린 경우는 아래와 같다.

<br>

-   data loader 구축 시 class 정보를 받는 `--classes` argument를 지정
-   `--classes oil scratch` 인 경우, 클래스는 oil, scratch 두가지가 존재
-   `--classes` 미지정시 None을 반환

<br>

물론, 미지정 시 ‘’(빈 string)을 반환하여 타입의 통일성을 줄 수도 있었겠지만 이후 구현 편의를 위해 저렇게 타입을 나누게 되었다.

<br>

위의 경우, --idx argument는 None과 str 두 가지 value type을 가지게 된다. 

이걸 `add_argument`시 type에 명시해줘야하는데, 함수의 타입 힌트처럼 `Union[str, None]`로 지정하면 타입 에러가 발생한다.

<br>

# 2. 해결 방법

<br>

[https://stackoverflow.com/questions/34080342/argument-parser-with-mixed-type-of-args-input-in-pythons-argparse-module](https://stackoverflow.com/questions/34080342/argument-parser-with-mixed-type-of-args-input-in-pythons-argparse-module)


<br>

위 stackoverflow를 보고 문제를 해결하였다.

argparse에서 여러개의 타입을 받기 위해서는 별도의 함수를 지정해줘야한다. 

내 경우에는 None과 str 두가지 타입이었으므로 다음과 같이 구현해주었다.

```python
def str_or_none(value):
	if value == "None":
		return None
	else 
		return value
```

<br>

None을 str로 인식 후, “None”이라는 단어가 발견되면 None type으로 변환해주는 코드이다. 

다소 번거롭긴하지만 이런 식으로 하나의 argument에 여러개의 value type을 지정할 수 있다.

<br>

```python
import argparse 
from utils import str_or_none

parser = argparse.ArgumentParser()
parser.add_argument("--clases",
                    type=str_or_none,
                    default=None)
args = parser.parse_args()
```

<br>

<br>