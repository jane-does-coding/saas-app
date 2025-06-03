"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { Textarea } from "./ui/textarea";
import { createCompanion } from "@/lib/actions/companion.actions";
import { redirect } from "next/navigation";

const formSchema = z.object({
	name: z.string().min(1, { message: "Companion is required." }),
	subject: z.string().min(1, { message: "Subject is required." }),
	topic: z.string().min(1, { message: "Topic is required." }),
	voice: z.string().min(1, { message: "Voice is required." }),
	style: z.string().min(1, { message: "Style is required." }),
	duration: z.coerce.number().min(1, { message: "Duration is required." }),
});

const CompanionForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			subject: "",
			topic: "",
			voice: "",
			style: "",
			duration: 15,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);

		const companion = await createCompanion(values);

		if (companion) {
			redirect(`/companion/${companion.id}`);
		} else {
			console.log("Failed to create a companion");
			redirect("/");
		}
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Companion Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter the companion name"
										className="input"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subject</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										defaultValue="field.value"
									>
										<SelectTrigger className="input capitalize">
											<SelectValue placeholder="Select the Subject" />
										</SelectTrigger>
										<SelectContent>
											{subjects.map((subject) => (
												<SelectItem
													value={subject}
													key={subject}
													className="capitalize"
												>
													{subject}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="topic"
						render={({ field }) => (
							<FormItem>
								<FormLabel>What should the companion help with?</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Ex. Devirates & Integrals"
										className="input"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="voice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Voice</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										defaultValue="field.value"
									>
										<SelectTrigger className="input">
											<SelectValue placeholder="Select the Voice" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value={"male"} className="capitalize">
												Male
											</SelectItem>
											<SelectItem value={"female"} className="capitalize">
												Female
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="style"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Style</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										value={field.value}
										defaultValue="field.value"
									>
										<SelectTrigger className="input">
											<SelectValue placeholder="Select the Style" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value={"formal"} className="capitalize">
												Formal
											</SelectItem>
											<SelectItem value={"casual"} className="capitalize">
												Casual
											</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Estimated session duration in minutes</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="15"
										className="input"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full cursor-pointer">
						Build your companion
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default CompanionForm;
