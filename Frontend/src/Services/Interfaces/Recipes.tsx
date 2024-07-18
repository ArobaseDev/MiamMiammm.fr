export default interface Recipes {
  [x: string]: any;
  id: number;
  name: string;
  image: string;
  prepTime: number;
  category: string;
  origin: string;
  ingredients: string[];
  preparationSteps: string[];
  servings: number;
  cookingTips: string;
}

