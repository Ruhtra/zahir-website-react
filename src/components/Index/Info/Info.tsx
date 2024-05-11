import image from "../../../assets/imagem.png"
import './Info.css'

export function Info() {
    return (<>
          <div className="info">
                <div className="block">
                    <div className="img">
                        <img src={image} alt="" />
                    </div>
                    <div className="texto">
                        <div className="msg">
                            Oi, meu nome é Ramon Sanmir, tenho 34 anos e moro em Fortaleza, desde que eu era muito novo já gostava do meio artistico e internet no geral, com 12 anos fiz um canal no YouTube com amigos e depois comecei a gravar vídeos para as redes sociais, no tempo sem muito apoio e por ser novo acabei sem dar continuidade. Já vendi dindim alcoólico na praia para conseguir comprar meu computador e iniciar a vida na internet, tive alguns planos atrasados pela pandemia e comecei a fazer transmissões na twitch, após esse período tendo como única fonte de renda os jogos e streams, comecei a fazer conteúdo de experiências e estou me reiventando a cada dia.
                        </div>
                    </div>
                    <div className="back"></div>
                </div>
            </div>
    </>)
}