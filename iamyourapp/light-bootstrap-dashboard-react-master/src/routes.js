/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Device from "views/Device.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Routine from "views/Routine.js";
import Report from "views/Report";
const dashboardRoutes = [
  {
    path: "/monitoring",
    name: "MONITORING",
    icon: "nc-icon nc-tv-2",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/device",
    name: "DEVICE",
    icon: "nc-icon nc-preferences-circle-rotate",
    component: Device,
    layout: "/admin"
  },
  {
    path: "/routine",
    name: "ROUTINE",
    icon: "nc-icon nc-refresh-02",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/info",
    name: "ROUTINE_INFO",
    icon: "nc-icon nc-paper-2",
    component: Routine,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "REPORT",
    icon: "nc-icon nc-chart-bar-32",
    component: Report,
    layout: "/admin"
  },
  {
    path: "/mypage",
    name: "MYPAGE",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },


];

export default dashboardRoutes;
