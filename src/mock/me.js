export default [
  /**
   * 获取用户信息
   */
  {
    path: /userInfo/,
    method: 'get',
    handler () {
      return {
        data: {
          name: '一个达卜纽',
          avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=830136575,2051427571&fm=26&gp=0.jpg',
          spark_value: 300
        }
      }
    }
  }
]
