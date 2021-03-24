import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import about from '../views/about.vue';
import loginSignup from '../views/login-signup.vue';
import dashboard from '../views/dashboard.vue';
import boardList from '../views/board-list.vue';
import board from '../views/board.vue';
import task from '../views/task.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/login',
        name: 'login-signup',
        component: loginSignup,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
    },
    {
        path: '/board',
        name: 'board-list',
        component: boardList,
    },
    {
        path: '/board/:boardId',
        name: 'board',
        component: board,
        children: [
            {
                path: ':taskId',
                component: task,
            },
        ],
    },
    {
        path: '/about',
        name: 'about',
        component: about,
    },
];

export default new VueRouter({
    routes,
});

