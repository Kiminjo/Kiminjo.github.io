---
layout: article
title: MySQL 설정 방법, 명령어, 키워드 및 자료구조 정리
aside:
  toc: true
cover: /assets/backend_mlops/mysql_thumbnail.jpg
excerpt: MySQL의 설치 방법과 초기 세팅 방법, 기본적인 명령어에 대해서 알아보겠습니다.
---

# 0. 설치

```bash
brew install mysql	# Mac 기준
```

<br>

<br>


# 1. 기본 세팅 방법


## MySQL 서버 실행 

```shell
mysql.server start 
```

<br> 

## MySQL 서버 종료 

```shell
mysql.server stop
```

<br>

## MySQL 접속

```shell
# without password
mysql -u root

# with password 
mysql -u root -p
```

<br>

## MySQL 서버 비밀번호 설정 

```SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY '<YOUR_PASSWORD>';
```

<br>

## 데이터베이스 생성 
```SQL
CREATE DATABASE <YOUR_DB_NAME>;
```

<br>

## 데이터베이스 조회 

```SQL
SHOW DATABASES;
```

<br>

## 데이터 저장 위치 조회 

```SQL
SHOW VARIABLES LIKE 'datadir';
```

<br>

## 테이블 생성 

```SQL
CREATE TABLE <YOUR_TABLE_NAME>(
	COLUMN1 INT PRIMARY, 
	COLUMN2 VARCHAR(50),
	COLUMN3 VARCHAR(100) NOT NULL, 
	COLUMN4 INT CHECK (COLUMN4 > 18),
	COLUMN5 INT DEFAULT 1,
	...
)
```

<br>

## 데이터베이스 삭제 

```SQL
DROP DATABSE <YOUR_DB_NAME>;
```

<br>

<br>

# 2. 테이블 생성 관련 문법

- `PRIMARY KEY`: 해당 column을 테이블의 primary 키로 지정함
	- 각 행을 고유하게 식별하는데 사용되는 column으로 반드시 unique한 값을 가져야함 
	- 각 테이블에는 반드시 최대 1개의 primary key만 있을 수 있음   

<br>
   
- `UNIQUE`: 해당 column은 unique한 값을 가지도록 지정함 
	- `PRIMARY KEY`와 유사하나, UNIQUE는 여러 column을 지정할 수 있음
    
<br>
   
- `FORIEGN KEY`: 다른 테이블의 열을 참조할 때 사용함 
	- 주로 `REFERENCES`(참고할 테이블)와 함께 사용함 
	- 다른 테이블의 PRIMARY KEY를 연결하는데 주로 사용 
    
<br>
   
- `NOT NULL`: 해당 column은 NULL 값을 허용하지 않음 

<br>
   
- `AUTO_INCREMENT`: index primary key의 값을 자동으로 증가시키는데 사용함 
	- 행이 추가되면 자동으로 `이전 행 + 1` 의 값이 인덱스로 할당됨 
    
    <br>
   
- `CHECK`: 해당 column의 값의 범위 또는 조건을 지정하는데 사용함 

<br>
   
- `DEFAULT`: 해당 데이터가 삽입되지 않을 경우, 지정된 기본값을 삽입함 


<br>

<br>


# 3. Column 자료구조

- **INTEGER(INT)**: 정수를 저장하는 데 사용되는 자료형임 
	- 일반적으로 정수 값을 저장하는 데 사용되며, 범위에 따라 다양한 크기의 정수를 지원함 
	- 유사한 자료 구조: `INT`, `SMALLINT`, `TINYINT`, `BIGINT` 등
    
<br>

- **VARCHAR(n)**: 가변 길이의 문자열을 저장하는 데 사용되는 자료임 
	- `n`은 최대 길이를 나타내며, 실제로 저장된 값에 따라 길이가 변함 
    
<br>

- **TEXT**: 대용량의 문자열을 저장하는 데 사용되는 자료형임 
	- VARCHAR와 유사하지만, TEXT는 더 많은 양의 텍스트 데이터를 저장할 수 있음  
	- 일반적으로 TEXT 자료형은 매우 큰 텍스트 블록을 저장하는 데 사용됨
    
<br>
    
-  **DATE/DATETIME/TIMESTAMP**: 날짜와 시간을 저장하는 데 사용되는 자료형임 
	- DATE는 날짜 값을 저장함 
	- DATETIME는 날짜와 시간 값을 저장함 
	- TIMESTAMP는 날짜와 시간 값을 저장함
    
<br>
    
- **BOOLEAN**: 논리값을 저장하는 데 사용되는 자료형임 
	- 대개 TRUE 또는 FALSE 값을 저장함
    
<br>
    
-  **DECIMAL/NUMERIC**: 고정 소수점 숫자를 저장하는 데 사용되는 자료형임 
	- DECIMAL과 NUMERIC은 정확한 숫자를 저장하는 데 사용됨

<br>

<br>

# 출처

- [Homebrew로 MySQL 설치/실행/종료 + DB 생성 및 조작](https://velog.io/@xxeol/Homebrew%EB%A1%9C-MySQL-%EC%84%A4%EC%B9%98%EC%8B%A4%ED%96%89%EC%A2%85%EB%A3%8C)

<br>

<br>
