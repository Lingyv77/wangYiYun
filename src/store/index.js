import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    cookieState: false,
    userData: {  //用户数据
      state: false, //用户登录状态
      id: 0, //用户id
      name: '', //用户名
      gender: 0, //性别
      birthday: 0, //出生日
      signature: '', //简介
      userPic: '', //用户头像
      bgUrl: '', //背景
      phoneNumber: '', //用户手机号
    },
    navMusicDom: null, //播放器
    playSong: {  // 当前播放的音乐数据
      index: 0,
      id: "1447721226",
      path: '/PlayMusic/', //默认点击跳转route
      playNow: false,  // 默认播放音乐
      currentPercent: 0, //当前歌曲进度百分比率
      linearIndex: 0,  // 判断是否拖动进度条
      isPlayEnd: '',  // 判断是否播放结束
      songName: '',  // 目前歌曲播放名称
      singer: '',  // 目前歌曲演唱者
      picUrl: '',  // 目前歌曲封面
      transformRotate: 0 //img转度
    },
    lyirc: { //歌词属性数据
      lyircColor: '#98b6e9', 
      lyircColorIndex: 4,
    },
    bgUrl: require('assets/theme/bgUrl.jpg'), //主题背景

    discoverData: { //discover 数据缓存
      sheet: { //discoverSheet 缓存数据
        dataHas: false, //是否缓存数据
        data: [] //数据
      } 
    },
    /**
     * sheetInfo 缓存数据
     */
    sheetInfoData: {  
      dataHas: false, //是否缓存数据
      data: [ //数据列表
        0
        // { 
        //   id: '', //歌曲信息id
        //   songInfo: {}, //歌曲信息
        //   songList: [], //歌曲列表 
        //   showMusicList: false, //是否显示歌曲列表
        // },
      ]
    },
    /**
     * moreSheet 缓存数据
     */
    moreSheetData: {
      dataHas: false, //是否缓存数据
      data: [ //数据列表
        0
        // {
        //   offset: 0, //当前页数
        //   data: [] //数据
        //   scrollOpsition //滑动条位置
        // }
      ]
    },
    /**
     * moreSong 缓存数据
     */
    moreSongsData: {
      dataHas: false,
      data: []
    },
    /**
     * classifyInfo 缓存数据
     */
    classifyInfoData: {
      dataHas: false,
      data: [
        0
        // {
        //   offset: 0, //当前页数
        //   data: [] //数据
        //   scrollOpsition //滑动条位置
        // }
      ]
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});