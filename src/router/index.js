import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/Login";

//系统管理员路由
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
import CourseList from "../views/home/course/CourseList";
import Log from "../views/home/log/Log";
import Scores from "../views/home/scores/Scores";
//辅导员课客户端路由
import Chome from "../views/home/cHome/Chome";
import Students from "../views/home/cHome/student/Students";
import SaveStudent from "../views/home/cHome/student/SaveStudent";
import StudentScores from "../views/home/cHome/socre/StudentScores";
import CWelcome from "../views/home/cHome/welcome/CWelcome";
import CClass from "../views/home/cHome/classes/CClass";
import AlarmingList from "../views/home/cHome/alarming/AlarmingList";
import HelpList from "../views/home/cHome/help/HelpList";
//班主任路由跳转
import Thome from "../views/home/tHome/Thome";
import TWelcome from "../views/home/tHome/twelcome/TWelcome";
import ClassScore from "../views/home/tHome/score/ClassScore";
import Studentc from "../views/home/tHome/student/Studentc";
import ClassToStudent from "../views/home/tHome/student/ClassToStudent";
//学生路由
import Shome from "../views/home/sHome/Shome";
import SWelcome from "../views/home/sHome/swelcome/SWelcome";
import Messages from "../views/home/sHome/message/Messages";
import MyScore from "../views/home/sHome/score/MyScore";
Vue.use(VueRouter);

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
            {path:'/courseList',component:CourseList},
            {path:'/scores',component:Scores},
            {path:'/log',component:Log},
            {path: '/text', component: Text}
        ]
    },
    {path:'/chome',component:Chome,
        redirect: '/cwelcome',
        children: [
            {path:'/cWelcome',component:CWelcome},
            {path:'/students',component:Students},
            {path:'/saveStudent',component:SaveStudent},
            {path:'/studentScores',component:StudentScores},
            {path:'/cclass',component:CClass},
            {path:'/alarmingList',component:AlarmingList},
            {path:'/helpList',component:HelpList}
        ]},
        {path:'/thome',component:Thome,
        redirect: '/twelcome',
        children: [
            {path:'/twelcome',component:TWelcome},
            {path:'/studentc',component:Studentc},
            {path:'/classScore',component:ClassScore},
            {path:'/classToStudent',component:ClassToStudent}
        ],
    },
    {path:'/shome',component:Shome,
        redirect:'/sWelcome',
    children:[
        {path:'/sWelcome',component:SWelcome},
        {path:'/myScore',component:MyScore},
        {path:'/messages',component:Messages}
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
