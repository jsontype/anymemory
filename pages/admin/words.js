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
      word: "単語追加してください",
      meaning: "단어를 추가해주세요.",
    }
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
