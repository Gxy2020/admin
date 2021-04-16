import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/Login";
import Home from "../views/home/Home";
import Welcome from "../views/home/welcome/Welcome";
import AdminList from "../views/home/memberlist/AdminList";
import CounsellorList from "../views/home/memberlist/CounsellorList";
import TeacherList from "../views/home/memberlist/TeacherList";
import StudentList from "../views/home/memberlist/StudentList";

import DepartmentList from "../views/home/department/DepartmentList";
import MajorList from "../views/home/department/MajorList";
import Text from "../views/home/Text";
import ClassList from "../views/home/class/ClassList";
import AddClass from "../views/home/class/AddClass";
import AddStudent from "../views/home/class/AddStudent";
import Log from "../views/home/log/Log";
Vue.use(VueRouter)

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {
        path: '/home', component: Home,
        redirect: '/welcome',
        children: [
            {path: '/welcome', component: Welcome},
            {path: '/adminList', component: AdminList},
            {path: '/counsellorList', component: CounsellorList},
            {path: '/teacherList', component: TeacherList},
            {path: '/studentList', component: StudentList},
            {path:'/departmentList',component:DepartmentList},
            {path:'/majorList',component:MajorList},
            {path: '/classList', component: ClassList},
            {path: '/addClass', component: AddClass},
            {path:'/addStudent',component:AddStudent},
            {path:'/log',component:Log},
            {path: '/text', component: Text}
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})
export default router
