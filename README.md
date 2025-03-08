# 2025_KGU_Basic_Capstone_Design

> 로컬 MySQL 서버 설정

application.yml 파일에서 DB 설정을 할 때 필요한 필드는 application-db.yml 파일을 참조
(backend/src/main/resources/application-db.yml)

```yml
spring:
  datasource:
    url : jdbc:mysql://localhost:3306/데이터베이스_이름?serverTimezone=UTC&characterEncoding=UTF-8
    username : root
    password : 비밀번호
    driver-class-name: com.mysql.cj.jdbc.Driver
```
- **데이터베이스_이름**, **비밀번호** 환경에 맞게 수정.

***

> git 커밋 컨벤션 정하기


| 태그 이름   |사용 설명|
|---------|---|
| Feat:   |새로운 기능을 추가할 경우|
| Fix:    |버그를 고친 경우|
| Design: |	CSS 등 사용자 UI 디자인 변경|
| Docs:   |문서를 수정한 경우|
| Test:   |테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)|
| Refactor:|	코드 리팩토링|
| Chore:  |소스 코드를 건들지 않는 작업(빌드 업무 수정)|
| Style:  |코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우|
| Remove: |파일이나 코드, 리소스 제거|
| Rename: |파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우|
| Hotfix: |긴급 수정이 필요한 경우|
| Etc:    |기타 사항|


좋은 예
git commit -m "Feat: 사용자 프로필 편집 기능 추가"

나쁜 예
git commit -m "기능 추가" # 유형 명시 누락

참고: https://overcome-the-limits.tistory.com/6

***



