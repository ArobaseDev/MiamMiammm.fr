export default interface Recipes {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  image: string;
  prepTime: string;
  category: string;
  origin: string;
  ingredients: string[];
  preparationSteps: string[];
  servings: number;
  cookingTips: string
}

