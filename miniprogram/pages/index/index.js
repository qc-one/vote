//index.js
const app = getApp()

Page({
  data: {
    // 获取分页数据
    pageData: [],
    // 页码
    nextPage: 0
  },
  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    this.getNextPageData();
  },
  onTapCreateRadioVote() {
    wx.navigateTo({
      url: '/pages/createVote/createVote?type=radio',
    })
  },
  onTapCreateMultiChoiveVote() {
    wx.navigateTo({
      url: '/pages/createVote/createVote?type=multiple',
    })
  },
  // 分页
  getNextPageData() {
    const PAGE_COUNT = 20;
    const db = wx.cloud.database();
    db.collection('todos').count().then(res => {
      const totalCount = res.total;
      const totalPages = Math.ceil(totalCount / PAGE_COUNT);
      if (this.data.nextPage < totalPages) {
        db.collection('todos')
        .skip(this.data.nextPage * PAGE_COUNT) // 跳过已有的数据
        .limit(PAGE_COUNT) // 获取新的20条数据
        .get().then(data => {
          const pageData = this.data.pageData.concat(data.data);
          this.setData({
            pageData,
            nextPage: this.data.nextPage + 1
          })
        })
      }
      else {
        console.log('数据已经加载完毕');
      }
    });
  },
  // 上传图片
  uploadFile() {
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log(res);
        let tempFilePath = res.tempFilePaths;
        const uploadTatk = wx.cloud.uploadFile({
          cloudPath: 'test/1.png',
          filePath: tempFilePath[0],
          success(res) {
            console.log(res);
          },
          fail(err) {
            console.log(err);
          }
        })
      }
    })
    // console.log('shagchuan');
    // const uploadTatk = wx.cloud.uploadFile({
    //   cloudPath: 'test/1.png',
    //   filePath: 'D://upload//img',
    //   success(res) {
    //     console.log(res);
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // })
    // 在uploadTask对象上可以设置上传进度的监听回调
    // uploadTatk.onProgressUpdate(res => {
    //   console.log('上传进度', res);
    // })
    // 也可以通过uploadTask上面的abort方法取消上传任务
    // uploadTatk.abort();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉');
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉');
    this.getNextPageData();
  },
})