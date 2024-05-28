---
layout: article
title: Langchain의 Prompt 구조
aside:
  toc: true
cover: /assets/ml/langchain_image.png
excerpt: 언제봐도 헷갈리는 Langchain의 Prompt format에 대해 정리해보겠습니다.
---

# 1. 개요 및 필요성

- <u>prompt template을 쉽게 재사용할 수 있도록 만들어진 langchain 내장 툴</u>
- user prompt, system\_prompt별로 명확하게 용도를 구분할 수 있음
- llm모델에 탑재가 용이함 ("\|" 기호를 이용해 모델에 프롬프트를 연결할 수 있음)
- 다만, 동일한 역할을 하는 함수의 종류가 많아서 어느 경우에 뭘 써야할지 좀 헷갈림

<br>

```python
system_prompt_template = "Tell me a {adjective} joke about {content}."
system_prompt = system_prompt_template.format(**{
                                                 "adjective": "funny",
                                                 "content": "chicken"
})

prompt = [
 {"role": "system", "content": system_prompt},
 {"role": "user", "content": "hello"}
]

completion = client.chat.completions.create(model="model-identifier", 
                                            messages=prompt, 
                                            temperature=0.7) 
```

<br>

-   Langchain prompt template

```python 
from langchain_core.prompts import PromptTemplate

system_prompt_template = "Tell me a {adjective} joke about {content}."

prompt_template = PromptTemplate.from_template(system_prompt_template)
prompt_template.format(adjective="funny", 
                       content="chickens") 

chain = prompt | llm 
```

<br>

<br>

# 2. 용어 정리

<br>

## 2-1. Message

-   Langchain에서는 정적인 형태의 입력을 메시지라고 표현
-   당장 LLM 모델에 입력 가능한 텍스트 형태를 의미함

<br>

```python
"""
Hello. My name is Injo. How are you? 
""" 
```

<br>

## 2-2. Prompt Template

-   동적으로 내용 변경이 가능한 형태의 문자열을 템플릿이라고 표현

<br>

```python
# name 변수에 실제 사람 이름을 넣어야함 

"""
Hello. My name is {name}. How are you?
"""
```

<br>

<br>


# 3. Prompt 관련 함수 종류

<br>

## 3-1. PromptTemplate

-   단일 메시지를 프롬프트로 변환하기 위해 만들어진 템플릿
-   python str의 format syntax를 이용해 dynamic하게 설정 가능

<br>

```python
# 방식 1. template을 먼저 지정한 후, format 함수를 이용해 templating 
# langchain에서도 추천하는 방식 

from langchain_core.prompts import PromptTemplate

prompt_template = PromptTemplate.from_template(
    "Tell me a {adjective} joke about {content}."
)
prompt_template.format(adjective="funny", content="chickens")
```

<br>

```python
# 방식 2. template 지정과 변수할당을 동시에 하는 방식
# 복잡하고 langchain에서도 추천하지는 않는 방식

from langchain_core.prompts import PromptTemplate

prompt = PromptTemplate(input_variables=["foo"], template="Say {foo}")
```

<br>

<br>

## 3-2. ChatPromptTemplate

-   입력 프롬프트를 변환하기 위해 만들어진 템플릿
    -   여러개의 메시지들이 모아 하나의 프롬프트를 생성함
    -   그러므로, PromptTemplate과 달리, "role"을 지정해줘야함
-   OpenAI의 template 형태와 유사함
-   방법 1처럼 str로 된 prompt를 직접 지정할 수 있지만, 방법 2와 같이 MessagePrompts를 이용해 구성할 수도 있음

<br>

```python
# 방법 1. str을 이용해 ChatPromptTemplate을 지정하는 방식 
# role을 튜플 형태로 명시해줘야함

from langchain_core.prompts import ChatPromptTemplate

chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful AI bot. Your name is {name}."),
        ("human", "Hello, how are you doing?"),
        ("ai", "I'm doing well, thanks!"),
        ("human", "{user_input}"),
    ]
)

messages = chat_template.format_messages(name="Bob", user_input="What is your name?")
```

<br>

```python
# 방법 2. MessagePrompt(SystemMessage, HumanMessage) 등을 이용해서 프롬프트를 지정하는 방식

from langchain_core.messages import SystemMessage
from langchain_core.prompts import HumanMessagePromptTemplate

chat_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(
            content=(
                "You are a helpful assistant that re-writes the user's text to "
                "sound more upbeat."
            )
        ),
        HumanMessagePromptTemplate.from_template("{text}"),
    ]
)
messages = chat_template.format_messages(text="I don't like eating tasty things")
print(messages)
```

<br>

<br>

## 3-3. MessagePrompt

프롬프트가 정적(메시지)이냐 동적(템플릿)이냐에 따라 두 종류로 나뉨

<br>

-   정적인 프롬프트
    1.  AIMessage
    2.  HumanMessage
    3.  SystemMessage

<br>

-   동적인 프롬프트
    1.  AIMessagePromptTemplate
    2.  HumanMessagePromptTemplate
    3.  SystemMessagePromptTemplate

<br>

```python
# 정적인 프롬프트 
# messages function 사용 

from langchain_core.messages import AIMessage, HumanMessage  

human_message = HumanMessage(content="What is the best way to learn programming?")  
ai_message = AIMessage(  
content="""\  
1. Choose a programming language: Decide on a programming language that you want to learn.  

2. Start with the basics: Familiarize yourself with the basic programming concepts such as variables, data types and control structures.  

3. Practice, practice, practice: The best way to learn programming is through hands-on experience\  
"""  
)
```

<br>

```python
# 동적인 프롬프트 
# templates function 사용 

from langchain_core.messages import SystemMessage  
from langchain_core.prompts import HumanMessagePromptTemplate  

chat_template = ChatPromptTemplate.from_messages([
                    SystemMessage(content=(  
                        "You are a helpful assistant that re-writes the user's text to "  
                        "sound more upbeat."  
                    )  
                    ),  
                    HumanMessagePromptTemplate.from_template("{text}"),  
            ]  
)
```

<br>

<br>


# 4. LCEL

LCEL: LangChain Expression Language  
  
<br>  

-   PromptTemplate과 ChatPromptTemplate에 적용 가능한 함수
-   프롬프트의 형식을 변환하거나, 동적으로 변수를 지정하는데 사용함
-   주요 method
    -   invoke
    -   stream
    -   batch

<br>

```python
# invoke method 
# python str의 format과 유사 

prompt_template = PromptTemplate.from_template(
    "Tell me a {adjective} joke about {content}."
)

prompt_val = prompt_template.invoke({"adjective": "funny", "content": "chickens"})
```

<br>

<br>

# 5. 내가 사용하는 방식

- `set_prompt` method 구성
    -   용도: System prompt 및 Fewshot prompt 설정

```python
from langchain_core.prompts import SystemMessagePromptTemplate, ChatPromptTemplate

def set_prompt():
    system_prompt = "hello. my name is {name}"
    system_prompt_template = SystemMessagePromptTemplate.from_template(system_prompt)

    input_prompt_template = ChatPromptTemplate.from_messages([
                                system_prompt_template
    ])

    input_message = input_prompt_template.format_messages(**{"name": "injo"})

    retrun input_message
```

<br>

- user message 추가 후 LLM 모델에서 RUN

```python
from langchain_core.messages import HumanMessage

def generate(query: str): 
    input_prompt = set_prompt()

    user_message = HumanMessage(content=query)
    input_prompt.append(user_message)

    llm.invoke(input_prompt)
```
  
<br>

<br>