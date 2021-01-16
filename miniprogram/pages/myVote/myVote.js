Page({
    /**
     * 页面的初始数据
     */
    data: {
        voteList: []
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getMyVoteListFromServer()
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
    // 获取我的投票
    getMyVoteListFromServer() {
        // TODO 当前使用伪造数据，后面使用云开发技术从服务器获取数据
        // const voteList = [
        //     {
        //         _id: 'test',
        //         voteTitle: '测试投票1'
        //     },
        //     {
        //         _id: 'test',
        //         voteTitle: '测试投票2'
        //     },
        //     {
        //         _id: 'test',
        //         voteTitle: '测试投票3'
        //     },
        //     {
        //         _id: 'test',
        //         voteTitle: '测试投票4'
        //     },
        //     {
        //         _id: 'test',
        //         voteTitle: '测试投票5'
        //     }
        // ];
        // this.setData({
        //     voteList
        // });
        wx.cloud.callFunction({
            name: 'myVoteList'
        }).then(res => {
            console.log(res, 'myVote');
            this.setData({
                voteList: res.result.data
            })
        }).catch(err => {
            console.log(err);
            wx.showToast({
              title: '获取数据失败',
              icon: 'none'
            })
        })
    },
    onTapVote(e) {
        const voteID = e.currentTarget.dataset.voteId;
        wx.navigateTo({
          url: '/pages/vote/vote?voteID=' + voteID,
        })
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