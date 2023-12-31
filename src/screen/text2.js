const Text2 = () => {
  return (
    <div>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          fontSize: 12,
          lineHeight: 1.2,
        }}
      >
        {`
개인(신용)정보의 조회에 관한 사항

보험료 확인 서비스를 이용하기 위해서는 손해보험협회의 보험 다모아 기능을 이용합니다. 이에 따른, 개인정보 처리 동의에 관한 사항입니다.

손해보험협회와 손해보험사*는「신용정보의 이용 및 보호에 관한 법률」에 따라 고객의 개인(신용)정보를 다음과 같이 보험개발원으로부터 조회하고자 합니다.
이에 대하여 동의하십니까?
* 자동차 보험을 판매하는 손해보험회사
1. 개인(신용)정보의 조회 목적
- 자동차보험료 비교조회 서비스 제공
2. 조회할 개인(신용)정보의 내용
- 차량정보(연식, 차명코드, 자동차명), 現 담보조건(운전용도, 운전자범위, 담보내용 및 금액), 할인할증 등급, 사고(직전 3년간) 및 교통법규 위반 이력, 보험가입경력, 보험가입기간
3. 조회자(개인(신용)정보를 제공받는 자)의 개인(신용)정보의 보유 · 이용 기간
- 동의일로부터 최대 2개월 까지 
`}
      </pre>
    </div>
  )
}

export default Text2
