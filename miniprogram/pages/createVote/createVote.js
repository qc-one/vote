// miniprogram/pages/createVote/createVote.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 保存当前投票标题输入框的内容
    formTitle: '',
    // 描述
    formDesc: '',
    // 添加选项
    optionList: [''],
    // 保存今天日期，作为截止日期的起始日期
    nowDate: '',
    // 截止日期
    endDate: '',
    // 匿名投票设置
    isAnonymous: false,
    // 投票类型
    multiple: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === 'radio') {
      wx.setNavigationBarTitle({
        title: '创建单选投票',
      });
    }
    else if (options.type === 'multiple') {
      wx.setNavigationBarTitle({
        title: '创建多选投票',
      });
      this.setData({
        multiple: true
      });
    }
    else {
      console.error('wrong page parameter [type]:' + options.type);
    }
    this.formReset();
  },  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  // 表单提交
  formSubmit() {
    // 提交表单钱需要先对表单进行检验
    const msg = this.checkFormValid();
    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
    const formData = {
      voteTitle: this.data.formTitle,
      voteDesc: this.data.formDesc,
      optionList: this.data.optionList,
      endDate: this.data.endDate,
      isAnonymous: this.data.isAnonymous,
      voteList: []
    };
    // 获得数据库的引用
    const db = wx.cloud.database();
    db.collection('votes').add({
      data: formData
    }).then(res => {
      console.log(res);
      wx.redirectTo({
        url: '/pages/vote/vote?voteID=' + res._id,
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '创建投票失败',
        icon: 'none'
      })
    })
  },
  // 校验表单数据是否完整，如果校验通过就返回null，否则返回需要提示的文字
  checkFormValid() {
    if (!this.data.formTitle) {
      return '标题不能为空';
    }
    if (this.data.optionList.length < 2) {
      return '至少需要2个选项'
    }
    for (let i = 0;i < this.data.optionList.length; i ++) {
      if (!this.data.optionList[i]) {
        return '选项不能为空'
      }
    }
    return null
  },
  // 重置表单
  formReset() {
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();
    const nowDate = nowYear + '-' + ((nowMonth < 10) ? ('0' + nowMonth) : nowMonth) + '-' + ((nowDay < 10) ? ('0' + nowDay) : nowDay);
    this.setData({
      nowDate,
      endDate: nowDate,
      formTitle: '',
      formDesc: '',
      optionList: [],
      isAnonymous: false
    })
  },
  // 设置投票标题
  onInputChange(e) {
    this.setData({
      formTitle: e.detail.value
    });
  },
  // 描述内容
  onDescChange(e) {
    this.setData({
      formDesc: e.detail.value 
    });
  },
  // 选项内容
  onOptionInputChange() {

  },
  // 添加选项
  onTapAddOption() {
    const newOptionList = this.data.optionList;
    newOptionList.push('');
    this.setData({
      optionList: newOptionList
    });
  },
  // 选项输入框内容
  onOptionInputChange(e) {
    const newOptionList = this.data.optionList;
    const changeIndex = e.currentTarget.dataset.optionIndex;
    newOptionList[changeIndex] = e.detail.value;
    this.setData({
      optionList: newOptionList
    }); 
  },
  // 删除选项
  onTapDelOption() {
    const delIndex = e.currentTarget.dataset.optionIndex;
    const newOptionList = this.data.newOptionList.filter((v, i) => i !== delIndex);
    this.setData({
      optionList: newOptionList
    });
  },
  // 时间日期改变事件
  onChangeEndDate(e) {
    this.setData({
      endDate: e.detail.value
    });
  },
  // 匿名开关
  onChangeIsAnonymous(e) {
    this.setData({
      isAnonymous: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})