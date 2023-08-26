import React, { useState, useEffect, useRef } from "react"

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
      word: "単語を追加してください",
      meaning: "단어를 추가해주세요.",
      checked: false,
    },
    {
      id: 2,
      word: "メートル",
      meaning: "메-토루 미터",
      checked: false,
    },
    {
      id: 3,
      word: "センチメートル",
      meaning: "센치메-토루 센티미터",
      checked: false,
    },
    {
      id: 4,
      word: "能動",
      meaning: "노우도우 능동",
      checked: false,
    },
    {
      id: 5,
      word: "手動",
      meaning: "슈도우 수동",
      checked: false,
    },
    {
      id: 6,
      word: "お揃いですか？",
      meaning: "おそろいですか？ (회의)모두 모였습니까?",
      checked: false,
    },
    {
      id: 7,
      word: "絶えず",
      meaning: "たえず 꾸준히, 끊임없이",
      checked: false,
    },
  ])
  const [count, setCount] = useState(1)
  const [autoChecked, setAutoChecked] = useState(true)
  const [inputValue, setInputValue] = useState("")
  const [countMemorized, setCountMemorized] = useState(0)
  const autoCheckedRef = useRef(true)

  // 단어장 인풋창을 변경한다.
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  // 입력한 단어장을 적용한다.
  const handleSaveClick = () => {
    const newWords = inputValue.split("\n").map((line, index) => {
      const [word, meaning] = line.split(";")
      return { id: index + 1, word, meaning, checked: false }
    })
    setWords(newWords)
    // 단어 카운트를 초기화한다.
    onReset()
  }

  const toggleWordChecked = (id) => {
    setWords((prevWords) =>
      prevWords.map((word) =>
        word.id === id ? { ...word, checked: !word.checked } : word
      )
    )
    const checkedCount = words.filter((obj) => obj.checked === true).length + 1
    setCountMemorized(checkedCount)
  }

  const onIncrease = () => {
    if (count < words.length) {
      setCount(count + 1)
      return
    }
    return
  }

  const onDecrease = () => {
    if (count > 1) {
      setCount(count - 1)
      return
    }
    return
  }

  const onReset = () => {
    setCount(1)
  }

  useEffect(() => {
    autoCheckedRef.current = autoChecked
  }, [autoChecked])

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
    // 자동 체크되어 있으면 실행
    if (autoCheckedRef.current === true) {
      const interval = setInterval(() => {
        setCount((prevCount) => {
          let nextCount = prevCount + 1

          // 단어가 모두 체크되어 있을 경우 리셋
          if (nextCount > words.length) {
            onReset()
            return nextCount
          }

          // 체크된 단어를 건너뛰기
          while (words[nextCount - 1]?.checked) {
            nextCount++

            // 단어가 모두 체크되어 있을 경우 리셋
            if (nextCount > words.length) {
              onReset()
              return nextCount
            }
          }

          return nextCount
        })
      }, 3000) // 3초마다 실행

      // 컴포넌트가 언마운트되면 실행되는 클린업 함수
      return () => clearInterval(interval)
    }
    return
  }, [words, autoChecked, autoCheckedRef.current]) // words.length가 변경될 때마다 effect를 다시 실행

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>단어 암기</h4>
          <p className={classes.cardCategoryWhite}>
            Backspace : 이전 / Space : 다음 / Enter : 처음
          </p>
        </CardHeader>
        <CardFooter>
          <Button color="primary" onClick={onDecrease}>
            ← 이전
          </Button>
          <Button color="primary" onClick={onReset}>
            처음
          </Button>
          <Button color="primary" onClick={onIncrease}>
            다음 →
          </Button>

          {/* 체크박스 그룹 */}
          <div>
            {/* 암기 체크박스 */}
            <Button onClick={() => toggleWordChecked(words[count - 1].id)}>
              암기
              <Checkbox
                checked={words[count - 1]?.checked || false}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root,
                }}
              />
            </Button>
            {/* 자동・수동 체크박스 */}
            <Button onClick={() => setAutoChecked(!autoChecked)}>
              {autoChecked ? "자동" : "수동"}
              <Checkbox
                checked={autoChecked}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                  checked: classes.checked,
                  root: classes.root,
                }}
              />
            </Button>
          </div>
        </CardFooter>
        <CardBody>
          <div className={classes.typo}>
            <div className={classes.note}>현재 카운트</div>
            <h1>
              {count} → {countMemorized} / {words.length}
            </h1>
          </div>

          {words[count - 1]?.checked === false && (
            <>
              <div className={classes.typo}>
                <div className={classes.note}>일본어</div>
                <h1>{words[count - 1].word}</h1>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>한국어</div>
                <h1>{words[count - 1].meaning}</h1>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      <hr />

      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>단어장 기록</h4>
          <p className={classes.cardCategoryWhite}>
            원하는 단어를 "일본어;한국어" 처럼 등록하고, 복수 단어는 개행으로
            구분해서 등록하세요. 마지막행은 비워주세요. <br />
            예시) <br />
            おはようございます;좋은 아침입니다.
            <br />
            こんにちは;안녕하세요.
            <br />
          </p>
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
