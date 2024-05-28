---
layout: article
title: Argparse store_true, store_fasle 사용법
aside:
  toc: true
cover: /assets/others/python.jpg
excerpt: Argparse에서 제공하는 store_true 및 store_false arugument 사용법에 대해 알아봅시다.
---

# 1. 문제 상황

argparse로 특정 인수의 값을 True 또는 False를 받기 위해 다음과 같이 파이썬 코드를 짜고 실행했는데 원하는 결과가 나오지 않았다.

```python
# main.py
import argparse 

parser = argparse.ArgumentParser()
parser.add_argument("--test",
                    type=bool,
                    default=False)
args = parser.parse_args()

print(args.test)
```

<br>

```bash
python main.py --test False 
>> True
```

<br>

분명 나는 False를 줬는데 왜 True가 반환되는 것일까?

그럼 False를 반환받으려면 어떻게 해야할까?

<br>

<br>

# 2. 원인 파악

가장 먼저 떠오른 가능성은 False를 bool type이 아니라 str로 읽고 있을 가능성이 있다.

그렇다면 빈 문자열을 입력으로 넣으면 False가 반환될것이다.

<br>

```bash
python main.py --test ''
>>
```

<br>

빙고! 아무것도 반환되지 않는 것으로 보아 False를 반환하였다.

chatGPT 피셜로 버전에 따라 이러한 이슈가 있을 수도 있다고 한다.

<br>

<br>

# 3. 해결 방법

[https://ko.from-locals.com/python-argparse-bool/](https://ko.from-locals.com/python-argparse-bool/)

<br>

위 블로그에서 bool 대신 `store_true`, `store_false`를 사용하기를 권장한다.

어쩐지, 오픈소스를 보다보면 parser를 `store_true`나 `store_false`로 지정해준 경우를 많이 봤었는데 이런 이유 때문이었나보다.

그렇다면 `store_true`와 `store_false`는 어떻게 사용하는 건지 예제와 함께 알아보도록 하자.

일단 두괄식으로 결과 먼저 적어두고 가겠다. 

<br>

| **action** |  **기본값(인수 미지정)** |  **인수 지정 시** |
| --- | --- | --- |
| `store_true` | False | True |
| `store_false` | True | False |

인수의 action을 `store_true`로 지정했을 때의 예시이다.

<br>

```python
# main.py
import argparse 

parser = argparse.ArgumentParser()
parser.add_argument("--test",
                    action="store_true"  # 이 부분!!   
                    )
args = parser.parse_args()

print(args.test)
```

<br>

```bash
python main.py 
>> 

python main.py --test 
>> True
```

<br>

위의 예시를 보면 알겠지만, `store_true`로 지정된 인수는 값을 받지 않는다.

인수를 지정하면은 True를 반환하고 그렇지 않으면 False를 반환하는 구조이다.

일종의 스위치라고 보면 편하다.

반대로 `store_false`로 지정했을때의 예시도 같이 보겠다.

당연하겠지만 `store_true`와 반대로 동작한다.

<br>

```python
# main.py
import argparse 

parser = argparse.ArgumentParser()
parser.add_argument("--test",
                    action="store_false"  # 이 부분!!   
                    )
args = parser.parse_args()

print(args.test)
```

<br>

```bash
python main.py 
>> True

python main.py --test 
>> 
```

<br>

예상대로 `store_true`와 반대로 동작했다.

`store_false`는 인수를 호출하지 않으면 True값을 저장하고 있다가, 인수를 불러오면 False의 값을 반환한다.

정리하면 다음과 같다.

<br>

| **action** |  **기본값(인수 미지정)** |  **인수 지정 시** |
| --- | --- | --- |
| `store_true` | False | True |
| `store_false` | True | False |

<br>

예상하지 못한 오류가 즐비한 type=bool을 쓰는것보다 이런식으로 `store_true`와 `store_false`로 스마트하게 코딩하자.

<br>

<br>