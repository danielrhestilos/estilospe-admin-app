import React, { FC, useState } from 'react'
import { Layout, PageBlock ,Button} from 'vtex.styleguide'
 


const AdminOtherExample: FC = () => {

  const [payload,setPayload] = useState("")
 

  const load = (payload: string) => {
    const lines = payload.split('\n').slice(1);
    const objectsArray = lines.map(line => {
      const [SKU,DescriptionShort] = line.split(';');
      return {
        Sku: SKU.trim(),
        DescriptionShort: DescriptionShort.trim()
      };
    });
  
    for (let i = 0; i < objectsArray.length; i++) {
      const producto = objectsArray[i];
      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
          DescriptionShort: producto.DescriptionShort
        }) 
      };
  
      fetch(`/_v/validate-producto/${producto.Sku}`, opciones)
        .then(respuesta => respuesta.json())
        .then(datosRespuesta => {
          console.log(`Respuesta para SKU ${producto.Sku}:`, datosRespuesta);
        })
        .catch(error => {
          console.error(`Error al realizar la petición para SKU ${producto.Sku}:`, error);
        });
    }
}




  return (
    <Layout>
      <PageBlock
        title="SEO Productos v0.9.0"
        subtitle="Modificar masivamente los productos (meta description, title, name)"
        variation="full"
      >
       
        <div className="mb6">
          {/* <Textarea
            label="Agrega los productos que deseas modificar"
            onChange={(e :any)=> setPayload(e.target.value)}
            value={payload}
            maxLength="13500"
            helpText="Recuerda seguir el formato"
          /> */}
          <input       
          type="file"  
          onChange={
            (event :any)=> {
              const file = event.target.files[0]
              const reader = new FileReader();

              reader.onload = (e:any) => {
                const content = e.target.result;
                setPayload(content);
              };
        
          
              reader.readAsText(file);
              // setPayload(e.target.value)
            }
          } 
          accept=".txt" />
        </div>
        <div className="mt4">
          <Button
            variation="primary"
            onClick={() => {
             load(payload)
            }}
          >
            Subir cambios
          </Button>
        </div>
      </PageBlock>
 
   
    </Layout>
  )
}
 
export default AdminOtherExample
 