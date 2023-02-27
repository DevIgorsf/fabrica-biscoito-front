import { useState} from "react";
import estilos from "./Graphic.module.scss";
import http from "../../http";
import React from "react";
import Chart from "react-google-charts";
import { useNavigate } from "react-router-dom";
import Estoque from "../Estoque";

const Graphic = () => {
  var navigate = useNavigate();

  const token = sessionStorage.getItem('token')
  const role = sessionStorage.getItem('role')

  const [totalNormal, setTotalNormal] = useState<number>(0);
  const [totalEhRecheado, setTotalEhRecheado] = useState<number>(0);

  React.useEffect(() => {
    if(!token) {
      navigate('/login')
    } else if ( role === 'Client') {
        navigate('/')
    }
  }, [navigate]);



  React.useEffect(() => {
    http.request({
      url: '/fabrica',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((data) => {
      setTotalNormal(data.data.total)
      setTotalEhRecheado(data.data.ehRecheado)
      console.log(data)
    });
  }, []);

    const data = [
      ["Task", "Hours per Day"],
      ["Normal", totalNormal],
      ["Recheado", totalEhRecheado],
    ];

    const options = {
        title: "Proporção de biscoitos",
      };

    return (
      <div className={estilos.background}>
        <section className={estilos.container}>
            
            <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
            />
        </section>
      </div>
    );
  };
  
  export default Graphic;