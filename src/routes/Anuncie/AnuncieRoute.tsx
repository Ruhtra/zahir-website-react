import React, { useState } from "react";
import Images from "../../assets/Images";
import PageTitle from "../../components/PageTitle";
import "./Anuncie.css";
import { z } from "zod";
import { emailSchema, useEmailSend } from "../../services/Querys/Email";

export function AnuncieRoute() {
  const { mutate, isLoading, isError } = useEmailSend();

  const [formData, setFormData] = useState({
    nome: "",
    arroba: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    // Valida o campo individualmente
    if (emailSchema.shape[name]) {
      try {
        z.object({ [name]: emailSchema.shape[name] }).parse({ [name]: value });
        setFormErrors((prev) => {
          const updatedErrors = { ...prev };
          delete updatedErrors[name];
          return updatedErrors;
        });
      } catch (err) {
        // Mantém o erro atual, se houver
      }
    }
  };
  
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Valida os dados do formulário usando o Zod
      emailSchema.parse(formData);

      // Limpa os erros
      setFormErrors({});

      // Faz o envio do formulário
      mutate(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // Coleta os erros de validação
        const errors: Record<string, string> = {};
        err.errors.forEach((issue) => {
          errors[issue.path[0] as string] = issue.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <>
      <PageTitle title={"Anuncie"} />
      <div className="top">
        <h1>Quer anunciar com a gente?</h1>
        <h3>Conta mais sobre o que você precisa para entrarmos em contato com você!</h3>
      </div>

      <section className="formSection">
        <form className="formulario" onSubmit={handleSubmit}>
          <h3 className="titulof">Formulário de Contato do Site do Zahir</h3>

        <div className="nome">
          <input
            type="text"
            name="nome"
            className="item"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
          />
          {formErrors.nome && <span className="error">{formErrors.nome}</span>}
        </div>
<div className="arroba">
          <input
            type="text"
            className="item"
            name="arroba"
            placeholder="@"
            value={formData.arroba}
            onChange={handleChange}
          />
          {formErrors.arroba && <span className="error">{formErrors.arroba}</span>}

</div>

<div className="email">
          <input
            type="email"
            className="item"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <span className="error">{formErrors.email}</span>}

</div>

<div className="numero">
          <input
            type="text"
            className="item"
            name="telefone"
            placeholder="(xx) x xxxx-xxxx"
            value={formData.telefone}
            onChange={handleChange}
          />
          {formErrors.telefone && <span className="error">{formErrors.telefone}</span>}

</div>

<div className="mensagem">
          <textarea
            className="item"
            name="mensagem"
            placeholder="Mensagem"
            value={formData.mensagem}
            onChange={handleChange}
          ></textarea>
          {formErrors.mensagem && <span className="error">{formErrors.mensagem}</span>}

</div>

          <button type="submit" className="item" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
          {isError && <span className="error">Erro ao enviar o formulário. Tente novamente.</span>}
        </form>
      </section>

      <div className="infos">
        <h2>Para mais informações</h2>
        <h3 className="email">Zahircontato@outlook.com</h3>
      </div>

      <div className="images">
        {[...Array(8).keys()].map((_e, index) => (
          <img key={index} src={Images.backImageExample} alt="" />
        ))}
      </div>
    </>
  );
}
