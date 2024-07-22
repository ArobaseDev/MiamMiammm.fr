interface CardMessageProps {
  message: string
}



export  default function CardMessage({message}: CardMessageProps){
  return (
    <>
    

      
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="" alt=""/>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              {message}
              </h5>
              
          </div>

    
    </>
  
  )
}
