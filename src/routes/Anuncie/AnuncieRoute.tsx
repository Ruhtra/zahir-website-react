import Images from "../../assets/Images"
import PageTitle from "../../components/PageTitle"
import "./Anuncie.css"

export function AnuncieRoute() {
    return (
        <>
            <PageTitle title={"Anuncie"} />
            <div className="top">
                <h1>Quer anunciar com a gente?</h1>
                <h3>Conta mais sobre o que você precisa para entrarmos em contato com você!</h3>
            </div>

            <section className="formSection">
                <form action="#" className="formulario">
                    <h3 className="titulof">Formulário de Contato do Site do Zahir</h3>

                    {/* <div className="nome"> */}
                    <input type="text" className="nome item" placeholder="Nome" />
                    {/* </div> */}
                    {/* <div className="arroba item"> */}
                    <input type="text" className="arroba item" placeholder="@" />
                    {/* </div> */}
                    {/* <div className="email item"> */}
                    <input type="email" className="email item" placeholder="E-mail" />
                    {/* </div> */}
                    {/* <div className="numero item"> */}
                    <input type="text" className="numero item" placeholder="(xx) x xxxx-xxxx" />
                    {/* </div> */}
                    {/* <div className="mensagem item"> */}
                    <textarea className="mensagem item" placeholder="Mensagem"></textarea>
                    {/* </div> */}
                    <button type="submit" className="item">enviar</button>
                </form>
            </section>


            <div className="infos">
                <h2>Para mais informações</h2>
                <h3 className="email">Zahircontato@outlook.com</h3>
            </div>

            <div className="images">
                {
                    [...Array(8).keys()].map((_e, index) => (
                        <img key={index} src={Images.backImageExample} alt="" />
                    ))
                }
            </div>
        </>
    )
}