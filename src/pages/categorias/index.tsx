import { configApp } from "@/config/config";
import { ICategoria } from "@/models/definitions";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const VerificaCategoriaDefault: React.FC = () =>{
  const catIni: ICategoria = {
    id: '', 
    descricao: '', 
    home: false, 
    publicar: false, 
    slug: ''
  }
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [categoriaDefault, setcategoriaDefault] = useState(catIni)

  useEffect(()=>{

    const fetchCategoriaDefault = async() =>{
      const urlCatDefault = `${configApp.api.urlBase}${configApp.routes.categoriaDefault}`
      console.log('urlCatDefault', urlCatDefault)
      try {
        const res = await fetch(urlCatDefault)
        const data = await res.json();

        console.log('data: ', {...data})
        
        setcategoriaDefault(data)
        if(res.ok) {
          setIsLoading(false)
          console.log('url: ',`/categorias/${data['id']}`)
          router.push(`/categorias/${data['id']}`)
        }
      } catch (error) {
        console.log(error)
        return error
      }
    }

    fetchCategoriaDefault()
  },[])


  return(
    <>
      {isLoading ? (
        <div className="text-center align-middle py-10">
          Carregando...
          
        </div>
        ): (
          <div>Direcionando</div>
        )
      }
    </>
  )
}

export default VerificaCategoriaDefault;