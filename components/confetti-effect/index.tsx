import React, { useEffect, useRef, useState } from 'react';
type ConfettiEffectProps = {
    onClose?: () => void
    duration?: number
}
const mp = 1500; // max particles
const settleMp = mp / 2; // max particles

let reactivationTimerHandler: NodeJS.Timeout | null;
let animationHandler: number | null;
let confettiActive = true;

const ConfettiEffect = ({ onClose, duration }: ConfettiEffectProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let canvas: HTMLCanvasElement | null;
    let ctx: CanvasRenderingContext2D | null | undefined;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let angle = 0;
    let tiltAngle = 0;
    let particles: any[] = [];
    let confettiSettle = false;
    let animationComplete = true;

    const colorOptions: string[] = [
        'DodgerBlue',
        'OliveDrab',
        'Gold',
        'pink',
        'SlateBlue',
        'lightblue',
        'Violet',
        'PaleGreen',
        'SteelBlue',
        'SandyBrown',
        'Chocolate',
        'Crimson',
    ];

    const initializeCanvas = () => {
        canvas = canvasRef.current;
        ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            canvas.width = W;
            canvas.height = H;
            initializeConfetti();
        }

    };

    const initializeConfetti = () => {
        canvasRef.current?.classList.remove('pointer-events-none')
        let currentColorIndex = 0;
        let colorCount = 0;
        particles = [];
        animationComplete = false;
        for (var i = 0; i < mp; i++) {
            if (colorCount >= 10) {
                colorCount = 0;
                currentColorIndex++;
                if (currentColorIndex >= colorOptions.length) {
                    currentColorIndex = 0;
                }
            }
            colorCount++;
            let particleColor = colorOptions[currentColorIndex];
            particles.push({
                x: Math.random() * W, // x-coordinate
                y: Math.random() * H - H, // y-coordinate
                r: randomFromTo(10, 30), // radius
                d: Math.random() * mp + 10, // density
                color: particleColor,
                tilt: Math.floor(Math.random() * 10) - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
                tiltAngle: 0,
            });
        }
        startConfetti();
    };

    const drawConfetti = (particle: any) => {
        const ct = ctx as CanvasRenderingContext2D;
        ct.beginPath();
        ct.lineWidth = particle.r / 2;
        ct.strokeStyle = particle.color;
        ct.moveTo(particle.x + particle.tilt + (particle.r / 4), particle.y);
        ct.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + (particle.r / 4));
        return ct.stroke();
    };

    const draw = () => {
        ctx?.clearRect(0, 0, W, H);
        var results: any[] = [];
        for (var i = 0; i < mp; i++) {
            results.push(drawConfetti(particles[i]));
        }
        update();
        return results;
    };

    const randomFromTo = (from: number, to: number) => {
        return Math.floor(Math.random() * (to - from + 1) + from);
    };

    const update = () => {
        var remainingFlakes = 0;
        angle += 0.01;
        tiltAngle += 0.1;
        var randomParticle: any;
        for (var i = 0; i < mp; i++) {
            if (animationComplete) return;
            var p = particles[i];

            if (confettiSettle && confettiActive) {

                // reset any random particle within range that is at the bottom for some time after to start falling again
                if (i % (settleMp / 2) === 0) {
                    randomParticle = particles[randomFromTo(0, mp - 1)];
                    if (randomParticle.y > H - 80 && randomParticle.y < H - 40) {
                        randomParticle.x = Math.random() * W; // x-coordinate
                        randomParticle.y = -10; // y-coordinate
                        randomParticle.r = randomFromTo(10, 30); // radius
                        randomParticle.d = Math.random() * mp + 10; // density
                        randomParticle.tiltAngleIncremental =
                            Math.random() * 0.07 + 0.05;
                        randomParticle.tiltAngle = 0;
                    }
                }
                if (p.y > H - 80 && p.y < H - 40) {
                    // skip the particle adjustments as it has reached the bottom and keep it there.
                    remainingFlakes++;
                    continue;
                }
            }

            // start readjusting x, y, tilt, and angle to keep the confetti falling
            p.tiltAngle += p.tiltAngleIncremental;
            if (!confettiActive && p.y < -15) {
                p.y = H + 100;
            } else {
                p.y +=
                    (Math.cos(angle + p.d) + 3 + p.r / 2) / 2;
            }
            p.x += Math.sin(angle);
            p.tilt = (Math.sin(p.tiltAngle - i / 3)) * 15;

            if (p.y <= H) {
                remainingFlakes++;
            }

            if (
                p.x > W + 20 ||
                p.x < -20 ||
                p.y > H
            ) {
                if (confettiActive) {
                    if (i % 5 > 0 || i % 2 === 0) {
                        // 66.67% of the flakes
                        particles[i] = {
                            x: Math.random() * W,
                            y: -10,
                            r: p.r,
                            d: p.d,
                            color: p.color,
                            tilt: Math.floor(Math.random() * 10) - 10,
                            tiltAngle: p.tiltAngle,
                            tiltAngleIncremental: p.tiltAngleIncremental,
                        };
                    } else {
                        if (Math.sin(angle) > 0) {
                            // Enter from the left
                            particles[i] = {
                                x: -5,
                                y: Math.random() * H,
                                r: p.r,
                                d: p.d,
                                color: p.color,
                                tilt: Math.floor(Math.random() * 10) - 10,
                                tiltAngleIncremental: p.tiltAngleIncremental,
                            };
                        } else {
                            // Enter from the right
                            particles[i] = {
                                x: W + 5,
                                y: Math.random() * H,
                                r: p.r,
                                d: p.d,
                                color: p.color,
                                tilt: Math.floor(Math.random() * 10) - 10,
                                tiltAngleIncremental: p.tiltAngleIncremental,
                            };
                        }
                    }
                }
            }
        }
        if (remainingFlakes === 0) {
            stopConfetti();
            onClose?.()
        }
    };

    const requestAnimFrame = (
        () => {
            return (
                window.requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.requestAnimationFrame ||
                function (callback: () => void) {
                    return window.setTimeout(callback, 1000 / 60);
                }
            );
        }
    )();

    const startConfetti = () => {
        W = window.innerWidth;
        H = window.innerHeight;
        if (canvas) {
            canvas.width = W - 10;
            canvas.height = H - 60;
            const animationLoop = () => {
                if (animationComplete) return null;
                animationHandler = requestAnimFrame(animationLoop);
                return draw();
            }

            const rs = animationLoop()
            if (rs?.length === 0) {
                onClose?.()
            }
        }
    };

    const clearTimers = () => {
        if (reactivationTimerHandler) {
            window.clearTimeout(reactivationTimerHandler);
        }
        if (animationHandler) {
            window.clearTimeout(animationHandler);
        }
    };

    const deactivateConfetti = () => {
        confettiActive = false;
        clearTimers();
        canvasRef.current?.classList.add('pointer-events-none')
    };

    const stopConfetti = () => {
        animationComplete = true;
        confettiSettle = false;
        confettiActive = true;
        if (ctx == undefined) return;
        ctx.clearRect(0, 0, W, H);
    };

    useEffect(() => {
        initializeCanvas();
        let timer: null | NodeJS.Timeout = null
        if (duration) {
            timer = setTimeout(() => {
                deactivateConfetti()
            }, duration)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
            stopConfetti();
        }
    }, []);

    return <canvas className='fixed w-[100wh] h-[100vh] top-0 left-0 z-50' id="canvas" ref={canvasRef} />;
};

export default ConfettiEffect;
