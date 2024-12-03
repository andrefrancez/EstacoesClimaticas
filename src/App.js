import { useState } from 'react'

const App = () => {
  const [dados, setDados] = useState({
    longitude: null,
    latitude: null,
    estacao: null,
    data: null,
    icone: null
  })

  const [erros, setErros] = useState(null)

  var obterEstacao = (data, latitude) => {
    const ano = data.getFullYear()

    const a1 = new Date(ano, 5, 23)
    const a2 = new Date(ano, 8, 24)
    const a3 = new Date(ano, 11, 22)

    const sul = latitude < 0

    if (data >= a1 && data < a2)
      return sul ? 'Inverno' : 'Verão'

    if (data >= a2 && data < a3)
      return sul ? 'Primavera' : 'Outono'

    if (data >= a3 || data < a1)
      return sul ? 'Verão' : 'Inverno'

    return sul ? 'Outono' : 'Primavera'
  }

  var icones = {
    'Primavera': 'fa-seedling',
    'Verão': 'fa-umbrella-beach',
    'Inverno': 'fa-snowman',
    'Outono': 'fa-tree'
  }

  var obterLocal = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        let estacaoAtual = obterEstacao(new Date(), position.coords.latitude)
        let iconeEstacao = icones[estacaoAtual]

        setDados(
          (prev) => ({
            ...prev,
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            estacao: estacaoAtual,
            data: new Date().toLocaleDateString(),
            icone: iconeEstacao
          })
        )
      },
      (erro) => {
        console.log(erro)
        setErros("Erro ao obter a localização!")
      }
    )
  }

  return (
    <div className='container mt-2'>
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='card'>
            <div className='card-body'>
              <div className='d-flex align-itens-center border rounded mb-2'
                style={{ height: '6rem' }}>
                { }
                <i className={`fas fa-5x ${dados.icone}`}></i>
                { }
                <p className='w-75 ms-3 text-center fs-1'>{dados.estacao}</p>
              </div>
              <div>
                <p className='text-center'>
                  {
                    dados.latitude ? `Coordenadas: ${dados.latitude}, ${dados.longitude}. Data: ${dados.data}` :
                      erros ? `${erros}` : "Clique no botão para saber sua estação."
                  }
                </p>
              </div>
              <button onClick={obterLocal} className='btn btn-outline-primary w-100 mt-2'>
                Qual a minha estação?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App