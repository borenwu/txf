var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            avatarUrl: '/static/images/user-unlogin.png'
        },
    },

    login: function() {
        var user = wx.getStorageSync('userinfo')
        var self = this
        if (!user) {
            util.showBusy('正在登录')
            console.log(config.service.loginUrl)
            console.log(config.service.userUrl)
            qcloud.setLoginUrl(config.service.loginUrl)
            qcloud.login({
                success: function(userinfo) {
                    qcloud.request({
                        url: config.service.userUrl,
                        login: true,
                        success(userRes) {
                            util.showSuccess('登录成功')
                            wx.setStorageSync('userinfo', userRes.data.data)
                            self.setData({
                                userInfo: userRes.data.data
                            })
                        }
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var userinfo = wx.getStorageSync('userinfo')
        // console.log([userinfo])
        if (userinfo) {
            this.setData({
                userInfo: userinfo
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})