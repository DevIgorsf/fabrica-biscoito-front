import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import ButtonRegister from "../../components/ButtonRegister";
import http from "../../http";
import estilos from "./Estoque.module.scss";

const Estoque = () => {
    var navigate = useNavigate();

    const token = sessionStorage.getItem('token')
    const role = sessionStorage.getItem('role')

    const [ingrediente1, setIngrediente1] = useState<number>(0);
    const [ingrediente2, setIngrediente2] = useState<number>(0);
    const [ingrediente3, setIngrediente3] = useState<number>(0);

    React.useEffect(() => {
        if(!token) {
          navigate('/login')
        } else if ( role === 'Client') {
            navigate('/')
        }
    }, [navigate]);

    const estocar = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();

      const estoque = {
        ingrediente1,
        ingrediente2,
        ingrediente3
      };

      http.request({
        url: "/fabrica/estoque",   
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        }, 
        data: estoque
      })
        .then(() => {
          alert("Alterado o estoue com sucesso");
        })
        .catch((error) => {
            if (error?.response?.data?.message) {
            alert(error.response.data.message);
            } else {
            alert("Erro ao realizar a alteração");
            }
        });

    }


  
    return (
        <div className={estilos.background}>
            <section className={estilos.container}>
                <form onSubmit={estocar}>
                    <h4 className="d-flex justify-content-center mb-3" >Adicionar ingredientes ao estoque</h4>
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
                        <div className={estilos.button}>
                            <ButtonRegister type="submit">Enviar</ButtonRegister>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Estoque;