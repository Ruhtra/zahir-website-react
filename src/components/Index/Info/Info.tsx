import { Skeleton } from "@radix-ui/themes";
import "./Info.css";
import { useContext } from "react";
import Images from "../../../assets/Images";
import { CarouselContext } from "../CarouselContext";
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  const dia = hoje.getDate() - nascimento.getDate();
  if (mes < 0 || (mes === 0 && dia < 0)) {
    idade--;
  }
  return idade;
}

export function Info() {
  const { isLoading } = useContext(CarouselContext);
  const idade = calcularIdade("1999-06-10");

  return (
    <>
      <div className="info">
        <div className="block">
          <Skeleton loading={isLoading}>
            <div className="img">
              <img src={Images.zahirImageIndex} alt="" loading="lazy" />
            </div>
          </Skeleton>
          <Skeleton loading={isLoading}>
            <div className="texto">
              <div className="msg">
                Oi, meu nome é Ramon Sanmir, tenho {idade} anos e moro em
                Fortaleza, desde que eu era muito novo já gostava do meio
                artistico e internet no geral, com 12 anos fiz um canal no
                YouTube com amigos e depois comecei a gravar vídeos para as
                redes sociais, no tempo sem muito apoio e por ser novo acabei
                sem dar continuidade. Até já vendi dindim alcoólico na praia
                para conseguir comprar meu computador e iniciar a vida na
                internet, tive alguns planos atrasados pela pandemia e comecei a
                fazer transmissões na twitch, após esse período tendo como única
                fonte de renda os jogos e streams, comecei a fazer conteúdo de
                experiências e viagens, agora rodo por vários lugares mostrando
                um pouco da minha visão pelo mundo!
              </div>
            </div>
          </Skeleton>
          {!isLoading && <div className="back"></div>}
        </div>
      </div>
    </>
  );
}
