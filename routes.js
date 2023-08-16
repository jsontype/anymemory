// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard"
import Person from "@material-ui/icons/Person"
import LibraryBooks from "@material-ui/icons/LibraryBooks"
import Language from "@material-ui/icons/Language"

const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "대시보드",
  //   rtlName: "ダッシュボード",
  //   icon: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/table-list",
    name: "설정",
    rtlName: "設定",
    icon: "content_paste",
    layout: "/admin",
  },
  {
    path: "/words",
    name: "시작",
    rtlName: "開始",
    icon: LibraryBooks,
    layout: "/admin",
  },
  {
    path: "/rtl-page",
    name: "日本語",
    rtlName: "日本語",
    icon: Language,
    layout: "/rtl",
  },
]

export default dashboardRoutes
