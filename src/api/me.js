import request from './request'
import QAlist from './contactQ&A'

const urls = {
  /**
   * 个人信息
   */
  userInfo: 'userInfo',
  /**
   * 邀请相关信息
   */
  inviteInfo: 'me/invite-info',
  /**
   * 排名列表
   */
  rankList: 'me/rank-list',
  /**
   * 获取客服相关信息
   */
  contactInfo: 'contact',
  // 授权微信登录
  login: 'wechat/authorization',
  rewardSetting: 'me/reward-setting'
}
/**
 * 获取用户信息
 */
export function getUserInfo () {
  return request.get(urls.userInfo)
}
/**
 * 获取分享相关信息
 */
export function getInviteInfo () {
  return request.get(urls.inviteInfo)
}
export function getRankList () {
  return request.get(urls.rankList)
}
export function getContactInfo () {
  return new Promise((resolve, reject) => {
    request.get(urls.contactInfo).then((data) => {
      if (!data.qaList) {
        data.qaList = QAlist
      }
      resolve(data)
    }, (res) => {
      reject(res)
    })
  })
}
export function login (invitationCode) {
  return request.get(urls.login, {
    params: {
      invitation_code: invitationCode
    }
  })
}
export function getRewardSetting () {
  return request.get(urls.rewardSetting)
}
