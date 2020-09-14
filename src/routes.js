/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ManageUser from "views/examples/ManageUser.js"
import ManageOrganization from "views/examples/ManageOrganization"
import ManageEvent from "views/examples/ManageEvent";
import ManageTeam from "views/examples/ManageTeam";

var routes = [
  {
    path: "/manage-user",
    name: "Quản lý tài khoản",
    icon: "fas fa-users text-primary",
    component: ManageUser,
    layout: "/admin"
  },
  {
    path: "/manage-event",
    name: "Quản lý sự kiện",
    icon: "fas fa-calendar-week text-primary",
    component: ManageEvent,
    layout: "/admin"
  },
  {
    path: "/manage-organization",
    name: "Quản lý tổ chức",
    icon: "fas fa-sitemap text-primary",
    component: ManageOrganization,
    layout: "/admin"
  },  
  {
    path: "/manage-team",
    name: "Quản lý đọi nhóm",
    icon: "fas fa-sitemap text-primary",
    component: ManageTeam,
    layout: "/admin"
  },  
  {
    path: "/login",
    component: Login,
    layout: "/auth"
  },
];
export default routes;
