
import { motion } from 'framer-motion'

interface searchRecipeProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}


export default function RecipeSearch({onChange }: searchRecipeProps)  {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="recipe-search-form"
    >
      <form
        className=" search-form max-w-sm mx-auto  flex justify-center  gap-1 p-2 my-5"
      >
        <input
          className="font-light text-center border rounded-full border-neutral-200 w-full py-4 text-2xl      "
          placeholder="Un plaisir ?"
          type="text"
          onChange={onChange}
          
        />
        <button
          className=" px-4 py-2 font-light transition-all duration-300 rounded-full bg-neutral-200 text-slate-50 bg-gradient-to-r from-red-900 to-orange-500 hover:bg-gradient-to-b hover:from-orange-500 hover:to-red-900 hover:text-slate-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </form>
    </motion.div>
  )
  }


