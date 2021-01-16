//app.js
App({
  onLaunch: function () {
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
      // wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
      //   traceUser: true,
      // })
    // }
    // this.globalData = {};
    // wx.cloud.init({
      // env: {
      //   database: 'vote', // 指定数据库使用的环境
      //   storage: 'vote', // 指定文件存储使用的环境
      //   functions: 'vote' // 指定云函数使用的环境
      // }, // 指定使用环境id为test的云开发环境
    //   env: 'vote-0giubkndcb1173f8',
    //   traceUser: true // 将用户对云资源访问记录到用户管理中，在云开发控制台中可见
    // });
    // 获取json数据库的引用
    // const db = wx.cloud.database();
    // 在json数据库的test集合增加一个记录
    // serverDate：调用serverDate函数时，可以为它传入一个包含offset属性的JSON对象作为参数，用于获取一定时间之后（或之前）的时间，单位为毫秒
    // db.collection('test').add({
    //   createTime: db.serverDate()
    // })
    // 获取数据库中test集合的引用
    // const testCollection = db.collection('test');
    // 获取集合中指定ID的记录引用
    // const testRecord = db.collection('test').doc('85ff8afa5fe88e8500c62ef239c03c1e');

    // 在集合中插入数据
    // db.collection('todos').add({
    //   data: {
    //     name: '张安',
    //     due: new Date('2020-12-27'),
    //     tags: ['paper'],
    //     done: false
    //   },
    //   success(res) {
    //     console.log(res);
    //   },
    //   fail(err) {
    //     console.log(err);
    //   },
    //   complete(res) {
    //     console.log(res);
    //   }
    // })

    // 查询数据
    // 小程序端获取数据集合时，服务器默认最多返回20条；云函数端调用该API函数时，服务器一次默认返回100条记录
    // db.collection('todos').get().then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(err);
    // })

    // 更新数据
    // db.collection('todos').doc('id-1').update({
    //   data: {
    //     done: true
    //   }
    // }).then(res => {
    //   console.log(res);
    // })

    // 调用云函数
    // wx.cloud.callFunction({
    //   name: 'add',
    //   data: {
    //     a: 1,
    //     b: 2
    //   },
    //   success(res) {
    //     console.log(res);
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // })

    // wx.cloud.callFunction({
    //   name: 'add',
    //   data: {
    //     a: 1,
    //     b: 2
    //   }
    // }).then(res => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(123);
    //   console.log(err);
    // })

    // 投票小程序
    wx.cloud.init({
      env: "vote-0giubkndcb1173f8", // 指定使用环境ID为vote-0giubkndcb1173f8的云开发环境
      traceUser: true // 将用户对云资源的访问记录到用户管理中，在云开发控制台中可见
    });
  }
})
