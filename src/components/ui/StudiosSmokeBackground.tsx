import { useEffect, useRef } from 'react';

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(0.04, 0.02, 0.02);

  // Vertical fade from top to bottom
  float verticalFade = 1.0 - pow(abs(uv.y) * 0.8, 0.5);

  // Distance from center - creates the fade in the middle
  float distFromCenter = abs(uv.x);

  // Horizontal fade: strong at edges, weak in middle
  float horizontalFade = pow(distFromCenter, 1.5) * 2.0;
  horizontalFade = clamp(horizontalFade, 0.0, 1.0);

  // Left smoke column - upward flow
  float leftSmoke = 0.0;
  if(uv.x < 0.4) {
    vec2 leftUv = uv;
    leftUv.x = leftUv.x * 3.0 + 0.5;
    leftUv.y -= T * 0.028; // Upward animation

    float n = fbm(leftUv * vec2(2.0, 1.5) + vec2(0.0, T * 0.02));
    n += fbm(leftUv * vec2(4.0, 2.0) - vec2(T * 0.015, T * 0.01));

    float edgeFade = smoothstep(-0.8, -0.2, uv.x);
    leftSmoke = n * edgeFade * verticalFade * 1.5;
  }

  // Right smoke column - upward flow
  float rightSmoke = 0.0;
  if(uv.x > -0.4) {
    vec2 rightUv = uv;
    rightUv.x = rightUv.x * 3.0 - 0.5;
    rightUv.y -= T * 0.032; // Slightly different speed for variation

    float n = fbm(rightUv * vec2(2.0, 1.5) + vec2(10.0, T * 0.02));
    n += fbm(rightUv * vec2(4.0, 2.0) - vec2(T * 0.015, T * 0.01) + vec2(5.0, 0.0));

    float edgeFade = smoothstep(0.8, 0.2, uv.x);
    rightSmoke = n * edgeFade * verticalFade * 1.5;
  }

  // Combine smokes
  float smoke = leftSmoke + rightSmoke;
  smoke *= horizontalFade;
  smoke = clamp(smoke, 0.0, 1.0);

  // Neon red color with glow
  vec3 neonRed = vec3(1.0, 0.1, 0.1);
  vec3 deepRed = vec3(0.4, 0.05, 0.05);
  vec3 smokeColor = mix(deepRed, neonRed, smoke);

  // Add glow effect
  float glow = pow(smoke, 0.8) * 1.2;
  col += smokeColor * glow;

  // Subtle ambient glow in the smoke areas
  float ambientGlow = horizontalFade * verticalFade * 0.15;
  col += vec3(0.15, 0.03, 0.03) * ambientGlow;

  col = clamp(col, 0.0, 1.0);
  O = vec4(col, 1.0);
}`;

export function StudiosSmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.warn('WebGL2 not supported');
      return;
    }

    const compileShader = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(prog));
      return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'resolution');
    const uTime = gl.getUniformLocation(prog, 'time');

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener('resize', resize);
    resize();

    let raf: number;
    const start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) * 1e-3;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}

export default StudiosSmokeBackground;
