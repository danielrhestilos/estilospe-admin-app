import React, { FC, useState } from 'react'
import { Layout, PageBlock ,Button} from 'vtex.styleguide'
// import { useApolloClient } from 'react-apollo';
// import editProduct from './graphql/editProduct.graphql' 
// import fetch from 'node-fetch' 


const AdminOtherExample: FC = () => {
  // const client = useApolloClient();
  // const { data: retrievedToken } = useQuery(tokenGQL)
  const [payload,setPayload] = useState("")
  // const arrPromises : any = [];

  const load = (payload: string) => {
    const lines = payload.split('\n').slice(1); // Ignorar la primera línea y dividir el texto en líneas
    const objectsArray = lines.map(line => {
      const [SKU, Nombre, Meta_title, Meta_description] = line.split(';');
      return {
        Sku: SKU.trim(),
        Name: Nombre.trim(),
        Title: Meta_title.trim(),
        MetaTagDescription: Meta_description.trim()
      };
    });
  
    for (let i = 0; i < objectsArray.length; i++) {
      const producto = objectsArray[i];
      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indica que el contenido es JSON
        },
        body: JSON.stringify({
          Name: producto.Name,
          Title: producto.Title,
          MetaTagDescription: producto.MetaTagDescription
        }) // Convierte los datos a formato JSON
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
        title="Accesorios Productos v0.9.0"
        subtitle="Modificar masivamente los productos (Skus separados por comas)"
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
 