import request from './request'
import store from '../store'
import { mapKey } from '../util'

const urls = {
  /**
   * banner图片
   */
  banner: 'index/banner',
  /**
   * 任务信息获取和其它
   */
  task: 'task/detail',
  taskReported: 'task/enrolled',
  /**
   * 收藏任务
   */
  collectTask: 'task/collect',
  /**
   * 任务报名
   */
  report: 'task/enroll',
  /**
   * 检查是否报名,
   */
  isReported: 'task/is_enroll',
  /**
   * 任务分类
   */
  taskCategory: 'task/category'
}
/**
 * 获取banner图片
 */
export function getBannerList () {
  return request.get(urls.banner)
}
/**
 * 获取任务详情
 * @param {number|string} id 任务id
 * @param {boolean} reported 是否报名
 * @returns {TaskDetail}
 */
export function getTaskDetail (id, reported) {
  return request.get(`${reported ? urls.taskReported : urls.task}`, {
    params: {
      task_id: id
    }
  })
}
/**
 * 收藏任务，或者取消收藏
 * @param {number|string} id 任务id
 */
export function collectTask (id) {
  return request.post(urls.collectTask, {
    task_id: parseInt(id, 10),
    member_id: store.state.userInfo.id
  })
}
/**
 * 任务报名
 * @param {object} data 数据
 */
export function reportTask (data) {
  return request.post(urls.report, {
    ...data,
    ...mapKey(store.state.userInfo, [
      ['id', 'member_id']
    ], true)
  })
}
/**
 * 获取任务分类
 */
export function getTaskCategory () {
  return request.get(urls.taskCategory)
}

export function checkReported (taskId) {
  return new Promise((resolve, reject) => {
    request.get(urls.isReported, {
      params: {
        task_id: taskId,
        ...mapKey(store.state.userInfo, [
          ['id', 'member_id']
        ], true)
      }
    }).then(data => {
      resolve(data.is_enroll)
    }).catch((err) => {
      reject(err)
    })
  })
}
