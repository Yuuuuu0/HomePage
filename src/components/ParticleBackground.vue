<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationId: number | null = null
let mouseX = 0
let mouseY = 0
let resizeHandler: (() => void) | null = null

const PARTICLE_COUNT = 50
const CONNECTION_DISTANCE = 150
const PARTICLE_SPEED = 0.5
const MOUSE_INFLUENCE_DISTANCE = 100
const MOUSE_REPEL_STRENGTH = 0.02

const initCanvas = () => {
  if (!canvasRef.value) return
  
  canvas = canvasRef.value
  if (!canvas) return
  
  ctx = canvas.getContext('2d')
  
  if (!ctx) return
  
  resizeHandler = () => {
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // 重新创建粒子以适应新的画布大小
    createParticles()
  }
  
  resizeHandler()
  window.addEventListener('resize', resizeHandler)
  
  createParticles()
  animate()
}

const createParticles = () => {
  if (!canvas) return
  
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * PARTICLE_SPEED,
      vy: (Math.random() - 0.5) * PARTICLE_SPEED,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    })
  }
}

const updateParticles = () => {
  if (!canvas) return
  
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  
  particles.forEach(particle => {
    // 鼠标排斥效果
    const dx = particle.x - mouseX
    const dy = particle.y - mouseY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    if (distance < MOUSE_INFLUENCE_DISTANCE && distance > 0) {
      const force = (MOUSE_INFLUENCE_DISTANCE - distance) / MOUSE_INFLUENCE_DISTANCE
      particle.vx += (dx / distance) * force * MOUSE_REPEL_STRENGTH
      particle.vy += (dy / distance) * force * MOUSE_REPEL_STRENGTH
    }
    
    // 更新位置
    particle.x += particle.vx
    particle.y += particle.vy
    
    // 边界检测
    if (particle.x < 0 || particle.x > canvasWidth) {
      particle.vx *= -1
      particle.x = Math.max(0, Math.min(canvasWidth, particle.x))
    }
    if (particle.y < 0 || particle.y > canvasHeight) {
      particle.vy *= -1
      particle.y = Math.max(0, Math.min(canvasHeight, particle.y))
    }
    
    // 速度衰减
    particle.vx *= 0.99
    particle.vy *= 0.99
  })
}

const drawParticles = () => {
  if (!ctx || !canvas) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 绘制连接线
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < CONNECTION_DISTANCE) {
        const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.3
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
      }
    }
  }
  
  // 绘制粒子
  particles.forEach(particle => {
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
    ctx!.fill()
  })
}

const animate = () => {
  updateParticles()
  drawParticles()
  animationId = requestAnimationFrame(animate)
}

const handleMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX
  mouseY = e.clientY
}

onMounted(() => {
  initCanvas()
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('mousemove', handleMouseMove)
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  opacity: 0.6;
}
</style>
