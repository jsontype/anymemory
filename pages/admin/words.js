import React, { useState, useEffect, useRef } from "react"

/*
  투두리스트
  anymemory1\pages\admin\words.js
  1. 단어장 기록 위에 패딩 좀 줄 것
  1. 스페이스, 백스페이스가 아니라, 1, 2 키를 사용할 것
  1. word, meaning이 함께 나오는 게 아니라, 3초마다 바뀌도록 로직을 수정할 것
  1. 단어장 인풋을 여러개 두고 라디오버튼으로 선택할 수 있게 할 것
  1. 수동시 얼럿창을 notification.js 참조해서 이걸로 얼럿창으로 바꾸고, 해당 파일 삭제하기

  anymemory1\pages\admin\table-list.js
  1. 글로벌 스테이트를 도입하여, 설정앱에서 word, meaning 역순 설정을 구현
  1. 그 외 설정들을 여기 투두리스트 이슈에 추가할 것

  dashboard.js
  1. 한국어 대쉬보드 만들기

  rtl-page.js
  1. 일본어 대쉬보드 만들기
*/

// CSS
import styles from "./styles/words3.js"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// layout for this page
import Admin from "layouts/Admin.js"
// core components
// import Quote from "components/Typography/Quote.js"
// import Muted from "components/Typography/Muted.js"
// import Primary from "components/Typography/Primary.js"
// import Info from "components/Typography/Info.js"
// import Success from "components/Typography/Success.js"
// import Warning from "components/Typography/Warning.js"
// import Danger from "components/Typography/Danger.js"
import Button from "components/CustomButtons/Button.js"
import Card from "components/Card/Card.js"
import CardHeader from "components/Card/CardHeader.js"
import CardBody from "components/Card/CardBody.js"
import CardFooter from "components/Card/CardFooter.js"
import Checkbox from "@material-ui/core/Checkbox"
import Check from "@material-ui/icons/Check"

function Words3Page() {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  const [words, setWords] = useState([
    {
      id: 1,
      word: "単語追加してください",
      meaning: "단어를 추가해주세요.",
    },
    { id: 2, word: "お疲れ様です。", meaning: "수고하십니다." },
    { id: 3, word: "ご存知でしょうか？", meaning: "알고 계십니까? (존경어)" },
    { id: 4, word: "分かりかねます。", meaning: "잘 모르겠습니다. (존경어)" },
  ])
  const [count, setCount] = useState(1)
  const [checked, setChecked] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const checkedRef = useRef(true)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSaveClick = () => {
    const newWords = inputValue.split("\n").map((line, index) => {
      const [word, meaning] = line.split(";")
      return { id: index + 1, word, meaning }
    })
    setWords(newWords)
    // 단어 카운트를 초기화한다.
    onReset()
  }

  useEffect(() => {
    checkedRef.current = checked
  }, [checked])

  const onIncrease = () => {
    if (count < words.length) {
      setCount(count + 1)
      return
    }
    alert("마지막 단어입니다.")
    return
  }

  const onDecrease = () => {
    if (count > 1) {
      setCount(count - 1)
      return
    }
    alert("첫번째 단어입니다.")
    return
  }

  const onReset = () => {
    setCount(1)
  }

  useEffect(() => {
    const keyDownHandler = (e) => {
      // Space
      if (e.keyCode === 32) {
        onIncrease()
      }
      // Backspace
      else if (e.keyCode === 8) {
        onDecrease()
      }
      // Enter
      else if (e.keyCode === 13) {
        onReset()
      }
    }
    window.addEventListener("keydown", keyDownHandler)
    return () => {
      window.removeEventListener("keydown", keyDownHandler)
    }
  }, [onIncrease, onDecrease])

  useEffect(() => {
    // 자동에 체크되어 있으면 실행
    if (checkedRef.current === true) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount < words.length) {
            return prevCount + 1
          } else {
            onReset()
            // 종료 조건을 만족하면 setInterval을 종료한다.
            // clearInterval(interval);
            return prevCount
          }
        })
      }, 3000) // 3초마다 실행

      // 컴포넌트가 언마운트되면 실행되는 클린업 함수
      return () => clearInterval(interval)
    }
    return
  }, [words.length, checked, checkedRef.current]) // words.length가 변경될 때마다 effect를 다시 실행

  const onSave = () => {
    console.log("onSave가 실행되었다.")
  }

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>단어 암기</h4>
          <p className={classes.cardCategoryWhite}>
            Backspace : 이전 / Space : 다음 / Enter : 리셋
          </p>
        </CardHeader>
        <CardBody>
          <div className={classes.typo}>
            <div className={classes.note}>현재 카운트</div>
            <h1>
              {count}/{words.length}
            </h1>
          </div>

          <div className={classes.typo}>
            <div className={classes.note}>일본어</div>
            <h1>{words[count - 1].word}</h1>
          </div>
          <div className={classes.typo}>
            <div className={classes.note}>한국어</div>
            <h1>{words[count - 1].meaning}</h1>
          </div>
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={onDecrease}>
            ← 이전
          </Button>
          <Button color="primary" onClick={onReset}>
            리셋
          </Button>
          <Button color="primary" onClick={onIncrease}>
            다음 →
          </Button>

          <Button color="outlined" onClick={() => setChecked(!checked)}>
            {checked ? "자동" : "수동"}
            <Checkbox
              checked={checked}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked,
                root: classes.root,
              }}
            />
          </Button>
        </CardFooter>
      </Card>

      <hr />

      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>단어장 기록</h4>
          <p className={classes.cardCategoryWhite}>아아아</p>
        </CardHeader>
        <CardBody>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            style={{ width: "100%", height: "150px" }}
          />
        </CardBody>
        <CardFooter>
          <Button color="primary" onClick={handleSaveClick}>
            적용
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

Words3Page.layout = Admin

export default Words3Page
