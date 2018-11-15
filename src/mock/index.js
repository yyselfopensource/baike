import Mock from 'mockjs'

const req = require.context('./', false, /^((?!index).)*\.js$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const apiFiles = requireAll(req).map(apiFile => apiFile.default)

apiFiles.forEach(apis => {
  apis.forEach(api => {
    Mock.mock(api.path, api.method, api.handler)
  })
})
Mock.setup({
  timeout: 2000
})

export default Mock
