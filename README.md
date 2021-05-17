# k-lotto
github action 공부를 위한 토이프로젝트


## 등록된 action 설명
- lotto645_crawler
  - 매주 토요일11시경에 실행되는 크론
    - 특정 회차의 당첨번호 정보를 알 수 있는 API를 가지고, 토요일에 발표되는 당첨번호 정보를 gist에 저장된 [csv 파일](https://gist.github.com/padawanR0k/af700e6457ef5f5a4e6543c47c7ff76d)에 업데이트한다.
		- 참고로 공식적인 API는 아니다. (https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={회차)}
