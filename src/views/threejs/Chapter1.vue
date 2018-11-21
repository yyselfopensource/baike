<template>
  <div class="chapter1">
  </div>
</template>

<script>
import * as THREE from 'three'

export default {
  name: 'chapter1',
  title: '第一个动画',
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
    // 创建场景
    const scene = new THREE.Scene()
    // 创建相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    // 渲染器
    const renderer = new THREE.WebGLRenderer()
    // 设置窗口大小
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 添加元素到其中
    document.querySelector('.chapter1').appendChild(renderer.domElement)
    // 几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 材质
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    })
    // Mesh 网格模型，暂时这么理解
    const cube = new THREE.Mesh(geometry, material)
    // 添加到场景
    scene.add(cube)
    camera.position.z = 5
    // 实时渲染
    function animate () {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      cube.rotation.z += 0.01
      // 把相机和场景用渲染器渲染出来
      renderer.render(scene, camera)
    }
    animate()
    renderer.render(scene, camera)
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/functions.scss';

</style>
