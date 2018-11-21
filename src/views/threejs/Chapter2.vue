<template>
  <div class="chapter2">
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'chapter2',
  title: '点线面',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
  },
  mounted () {
    let width = window.innerWidth
    let height = window.innerHeight
    // 第二章将一些代码抽离为函数，看起来更有序
    function initRenderer () {
      // 渲染器
      const renderer = new THREE.WebGLRenderer({
        // 抗锯齿
        // antialias: true
      })
      // 设置窗口大小
      renderer.setSize(width, height)
      // 添加元素到其中
      document.querySelector('.chapter2').appendChild(renderer.domElement)
      renderer.setClearColor(0xffffff, 1)

      return renderer
    }
    function initCamera () {
      // 创建相机
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500)
      // 设置初始参数
      camera.position.set(0, 0, 100)
      // 看向哪里
      camera.lookAt(0, 0, 0)

      return camera
    }
    function initScene () {
      const scene = new THREE.Scene()

      return scene
    }
    function initLight () {
      // 创建光照，没有光照，就全是黑的
      const light = new THREE.Light(0xff0000, 1.0, 0)
      light.position.set(100, 100, 200)

      return light
    }
    function initObject () {
      // 几何体
      const geometry = new THREE.Geometry()
      // 材质
      const material = new THREE.LineBasicMaterial({
        // 顶点颜色,加上之后会显示不出来
        // vertexColors: THREE.VertexColors,
        color: 0x0000ff
      })
      const color1 = new THREE.Color(0x444444)
      const color2 = new THREE.Color(0xff0000)

      // 线的材质由两点的颜色决定
      // 定义一个点
      const point1 = new THREE.Vector3(-10, 0, 0)
      const point2 = new THREE.Vector3(0, 10, 0)
      const point3 = new THREE.Vector3(10, 0, 0)
      // 用set方法重新设置坐标
      // point1.set(4, 8, 9)
      // 添加点
      geometry.vertices.push(point1)
      geometry.vertices.push(point2)
      geometry.vertices.push(point3)
      // 添加颜色
      geometry.colors.push(color1, color2, color1)
      // 创建线
      const line = new THREE.Line(geometry, material)

      return line
    }
    function start () {
      const renderer = initRenderer()
      const camera = initCamera()
      const scene = initScene()
      const light = initLight()
      const line = initObject()
      scene.add(light)
      scene.add(line)
      renderer.render(scene, camera)
      window.renderer = renderer
    }
    start()
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/functions.scss';

</style>
