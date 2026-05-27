import { NextResponse } from "next/server";
import { z } from "zod";

const descriptionSchema = z.object({
  name: z.string(),
  species: z.string(),
  age_estimate: z.string(),
  temperament: z.array(z.string()).default([]),
  story: z.string()
});

export async function POST(request: Request) {
  const parsed = descriptionSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const animal = parsed.data;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      description: `${animal.name} is a ${animal.age_estimate} ${animal.species} with a ${animal.temperament.join(", ")} personality. ${animal.story}`
    });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "Write humane, adoption-friendly animal descriptions. Be warm, specific, truthful, and under 70 words."
        },
        {
          role: "user",
          content: JSON.stringify(animal)
        }
      ]
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "AI description generation failed." }, { status: 502 });
  }

  const data = await response.json();
  return NextResponse.json({ description: data.output_text ?? "" });
}
