import CTA from "@/components/CTA";
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
	return (
		<main>
			<h1 className="text-2xl">Popular Companions</h1>
			<section className="home-section">
				<CompanionCard
					id="123"
					name="Neura the Brainy Explorer"
					topic="Neural Network of the brain"
					subject="science"
					duration={45}
					color="#ffda6e"
				/>
				<CompanionCard
					id="456"
					name="Neura the Brainy Explorer"
					topic="Neural Network of the brain"
					subject="science"
					duration={45}
					color="#e9c4f2"
				/>
				<CompanionCard
					id="789"
					name="Neura the Brainy Explorer"
					topic="Neural Network of the brain"
					subject="science"
					duration={45}
					color="#c4def2"
				/>
			</section>

			<section className="home-section">
				<CompanionsList
					title="recently completed sessions"
					companions={recentSessions}
					classNames="w-2/3 max-lg:w-full"
				/>
				<CTA />
			</section>
		</main>
	);
};

export default Page;
