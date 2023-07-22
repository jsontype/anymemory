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
      word: "お世話になっております。",
      meaning: "신세를 지고 있습니다.",
    },
    { id: 2, word: "お疲れ様です。", meaning: "수고하십니다." },
    { id: 3, word: "ご存知でしょうか？", meaning: "알고 계십니까? (존경어)" },
    { id: 4, word: "分かりかねます。", meaning: "잘 모르겠습니다. (존경어)" },
  ])
  const [count, setCount] = useState(1)
  const [checked, setChecked] = useState(true)
  const checkedRef = useRef(true)

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
    if (checkedRef.current === true) {
      const interval = setInterval(() => {
        console.log("이거다!!", checkedRef.current)
        setCount((prevCount) => {
          if (prevCount < words.length) {
            return prevCount + 1
          } else {
            onReset()
            // clearInterval(interval); // 종료 조건을 만족하면 setInterval을 종료합니다.
            return prevCount
          }
        })
      }, 3000) // 3초마다 실행

      // 컴포넌트가 언마운트되면 실행되는 클린업 함수
      return () => clearInterval(interval)
    } else {
      // const interval = setInterval(() => {
      //   console.log("이거다!!", checkedRef.current)
      //   setCount((prevCount) => {
      //     if (prevCount < words.length) {
      //       return prevCount + 1
      //     } else {
      //       onReset()
      //       // clearInterval(interval); // 종료 조건을 만족하면 setInterval을 종료합니다.
      //       return prevCount
      //     }
      //   })
      // }, 500) // 3초마다 실행

      // 컴포넌트가 언마운트되면 실행되는 클린업 함수
      // return () => clearInterval(interval)

      return
    }
  }, [words.length, checked, checkedRef.current]) // words.length가 변경될 때마다 effect를 다시 실행

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Words3</h4>
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
  )
}

Words3Page.layout = Admin

export default Words3Page
