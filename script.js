const lenis = new Lenis()


function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

raf()

gsap.registerPlugin(ScrollTrigger)

const tl = gsap.timeline();

document.querySelectorAll(".elem").forEach((elem) => {
    let img = elem.querySelector("img");
    let text = document.querySelector(".text");
    let xTransform = gsap.utils.random(-100, 100);

    tl.to(img, {
        scale: 0,
        ease: "none",
        scrollTrigger: {
            trigger: elem,
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                let progress = self.progress;
                lenis.raf(performance.now());
                gsap.set(img, {
                    transformOrigin: `${xTransform < 0 ? 0 : '100%'} 50%`,
                    scale: 1 - progress
                });
            }
        }
    }, "same");
    tl.to(elem,{
        xPercent:xTransform,
        ease:Power4,
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
        }
    },"same")
   
});
