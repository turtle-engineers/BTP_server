# BTP_server
node + express server

**211107**
>서버 구동 시 pm2 를 사용합니다.   
>package.json 파일 내 "scripts"에서 해당 설정을 확인할 수 있습니다.   
>구동 시 pm2가 없을 경우 아래 명령어로 설치를 진행합니다.
>```
>>  npm install pm2 -g
>```
## Server Start
BTP_server>*npm start*

![image](https://user-images.githubusercontent.com/24507556/140636779-6712eb08-c04e-465f-84e2-5ae875953e6a.png)


## Server Log
BTP_server>*pm2 log*

> --watch 옵션이 있어 변경사항이 있을 시 자동으로 load 됩니다.


## Server Stop
BTP_server>*npm stop*

![image](https://user-images.githubusercontent.com/24507556/140636888-5d6d5d9c-b7cb-458a-80d5-e3a38e1c1d1e.png)
