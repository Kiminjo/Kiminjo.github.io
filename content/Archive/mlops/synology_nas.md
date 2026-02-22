---
layout: article
title: Synology NAS API로 데이터 처리 자동화하기
aside:
  toc: true
cover: /assets/backend_mlops/synology_api.jpeg
excerpt: Synology NAS의 API를 이용해 데이터 리스트업 및 다운로드를 자동화하는 방법에 대해 알아보겠습니다.
date: '2024-05-27T00:00:00.000Z'
---

# 1. Synology API 

<br>

우리 회사도 그렇지만, NAS하면 대부분 synology NAS를 사용한다. 

많은 사람들이 사용하는 시스템이라 그런지 스토리지에 접근가능하도록 API도 있다.

거기다가 친절한 사람들이 python으로 wrapper까지 만들어두었다. 

readme 파일이 좀 불친절하긴 하지만 이런 파이썬 서드파티가 있다는게 어디야. 

해당 python wrapper의 깃허브는 아래에 링크를 달아두었다. 

혹시 공식 API 문서를 확인하고 싶은 분들은 아래에 pdf 파일을 첨부해두었으니 참고하시면 된다. 

<br>

[synology API python wrapper github](https://github.com/N4S4/synology-api)

<br>

설치는 아래 명령어를 통해 간단하게 진행할 수 있다. 

<br>

```bash
pip3 install synology-api

# or
python3.6 setup.py install

# or
pip3 install git+https://github.com/N4S4/synology-api
```

<br>

<br>

# 2. API 기반 NAS 접속

<br>

아래의 파이썬 코드를 통해 간단하게 서버에 접속이 가능하다. 

<br>

```python
from synology_api import filestation

fl = filestation.FileStation(<YOUR_NAS_IP>,
                            <YOUR_NAS_PORT>,
                            <YOUR_ID>,
                            <YOUR_PASSWORD>,
                            secure=False, 
                            cert_verify=True, 
                            dsm_version=7, 
                            debug=True, 
                            otp_code=None)
```

<br>

<> 안에는 각자의 NAS 스토리지 IP 주소, 포트 번호, 아이디, 비밀번호를 입력하면 된다. 

그 뒤에 따라오는 파라미터들은 각자 설정해주면 된다. 

해당 wrapper의 Readme에서 변수를 어떻게 설정해야하는지 가이드를 제공한게 있으니 그대로 첨부해두겠다. 

<br>

내 경우에는 https로 접속하기 위해 secure를 True로 바꿔준것 외에 다른 변수는 건드리지 않았다. 

<br>

> the \`secure=True\` variable is needed to be set to true if https is required; default value is \`False\`  
>   
> the \`cert\_verify=True\` is optional, if you want to verify your certificate set it to \`True\`; default value is \`False\`  
>   
> the \`dsm\_version=7\` is optional, make sure to set '7' if you use DSM version 7 or above, if left blank default value will be for DSM 6 or below the \`debug=True\` is optional, if set to False not all responses will return to console  
>   
> If your login require \`otp\_code\` you can set it changing the None value.

<br>

아래의 메시지가 출력되면 성공이다. 

```bash
User logged in, new session started!
```

<br>

<br>

# 3.  데이터 조회 및 다운로드 using API

<br>

접속을 완료했으면 이제 데이터가 있는지 확인하고 해당 데이터를 다운로드 받으면 된다. 

`get_file_list` function을 이용하면 간단하게 데이터를 조회할 수 있다. 

함수의 입력 파라미터로는 조회하고자 하는 디렉토리의 경로를 입력해주면 된다. 

<br>

```python
from synology_api import filestation

fl = filestation.FileStation(<YOUR_NAS_IP>,
                            <YOUR_NAS_PORT>,
                            <YOUR_ID>,
                            <YOUR_PASSWORD>,
                            secure=False, 
                            cert_verify=True, 
                            dsm_version=7, 
                            debug=True, 
                            otp_code=None)

# 데이터 조회 
data_list = fl.get_file_list(directory_path)
```

<br>

위 코드를 실행하고 `data_list`를 프린트해보면 해당 경로에 있는 파일, 폴더들이 아래와 같이 쭈우욱 출력된다. 

파일인 경우 isdir이 False로 출력되고 폴더인 경우에는 True로 출력된다.

<br>

```bash
{'data': {'files': [{'isdir': False,
    'name': 'a.png',
    'path': '/home/data/a.png'},
   {'isdir': False,
    'name': 'b.png',
    'path': '/home/data/b.png'},
   {'isdir': True,
    'name': 'c',
    'path': '/home/data/c'},
...
    'name': 'z.png',
    'path': '/home/data/z.png'}],
  'offset': 0,
  'total': 26},
 'success': True}
