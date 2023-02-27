import { useState} from "react";
import estilos from "./Order.module.scss";
import http from "../../http";
import ButtonRegister from "./../../components/ButtonRegister";
import { useNavigate } from 'react-router-dom';
import React from "react";

const Order = () => {
    let navigate = useNavigate();
    const token = sessionStorage.getItem('token')

    React.useEffect(() => {
        if(!token) {
          navigate('/login')
        }
    }, [navigate]);
      

    const [ehRecheado, setEhRecheado] = useState(false);
    const [ingrediente1, setIngrediente1] = useState<number>(0);
    const [ingrediente2, setIngrediente2] = useState<number>(0);
    const [ingrediente3, setIngrediente3] = useState<number>(0);

    const [tempoForno, setTempoForno] = useState<number>(1);

    const [pilha1, setPilha1] = useState<number>(0);
    const [pilha2, setPilha2] = useState<number>(0);
    const [pilha3, setPilha3] = useState<number>(0);

    const timer = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();

      const tempo = {
        tempoForno
      };

      http.request({
        url: "/fabrica/tempo",   
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }, 
        data: tempo
      })
        .then(() => {
          alert("Valor alterado com sucesso");
        })
        .catch((error) => {
            if (error?.response?.data?.message) {
            alert(error.response.data.message);
            } else {
            alert("Erro ao realizar a alteração");
            }
        });

    }
  
    const factory = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();
  
      const biscoito = {
        ehRecheado,
        ingrediente1,
        ingrediente2,
        ingrediente3,
      };
  
      console.log("Biscoito - ehRecheado: " + biscoito.ehRecheado);
      console.log("Biscoito - ingrediente1: " + biscoito.ingrediente1);
      console.log("Biscoito - ingrediente2: " + biscoito.ingrediente2);
      console.log("Biscoito - ingrediente3: " + biscoito.ingrediente3);
  
      
      http.request({
        url: "/fabrica",   
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }, 
        data: biscoito
      })
      .then(() => {
          setEhRecheado(Boolean);
          setIngrediente1(0);
          setIngrediente2(0);
          setIngrediente3(0);
      })
      .catch((error) => {
          if (error?.response?.data?.message) {
          alert(error.response.data.message);
          } else {
          alert("Erro ao realizar o cadastro!");
          }
      });
    };

    const handleChangeEhRecheado = (
      evento: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (evento.target.value == "true") {
        if (ehRecheado == true) {
          console.log("Desmarcado");
        }
        setEhRecheado(!ehRecheado);
      }
    };
  
    return (
      <div className={estilos.background}>
        <section className={estilos.container}>
          <form onSubmit={timer}>
              <div className="">
                <label htmlFor="tempoForno" className={estilos.label}>
                  Digite o valor de T desejado
                </label>
                <input
                  type="number"
                  min="1"
                  className={estilos.input}
                  id="tempoForno"
                  name="tempoForno"
                  value={tempoForno}
                  onChange={(evento) => setTempoForno(evento.target.valueAsNumber)}
                  placeholder="Digite o valor de T desejado"
                  required
                />
              </div>

              <div className={estilos.button}>
                <ButtonRegister type="submit">Enviar</ButtonRegister>
              </div>
          </form>
        </section>
        <section className={estilos.container}>
          <form onSubmit={factory}>

          <h2 className="text-center mb-3"> Faça seu pedido</h2>

          <div className="row">
            <div className="col">
              <div className="form-item">
                <label htmlFor="ingrediente1" className={estilos.label}>
                  Quantidade de ingrediente 1
                </label>
                <input
                  type="number"
                  min="0"
                  className={estilos.input}
                  id="name"
                  name="ingrediente1"
                  value={ingrediente1}
                  onChange={(evento) => setIngrediente1(evento.target.valueAsNumber)}
                  placeholder="Digite a quantidade de ingrediente 1"
                  required
                />
              </div>
            </div>
            <div className="col">
              <div className="">
              <label htmlFor="ingrediente2" className={estilos.label}>
                Quantidade de ingrediente 2
              </label>
              <input
                type="number"
                min="0"
                className={estilos.input}
                id="ingrediente2"
                name="ingrediente2"
                value={ingrediente2}
                onChange={(evento) => setIngrediente2(evento.target.valueAsNumber)}
                placeholder="Digite a quantidade de ingrediente 2"
                required
              />
            </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="">
                <label htmlFor="ingrediente3" className={estilos.label}>
                  Quantidade de ingrediente 3
                </label>
                <input
                  type="number"
                  min="0"
                  className={estilos.input}
                  id="ingrediente3"
                  name="ingrediente3"
                  value={ingrediente3}
                  onChange={(evento) => setIngrediente3(evento.target.valueAsNumber)}
                  placeholder="Digite a quantidade de ingrediente 3"
                  required
                />
              </div>
            </div>
            <div className="col align-self-center">
              <div className={estilos.ehRecheado}>
                <input
                  type="checkbox"
                  id="ehRecheado"
                  className={estilos.ehRecheado_input}
                  name="ehRecheado"
                  value="true"
                  onChange={handleChangeEhRecheado}
                />
                <label htmlFor="ehRecheado" className={estilos.ehRecheado_label}>
                  Marque se o biscoito for recheado.
                </label>
              </div>
            </div>
          </div>
  
            <div className={estilos.button}>
              <ButtonRegister type="submit">Enviar Pedido</ButtonRegister>
            </div>
          </form>
        </section>
        <section>
          <div className="container">
            <div className="row">

              <div className="col">  
                <div className="btn-group-vertical">
                  <button type="button" className="btn btn-primary mb-3">
                    Fila 01: <span className="badge bg-secondary">{pilha1}</span>
                  </button>
                  <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck1">ingrediente 1</label>

                  <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck2">ingrediente 2</label>

                  <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck3">ingrediente 3</label>
                </div>
              </div>

              <div className="col">  
                <div className="btn-group-vertical">
                  <button type="button" className="btn btn-primary mb-3">
                    Fila 02: <span className="badge bg-secondary">{pilha2}</span>
                  </button>
                  <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck1">ingrediente 1</label>

                  <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck2">ingrediente 2</label>

                  <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck3">ingrediente 3</label>
                </div>
              </div>

              <div className="col">
                <div className="btn-group-vertical">
                  <button type="button" className="btn btn-primary mb-3">
                    Fila 03: <span className="badge bg-secondary">{pilha3}</span>
                  </button>
                  <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck1">ingrediente 1</label>

                  <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck2">ingrediente 2</label>

                  <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off"/>
                  <label className="btn btn-outline-primary" htmlFor="btncheck3">ingrediente 3</label>
                </div>
              </div>
            </div>
            <div className="row mb-5">
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary mt-3" type="button">Fogão1</button>
              </div>
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary mt-3" type="button">Fogão2</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default Order;

