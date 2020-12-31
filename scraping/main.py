import requests
import pandas as pd
import datetime
import json
import os

GIST_URL = 'https://gist.githubusercontent.com/padawanR0k/af700e6457ef5f5a4e6543c47c7ff76d/raw/f2b48fca2dbcc03bcd1c1090a1a5347bfeddc11c/kor_lotto_history.csv'
GIST_ID = 'af700e6457ef5f5a4e6543c47c7ff76d'
PAT = os.environ.get('PAT', None)
print(PAT)
class lotto645:
    # gitgist 정보 가져오기
    def get_gist(self, id):
        res =  requests.get(f'https://api.github.com/gists/{GIST_ID}', headers={'accept': 'application/vnd.github.v3+json'})
        body = res.json()
        return body

    # gitgist 정보 업데이트하기
    def update_gist(self, files):

        res =  requests.patch(
            f'https://api.github.com/gists/{GIST_ID}',
            headers={
                'accept': 'application/vnd.github.v3+json',
                'Authorization': f'token {PAT}',
                'Content-Type': 'application/json'
            },
            data=json.dumps({
                'files': files
            })
        )
        body = res.json()
        return body

    # 현재 gist에 등록된 csv 로드
    def get_history(self) ->  pd.DataFrame :
        gist = self.get_gist(GIST_ID)
        GIST_URL = gist['files']['kor_lotto_history.csv']['raw_url']
        table = pd.read_csv(GIST_URL)
        table = table.sort_values('round', ascending=True, )
        return gist, table

    """
    totSellamnt: 총 판매량
    returnValue: 성공여부  "success" | "fail"
    drwNoDate: 날짜 "2020-12-26"
    firstWinamnt: 1등 금액
    drwtNo1:1 1번 번호
    drwtNo2:8 2번 번호
    drwtNo3:13 3번 번호
    drwtNo4:36 4번 번호
    drwtNo5:44 5번 번호
    drwtNo6:45 6번 번호
    bnusNo:39 보너스번호
    firstPrzwnerCo: 1등당첨자 수
    firstAccumamnt: 각 1등 당첨자가 받는 금액
    drwNo: 회차
    """
    def get_win_num(self, round):
        res = requests.get(f'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo={round}')
        _json = res.json()
        status = _json['returnValue']
        if status == 'success':
            info = {
                'round': round,
                'date': _json['drwNoDate'],
                '1': str(_json['drwtNo1']),
                '2': str(_json['drwtNo2']),
                '3': str(_json['drwtNo3']),
                '4': str(_json['drwtNo4']),
                '5': str(_json['drwtNo5']),
                '6': str(_json['drwtNo6']),
                'bonus': str(_json['bnusNo']),
            }
            return info
        else:
            return None



if __name__ == '__main__':
    lotto = lotto645()
    gist, history = lotto.get_history()
    recent_data = history.tail(1)
    recent_round = recent_data['round'].values[0]
    next_round = recent_round + 1
    info = lotto.get_win_num(next_round)

    if info != None:
        # 최근 회차정보가 이미 존재하면 넣지않는다.
        if info['round'] != recent_round:
            history = history.append(info, ignore_index=True)
            history_csv = history.to_csv(index=False)
            newfiles = {
                'kor_lotto_history.csv': {
                    'content': history_csv
                }
            }
            result = lotto.update_gist(newfiles)

        else:
            print('중복된 정보임')
    else:
        next_date = datetime.datetime.strptime(recent_data['date'].values[0], '%Y-%m-%d') + datetime.timedelta(days=7)
        print(f'[{next_round}회] 정보가 존재하지 않습니다. [{next_round}회]는 {next_date.isoformat()[:10]}에 발표됩니다.')
