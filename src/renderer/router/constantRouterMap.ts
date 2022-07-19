import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/:pathMatch(.*)*', component: () => import("@renderer/views/404.vue") },
    { path: '/', name: '首页', component: () => import('@renderer/views/Home.vue') },
    { path: '/show', name: '展示', component: () => import('@renderer/components/Show.vue') },
    { path: '/show1', name: '总览', component: () => import('@renderer/components/LandingPage.vue') },
    { path: '/Print', name: '打印', component: () => import('@renderer/views/Print.vue') },
]

export default routes