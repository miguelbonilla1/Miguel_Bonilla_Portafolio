"use client";
import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationFrameId: number;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;  // Verificamos si el canvas está disponible

    const ctx = canvas.getContext('2d');
    if (!ctx) return;  // Verificamos si el contexto 2D está disponible

    // Establecemos el tamaño del canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 50;
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12'];

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      life: number;

      constructor(canvas: HTMLCanvasElement | null) {
        if (canvas) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        } else {
          this.x = 0;  // En caso de que el canvas sea null, establecemos valores por defecto
          this.y = 0;
        }
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = Math.random() * 100 + 100;
      }

      update(canvas: HTMLCanvasElement | null) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        if (canvas) {
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        if (this.life < 50) {
          this.size *= 0.98;
        }
      }

      draw(ctx: CanvasRenderingContext2D | null) {
        if (!ctx) return; // Asegurarnos de que el contexto aún esté disponible
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Función para crear una nueva partícula
    function createParticle() {
      if (particles.length < particleCount) {
        particles.push(new Particle(canvas));
      }
    }

    // Función de animación
    function animate() {
      if (!ctx || !canvas) return; // Verificar nuevamente si canvas o ctx es nulo

      // Limpiar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      createParticle();

      // Actualizar y dibujar las partículas
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas);
        particles[i].draw(ctx);

        // Dibujar las líneas entre las partículas cercanas
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Eliminar las partículas pequeñas o sin vida
        if (particles[i].size <= 0.3 || particles[i].life <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      // Solicitar el siguiente cuadro de animación
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Manejar el cambio de tamaño de la ventana
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: detener la animación y eliminar el listener de eventos

    //
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" style={{ opacity: 0.2 }} />;
};

export default AnimatedBackground;
