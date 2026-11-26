import { useEffect, useRef, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useHomepageMotion(rootRef: RefObject<HTMLElement | null>, isModalOpen: boolean): void {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const context = gsap.context(() => {
      const entrance = gsap.timeline({ defaults: { ease: 'power2.out' } });

      entrance
        .from('[data-animate="site-header"]', { y: -10, opacity: 0, duration: 0.55 })
        .from('[data-animate="hero-label"]', { y: 10, opacity: 0, duration: 0.45 }, '-=0.25')
        .from('[data-animate="hero-headline"]', { y: 22, opacity: 0, duration: 0.7 }, '-=0.12')
        .from('[data-animate="hero-emphasis"]', { y: 12, opacity: 0, duration: 0.5 }, '-=0.42')
        .from('[data-animate="hero-intro"]', { y: 16, opacity: 0, duration: 0.5 }, '-=0.24')
        .from('[data-animate="hero-actions"]', { y: 12, opacity: 0, duration: 0.45 }, '-=0.2')
        .from('[data-animate="hero-note"]', { y: 10, opacity: 0, duration: 0.4 }, '-=0.18')
        .from('[data-animate="emblem"]', { y: 16, scale: 0.96, opacity: 0, duration: 0.75 }, '-=0.52');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-reveal-item]');

        if (items.length === 0) {
          return;
        }

        gsap.from(items, {
          y: 18,
          opacity: 0,
          duration: 0.62,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 86%',
            once: true,
          },
        });
      });
    }, root);

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
    });
    lenisRef.current = lenis;
    const animateScroll = (time: number) => lenis.raf(time * 1000);
    const handleLenisScroll = () => ScrollTrigger.update();
    const anchorLinks = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));

    gsap.ticker.add(animateScroll);
    lenis.on('scroll', handleLenisScroll);

    const handleAnchorClick = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const targetSelector = link.getAttribute('href');
      const target = targetSelector ? document.querySelector<HTMLElement>(targetSelector) : null;

      if (!target) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(target, { offset: -18, duration: 1.05 });
    };

    anchorLinks.forEach((link) => link.addEventListener('click', handleAnchorClick));
    ScrollTrigger.refresh();

    return () => {
      anchorLinks.forEach((link) => link.removeEventListener('click', handleAnchorClick));
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(animateScroll);
      context.revert();
    };
  }, [rootRef]);

  useEffect(() => {
    if (isModalOpen) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [isModalOpen]);
}
