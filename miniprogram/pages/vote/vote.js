Page({
    /**
     * 页面的初始数据
     */
    data: {
       voteID: '', // 当前投票的ID
       multiple: false, // 当前投票的类型
       voteTitle: '', // 当前投票的标题
       voteDesc: '', // 当前投票的补充描述
       optionList: [], // 当前投票的选项列表
       endDate: '', // 当前投票的截止日期
       isAnonymous: false, // 当前投票是否匿名
       isExpired: false, // 当前投票是否已过期
       pickedOption: [], // 当前用户选择的选项
       voteStatus: {
           alreadyVoted: false, // 是否已经投票
           totalVoteCount: 0, // 总投票数量
           optionStatus: [] // 每个选项的投票情况
       } // 当前的投票情况
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const voteID = options.voteID;
        console.log(voteID);
        // 从服务端获取投票信息
        this.getVoteDataFromServer(voteID);
        // 从服务端获取投票情况
        this.getVoteStatusFromServer(voteID);
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
    // 从服务端获取投票信息
    getVoteDataFromServer(voteID) {
        if (voteID === 'test') {
            const voteData = {
                multiple: true,
                voteTitle: '测试数据投票标题',
                voteDesc: '测试数据投票描述',
                optionList: [
                    '测试数据选项1',
                    '测试数据选项2',
                    '测试数据选项3',
                    '测试数据选项4',
                    '测试数据选项5'
                ],
                endDate: '2021-05-18',
                isAnonymous: false
            }
            // 检查投票是否已过期
            const isExpired = this.checkExpired(voteData.endDate);
            this.setData({
                voteID,
                multiple: voteData.multiple,
                voteTitle: voteData.voteTitle,
                voteDesc: voteData.voteDesc,
                optionList: voteData.optionList,
                endDate: voteData.endDate,
                isAnonymous: voteData.isAnonymous,
                isExpired
            });
        }
        else {
            // TODO从服务端获取投票信息
            const db = wx.cloud.database();
            db.collection('votes').doc(voteID).get().then(res => {
                const voteData = res.data || {};
                const isExpired = this.checkExpired(voteData.endDate);
                this.setData({
                    voteID,
                    multiple: voteData.multiple,
                    voteTitle: voteData.voteTitle,
                    voteDesc: voteData.voteDesc,
                    optionList: voteData.optionList,
                    endDate: voteData.endDate,
                    isAnonymous: voteData.isAnonymous,
                    isExpired
                })
            }).catch(err => {
                console.log(err);
                wx.showToast({
                  title: '获取投票失败',
                  icon: 'none'
                })
            })
        }
    },
    // 从服务端获取投票情况
    getVoteStatusFromServer(voteID) {
        // 如果投票ID为test，则伪造一些数据
        if (voteID === 'test') {
            const voteStatus = {
                alreadyVoted: true,
                totalVoteCount: 100,
                optionStatus: [
                    {
                        count: 25,
                        vote: false
                    },
                    {
                        count: 35,
                        vote: true
                    },
                    {
                        count: 45,
                        vote: false
                    },
                    {
                        count: 55,
                        vote: false
                    },
                    {
                        count: 55,
                        vote: false
                    }
                ]
            }
            this.setData({
                voteStatus
            });
        }
        // TODO从服务端获取投票情况
        else {
            wx.cloud.callFunction({
                name: 'getVoteStatus',
                data: {
                    voteID
                }
            }).then(res => {
                console.log(res, '投票情况');
                this.setData({
                    voteStatus: res.result
                })
            }).catch(err => {
                console.log(err);
                wx.showToast({
                  title: '获取投票数据失败',
                  icon: 'none'
                })
            })
        }
    },
    // 检查投票是否已经过期
    checkExpired(endDate) {
        const now = new Date();
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth() + 1;
        const nowDay = now.getDate();
        const endDateArray = endDate.split('-');
        const endYear = Number(endDateArray[0]);
        const endMonth = Number(endDateArray[1]);
        const endDay = Number(endDateArray[2]);
        if (nowYear > endYear) {
            return true;
        }
        if (nowYear === endYear && nowMonth > endMonth) {
            return true;
        }
        if (nowYear === endYear && nowMonth === endMonth && nowDay > endDay) {
            return true;
        }
        return false;
    },
    // 投票选项点击
    onPickOption(e) {
        console.log(e);
        if (this.data.multiple) {
            // 更新选择的选项（多选投票）
            this.setData({
                pickedOption: e.detail.value
            });
        }
        else {
            // 更新选择的选项（单选投票）
            this.setData({
                pickedOption: [
                    e.detail.value
                ]
            });
        }
    },
    // 确认投票
    onTapVote() {
        if (this.data.isAnonymous) {
            const postData = {
                voteID: this.data.voteID,
                pickedOption: this.data.pickedOption
            };
            // TODO 将postData数据上传到服务器
            wx.cloud.callFunction({
                name: 'vote',
                data: {
                    postData
                }
            }).then(res => {
                console.log(res, 'res');
                this.getVoteStatusFromServer(this.data.voteID)
            }).catch(err => {
                console.log(err, 'err');
                wx.showToast({
                  title: '投票失败',
                  icon: 'none'
                })
            })
        }
        else {
            const _this = this;
            wx.getUserInfo({
                success(res) {
                    console.log(res);
                    const postData = {
                        voteID: _this.data.voteData,
                        userInfo: res.userInfo,
                        pickedOption: _this.data.pickedOption
                    }
                    // TODO 将postData数据上传到服务器
                    wx.cloud.callFunction({
                        name: 'vote',
                        data: {
                            postData
                        }
                    }).then(res => {
                        console.log(res);
                        _this.getVoteStatusFromServer(_this.data.voteID);
                    }).catch(err => {
                        console.log(err);
                        wx.showToast({
                          title: '投票失败',
                          icon: 'none'
                        })
                    })
                }
            })
        }
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
        return {
            title: '邀请你参与投票',
            path: '/pages/vote/vote?voteID=' + this.data.voteID
        }
    }
})