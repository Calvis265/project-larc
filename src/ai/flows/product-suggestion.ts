// src/ai/flows/product-suggestion.ts
'use server';
/**
 * @fileOverview A product suggestion AI agent based on purchase history.
 *
 * - suggestProducts - A function that provides product suggestions.
 * - ProductSuggestionInput - The input type for the suggestProducts function.
 * - ProductSuggestionOutput - The return type for the suggestProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductSuggestionInputSchema = z.object({
  purchaseHistory: z
    .string()
    .describe('The purchase history of the user, as a string of product names.'),
  category: z.string().describe('The category of products to suggest.'),
});
export type ProductSuggestionInput = z.infer<typeof ProductSuggestionInputSchema>;

const ProductSuggestionOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of product suggestions based on the purchase history.'),
});
export type ProductSuggestionOutput = z.infer<typeof ProductSuggestionOutputSchema>;

export async function suggestProducts(input: ProductSuggestionInput): Promise<ProductSuggestionOutput> {
  return suggestProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productSuggestionPrompt',
  input: {schema: ProductSuggestionInputSchema},
  output: {schema: ProductSuggestionOutputSchema},
  prompt: `You are an expert e-commerce product suggestion agent.

  Based on the user's purchase history, suggest products in the specified category that the user might be interested in.
  Return an array of product names.

  Purchase History: {{{purchaseHistory}}}
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
