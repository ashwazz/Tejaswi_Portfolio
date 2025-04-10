'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Define the Vanta effect type
type VantaEffect = {
	destroy: () => void;
};

export default function HeroSection() {
	const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);
	const vantaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!vantaEffect) {
			// Dynamically import the scripts
			const loadScripts = async () => {
				// Load Three.js
				const threeScript = document.createElement('script');
				threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
				threeScript.async = true;
				document.body.appendChild(threeScript);

				// Wait for Three.js to load
				await new Promise((resolve) => {
					threeScript.onload = resolve;
				});

				// Load Vanta.js
				const vantaScript = document.createElement('script');
				vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.cells.min.js';
				vantaScript.async = true;
				document.body.appendChild(vantaScript);

				// Wait for Vanta.js to load
				await new Promise((resolve) => {
					vantaScript.onload = resolve;
				});

				// Initialize Vanta effect
				if (vantaRef.current) {
					// Use any type to bypass TypeScript checking for the VANTA property
					const vanta = (window as any).VANTA;
					if (vanta) {
						const effect = vanta.CELLS({
							el: vantaRef.current,
							mouseControls: true,
							touchControls: true,
							gyroControls: false,
							minHeight: 200.00,
							minWidth: 200.00,
							scale: 1.00,
							color1: 0x59ff,
							color2: 0x8fadd,
							size: 1.40
						});
						setVantaEffect(effect);
					}
				}
			};

			loadScripts();
		}

		// Cleanup function
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Vanta.js container */}
			<div ref={vantaRef} className="absolute inset-0 z-0" />

			<div className="relative z-10 max-w-4xl w-full mx-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="bg-black/50 backdrop-blur-lg rounded-lg border border-gray-800 p-6"
				>
					<div className="flex items-center gap-2 mb-4">
						<div className="w-3 h-3 rounded-full bg-red-500" />
						<div className="w-3 h-3 rounded-full bg-yellow-500" />
						<div className="w-3 h-3 rounded-full bg-green-500" />
					</div>
					<div className="font-mono">
						<p className="text-green-500">$ whoami</p>
						<h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Alex Chen</h1>
						<p className="text-gray-400 mb-2">Senior Backend Engineer</p>
						<p className="text-green-500">$ skills</p>
						<div className="flex flex-wrap gap-2 mt-2">
							<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20">Node.js</span>
							<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20">Python</span>
							<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20">Go</span>
							<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20">AWS</span>
							<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20">Docker</span>
							<span className="px-3 py-1 bg-green-500/10 rounded-md border border-green-500/20">Kubernetes</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
