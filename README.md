# BTP_server
node + express server

**220905**
> 운영/로컬 별 start scripts를 재작성 하였습니다. 
> config는 gitignore하고 팀내 공유 하였으니 개인별로 셋팅 바랍니다.
> 운영 서버는 npm run prod 로 start 합니다.


**211202**
> upload 폴더가 생성되었습니다.   
> 정적으로 파일을 서비스 할 수 있습니다.   
> [예시] http://127.0.0.1:3000/user/BTP.jpg   
> (유저가 파일 업로드 할 경우 해당 경로를 user.picture 컬럼에 업데이트 할 예정)

**211124**
> .env 파일 생성이 필요합니다.   
>    
> <img width="348" alt="image" src="https://user-images.githubusercontent.com/24507556/143081804-62408e36-19e6-4e94-ac58-8de8310f9fce.png">
>    
>   
>  프로젝트 파일경로에 위와 같은 .env파일을 생성하고 아래의 REST API 키 를 넣어주세요    
>        
> <img width="283" alt="image" src="https://user-images.githubusercontent.com/24507556/143082250-2c8fb380-01b9-4d5f-b5f6-22f1234ca454.png">

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
