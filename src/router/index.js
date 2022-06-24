import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()

const originalPush = createRouter.prototype.push
const originalReplace = createRouter.prototype.replace

// push
createRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
createRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const MyMessage = () => import('views/myMessage/MyMessage.vue')
const Discover = () => import('views/discover/Discover.vue')
const CloudVillage = () => import('views/cloudVillage/CloudVillage.vue')
const Video = () => import('views/video/Video.vue')

const router = createRouter({
  history: routerHistory, //v3之前mode: 'history'
  routes: [
    { path: '', redirect: '/discover' }, //默认路由
    /**
     * 登录界面
     */
    { path: '/safeRegister/:state', component: () => import('components/common/userRegister/UserRegister') },
    /**
     *个人
     */
    { path: '/myMessage', component: MyMessage },
    { path: '/myMessage/radioStation/stationHomeP/stationClassify', component: () => import('views/radioStation/childrenComps/StationClassify') },  // 电台分类
    { path: '/myMessage/radioStation/stationHomeP/stationRanking', component: () => import('views/radioStation/childrenComps/rankingList') },  // 电台排位
    { path: '/classifyInfo/:type', component: () => import('views/radioStation/childrenComps/ClassifyInfo') },  // 电台分类详情
    { path: '/stationDetail/:id', component: () => import('views/radioStation/childrenComps/StationDetail') }, //电台详情
    { path: '/userInfo/:id', component: () => import('views/myMessage/childrenComps/UserInfo') }, //用户信息页
    { path: '/setProfile', component: () => import('views/myMessage/childrenComps/SetProfile') }, //编辑资料
    { path: '/setPasswork', component: () => import('components/content/setPasswrok/SetPasswork') }, //修改密码界面
    //电台
    { path: '/radioStation', component: () => import('views/radioStation/childrenComps/StationHomeP')}, 
    /**
     * 发现
     */
    { path: '/discover', component: Discover },
      { path: '/discover/moreSheet', component: () => import('views/discover/childrenComps/moreComps/moreSheet') }, //歌曲广场
      { path: '/discover/moreSongs', component: () => import('views/discover/childrenComps/moreComps/moreSongs') }, //最新音乐
    //搜索页面
    { path: '/discover/search', component: () => import('views/search/Search.vue') }, 
    /**
     * 云村
     */
    { path: '/cloudVillage', component: CloudVillage },
    /**
     * 视频
     */
    { path: '/video', component: Video },

    { path: '/playDetail/:id&:isAlbum', component: () => import('components/content/sheetInfo/SheetInfo') }, //音乐详情
    { path: '/PlayMusic/:id', component: () => import('components/content/playMusic/PlayMusic')}, //歌曲音乐播放
    { path: '/PlaySaying/:id', component: () => import('components/content/playSong/PlaySaying')}, //电台音乐播放
  ]
})

export default router