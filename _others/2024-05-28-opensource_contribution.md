---
layout: article
title: 오픈소스 contribution 후기 - Anomalib
aside:
  toc: true
cover: /assets/others/coding.png
excerpt: 처음으로 대형 오픈소스에 contribution을 하며 느꼈던 점에 대해 공유해봅니다.
---

오픈소스 contributor는 소수의 천재들만 하는건줄 알았다. 

모두가 사용하는 대형 오픈소스의 개발자들이라면 이미 나보다 몇배나 더 많은 짬밥을 먹은 고인물들일텐데, 그들이 구현한 코드에서 로직상 비효율적인 부분을 발견하고 수정하려면 그 사람들보다 더 천재여야한다는 생각이 있었다. 

<br>

근데 업무를 하고 여러 오픈소스를 리뷰해보면서 느낀 점은 제 아무리 대형 오픈소스 개발자들이라고 할지라도 사람들이라는 것이다. 

당연히 오탈자나 비효율적인 로직이 있을 수 밖에 없다. 

그리고 그러한 비효율성은 개발자 본인보다는 그 코드를 사용하기 위해 리뷰하고 뜯어보는 사람들이 더 잘 발견한다. 

<br>

이번에 Anomalib이라는 이상치 탐지 오픈소스를 사용하면서 그러한 문제점을 발견하였고, 난생 처음 오픈소스에 컨트리뷰션에 도전해보기로 했다. 

<br>

# 기존 코드의 문제점 

<br>

내가 수정한 곳은 README 파일과 Model의 config 파일이다. 

yaml파일에 기입된 파라미터들을 읽어와서 모델과 데이터로더를 구축하는 방식인데, 모델의 내부 로직이 수정되면서 yaml 파일에 3가지 key가 추가됐어야했다. 

그런데 몇몇 모델들의 yaml 파일에는 추가되지 않은 옛 버전으로 남아 있어 코드가 실행되지 않는 에러가 발생하였다. 

<br>

나름 스타 수가 2,300개나 되는 대형 레포지토리에서 발생한 크리티컬한 이슈인데 버그가 여전히 방치되어 있길래 재빨리 내가 수정해버렸다. 

<br>

<br>

# 컨트리뷰션 과정 

<br>

[How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

<br>

[How to Contribute to Open Source Projects – A Beginner's Guide](https://www.freecodecamp.org/news/how-to-contribute-to-open-source-projects-beginners-guide/)

<br>

위 두개의 문서를 보고 그대로 따라했다. 

특히 아래 문서가 가독성이 좋아서 처음 풀리퀘스트를 보내는 뉴비라면 읽어보길 권장한다. 

<br>

전체적인 진행 순서는 아래와 같다. 

<br>

1.  내 저장소로 코드 포크하기 
2.  클론 받은 후 수정하기 
3.  수정 후 포크한 레포지토리에 푸쉬하기 
4.  PR 생성하기 

<br>

각 과정에 대한 자세한 내용은 위에 달아둔 두 링크에 너무 잘 설명되어 있으니 굳이 여기서 더 쓰지는 않겠다. 

[꼼수로 오픈소스 기여하기](https://well-balanced.medium.com/%EA%BC%BC%EC%88%98%EB%A1%9C-%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4-%EA%B8%B0%EC%97%AC%ED%95%98%EA%B8%B0-b34ee4cc2bc2)

<br>

그리고 이 포스팅을 보면 먼저 이슈를 남기고 assignee로 배정받은 후에 진행하는 것이 상도덕인 것 같지만 나는 저 절차대로 하진 않았다. 

생각해보니 소유자 입장에서는 왠 이상한 코리안으로부터 뜬금없이 PR을 받으면 당황스러울수도 있겠다. 

앞으론 미리 이슈를 남기고 충분한 논의를 거친 후에 작업에 들어가야지...

<br>

# 기여 완료

<br>

![opensource_contribution](/assets/others/github_contribution.png)

<br>

수정 내역을 보면 알겠지만 진짜 별거 안했다. 

그냥 config 파일에 key 몇개 추가해준것만으로도 오피셜하게 컨트리뷰터로 인정받았다. 

이렇게 쉬운데 왜 그동안 쫄아서 시작도 못하고 있었을까...

<br>

뭐든지 처음이 어려운것이지 막상 해보면 별거 아니라는 교훈을 다시 한번 느낀다. 

이번 건을 시작으로 나도 좀 활발하게 오픈소스에 기여를 해야겠다는 생각이 든다.

<br>

<br>