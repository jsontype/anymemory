/*eslint-disable*/
import React from "react"
// react plugin for creating charts
import ChartistGraph from "react-chartist"
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles"
import Icon from "@material-ui/core/Icon"
// @material-ui/icons
import Store from "@material-ui/icons/Store"
import Warning from "@material-ui/icons/Warning"
import DateRange from "@material-ui/icons/DateRange"
import LocalOffer from "@material-ui/icons/LocalOffer"
import Update from "@material-ui/icons/Update"
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import AccessTime from "@material-ui/icons/AccessTime"
import Accessibility from "@material-ui/icons/Accessibility"
import BugReport from "@material-ui/icons/BugReport"
import Code from "@material-ui/icons/Code"
import Cloud from "@material-ui/icons/Cloud"
// layout for this page
import RTL from "layouts/RTL.js"
// core components
import Button from "components/CustomButtons/Button.js"
import GridItem from "components/Grid/GridItem.js"
import GridContainer from "components/Grid/GridContainer.js"
import Table from "components/Table/Table.js"
import Tasks from "components/Tasks/Tasks.js"
import CustomTabs from "components/CustomTabs/CustomTabs.js"
import Danger from "components/Typography/Danger.js"
import Card from "components/Card/Card.js"
import CardHeader from "components/Card/CardHeader.js"
import CardAvatar from "components/Card/CardAvatar.js"
import CardIcon from "components/Card/CardIcon.js"
import CardBody from "components/Card/CardBody.js"
import CardFooter from "components/Card/CardFooter.js"
import SnackbarContent from "components/Snackbar/SnackbarContent.js"

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js"

import styles from "assets/jss/nextjs-material-dashboard/views/rtlStyle.js"

import avatar from "assets/img/faces/marc.jpg"

let bugs = [
  "طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن؟",
  "	نخست از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟",
  "همان حال کار آنها به نوعی وابسته به متن می‌باشد",
  "	آنها با استفاده از محتویات ساختگی، صفحه گرافیکی خود را صفحه‌آرایی می‌کنند",
]
let website = [
  "بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته",
  "اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید؟",
]
let server = [
  "گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی؟",
  "از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی ؟",
  "از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟",
]

function RTLPage() {
  const useStyles = makeStyles(styles)
  const classes = useStyles()
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>覚えた単語</p>
              <h3 className={classes.cardTitle}>
                49/50 <small></small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  プレミアム会員になる
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>ああ</p>
              <h3 className={classes.cardTitle}>34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                あああ
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>あああ</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                あああ
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>ああああ</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                ああああ
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>あああああ</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                あああああ
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />
                ああああああ
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>ああああああ</h4>
              <p className={classes.cardCategory}>ああああああ</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> ああああああ
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>あああああああ</h4>
              <p className={classes.cardCategory}>あああああああ</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> ああああああああ
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="ああああああああ"
            headerColor="primary"
            rtlActive
            tabs={[
              {
                tabName: "ああああああああ",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                    rtlActive
                  />
                ),
              },
              {
                tabName: "ああああああ",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                    rtlActive
                  />
                ),
              },
              {
                tabName: "ああああああ",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                    rtlActive
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>ああああああ</h4>
              <p className={classes.cardCategoryWhite}>ななななな</p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["aaa", "bbb", "ccc", "ddd"]}
                tableData={[
                  ["1", "abc", "abc", "abc"],
                  ["2", "abc", "abc", "abc"],
                  ["3", "abc", "abc", "abc"],
                  ["4", "abc", "abc", "abc"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>اعلان ها</h4>
              <p className={classes.cardCategoryWhite}>
                ああ{" "}
                <a
                  target="_blank"
                  href="https://material-ui-next.com/?ref=creativetime"
                >
                  ああ
                </a>{" "}
                ونصب من قبل{" "}
                <a
                  target="_blank"
                  href="https://www.creative-tim.com/?ref=njsmd-rtl-page"
                >
                  Word Memory
                </a>
                ああああ{" "}
                <a href="#pablo" target="_blank">
                  ああああああ{" "}
                </a>
                .
              </p>
            </CardHeader>
            <CardBody>
              <SnackbarContent
                message={
                  'این یک اعلان است که با کلاس color="warning" ایجاد شده است.'
                }
                close
                rtlActive
                color="warning"
              />
              <SnackbarContent
                message={
                  'این یک اعلان است که با کلاس color="primary" ایجاد شده است.'
                }
                close
                rtlActive
                color="primary"
              />
              <SnackbarContent
                message={"این یک اعلان با دکمه بستن و آیکن است"}
                close
                rtlActive
                color="info"
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>مدیرعامل / مدیرفنی</h6>
              <h4 className={classes.cardTitle}>خداداد عزیزی</h4>
              <p className={classes.description}>
                طراح گرافیک از این متن به عنوان عنصری از ترکیب بندی برای پر کردن
                صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده
                می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و
                ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از
                متن‌های آزمایشی و بی‌معنی استفاده می‌کنند ...
              </p>
              <Button color="primary" round>
                دنبال‌کردن
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  )
}

RTLPage.layout = RTL

export default RTLPage
