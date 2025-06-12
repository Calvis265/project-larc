
// src/ai/flows/product-suggestion.ts
'use server';
/**
 * @fileOverview A product suggestion AI agent based on purchase history or project description for landscaping and cabro projects.
 *
 * - suggestProducts - A function that provides product/material suggestions.
 * - ProductSuggestionInput - The input type for the suggestProducts function.
 * - ProductSuggestionOutput - The return type for the suggestProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSuggestionInputSchema = z.object({
  purchaseHistory: z
    .string()
    .describe('The purchase history or a description of items already acquired for a landscaping or cabro project, or a description of the project itself.'),
  category: z.string().describe('The category of products/materials to suggest (e.g., Paving, Soil, Plants, Tools).'),
});
export type ProductSuggestionInput = z.infer<typeof ProductSuggestionInputSchema>;

const ProductSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of product or material suggestions based on the input.'),
});
export type ProductSuggestionOutput = z.infer<typeof ProductSuggestionOutputSchema>;

export async function suggestProducts(input: ProductSuggestionInput): Promise<ProductSuggestionOutput> {
  return suggestProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productSuggestionPrompt',
  input: {schema: ProductSuggestionInputSchema},
  output: {schema: ProductSuggestionOutputSchema},
  prompt: `You are an expert landscaping and construction materials suggestion agent.

  Based on the user's purchase history or project description, suggest relevant products or materials in the specified category that the user might be interested in for their cabro installation or landscaping project.
  Return an array of product names or material types.

  Project Details/Purchase History: {{{purchaseHistory}}}
  Category: {{{category}}}
  `,
});

const suggestProductsFlow = ai.defineFlow(
  {
    name: 'suggestProductsFlow',
    inputSchema: ProductSuggestionInputSchema,
    outputSchema: ProductSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