```

<br>


**🛎️ 안내**    
synology API에서는 data download에 특화된 DownloadStation을 제공합니다.       
제 경우에는 권한 문제로 때문에 해당 스테이션을 사용할 수 없어, FileStation을 이용하여 데이터 다운로드 코드를 구현하였습니다.       
FileStation에서는 폴더 다운로드, 저장될 경로 지정 등 기본적인 편의성이 제공되지 않아 직접 구현해야하니 권한 문제만 없으시다면 DownloadStation을 이용하시기 바랍니다. 
{:.success}

<br>

내가 a.png 파일을 다운로드 받고 싶다면은 `get_file` 함수를 사용해서 데이터를 다운로드 받을 수 있다. 

이 함수도 다운로드 받고자하는 데이터 경로를 입력으로 받는다. 좀 아쉬운 점은 다운로드 후 저장되는 위치를 지정할 수 없다. 

<br>

예를 들어 아래와 같이 디렉토리 구조가 설정되어있다고 가정해보자. 

내 원래 의도는 다운로드된 데이터들은 data 폴더에 저장하는거다.

<br>

```bash
home 
ㄴ data
ㄴ workspace 
   ㄴ data_download.py
```

<br>

`data_download.py`를 실행해서 데이터를 다운로드 받으면 자동으로 workspace 아래로 데이터가 다운로드 된다. 

혹시 변경 가능한 방법을 안다면 댓글로 공유해주시라. 때문에 나는 shutil 모듈을 이용하여 다운로드된 이미지의 위치를 변경해주었다. 

<br>

```python
from synology_api import filestation
import shutil 

fl = filestation.FileStation(<YOUR_NAS_IP>,
                            <YOUR_NAS_PORT>,
                            <YOUR_ID>,
                            <YOUR_PASSWORD>,
                            secure=False, 
                            cert_verify=True, 
                            dsm_version=7, 
                            debug=True, 
                            otp_code=None)
                            
# 데이터 다운로드 
fl.get_file("/home/data/a.png")

# 데이터 이동 
shutil.mv("a.png", "/home/data")
```

<br>

이렇게 하면 다소 번거롭기는 하지만 원하는 위치에 데이터를 다운로드 받을 수 있다. 

여러 데이터를 다운로드 받고 싶다면 어쩔 수 없이 재귀적으로 폴더를 읽는 함수를 구현해야한다. 

아래에 내가 구현한 코드를 첨부해두었으니 필요에 맞게 변형해서 사용하시면 된다. 

<br>

<br>

# 4. 최종 코드

<br>

```python
from synology_api import filestation
from pathlib import Path 
import shutil

def download_all_images(directory_path,
                        local_download_path):    
    fl = filestation.FileStation(<YOUR_NAS_IP>,
                            <YOUR_NAS_PORT>,
                            <YOUR_ID>,
                            <YOUR_PASSWORD>,
                            secure=False, 
                            cert_verify=True, 
                            dsm_version=7, 
                            debug=True, 
                            otp_code=None)
    download_images_recursive(directory_path,
                              local_download_path,
                              fl)

def download_images_recursive(directory_path,
                              local_download_path,
                              fl):
    data_list = fl.get_file_list(directory_path)
    image_files = [file_info['path'] for file_info in data_list['data']['files'] if not file_info['isdir'] and file_info['name'].lower().endswith(('.png', '.jpg', '.jpeg'))]
    subdirectories = [file_info['path'] for file_info in data_list['data']['files'] if file_info['isdir']]
    
    # 현재 디렉토리의 이미지 파일 다운로드
    for image_file in image_files:
        try: 
            fl.get_file(image_file,
	                    mode="download")
            file_name = Path(image_file).name
            src_file_path = remove_n_top_dirs(image_file, 2)
            dst = Path(local_download_path, Path(src_file_path).parent)
            dst.mkdir(parents=True, exist_ok=True)
            shutil.move(file_name, dst)
        except:
            pass
    
    # 하위 디렉토리의 이미지 파일 재귀적으로 다운로드
    for subdir in subdirectories:
        download_images_recursive(subdir,
                                  local_download_path,
                                  fl)
```

<br>

<br>

# 5. 끝으로

<br>

생각보다 API가 너무 잘 되어있어서 수월하게 구현했다. 

이제 Airflow 파이프라인을 이용해서 이것들을 자동화해야지...

<br>

<br>
