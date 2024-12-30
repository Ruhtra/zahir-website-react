import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import "./Anuncie.css";
import { z } from "zod";
import { emailSchema, useEmailSend } from "../../services/Querys/Email";

export function AnuncieRoute() {
  const navigate = useNavigate();
  const { mutate, isLoading: isSubmitting } = useEmailSend();
  const [formData, setFormData] = useState({
    nome: "",
    arroba: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    isSuccess?: boolean;
    message?: string;
  }>({ isOpen: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

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
      emailSchema.parse(formData);
      setFormErrors({});
      setDialogState({ isOpen: true, message: "Enviando seu email..." });

      mutate(formData, {
        onSuccess: () => {
          setDialogState({
            isOpen: true,
            isSuccess: true,
            message: "Email enviado com sucesso! Foi enviado um email de confirmação. <br/> Por favor, cheque sua caixa de spam se não encontrar.",
          });
        },
        onError: () => {
          setDialogState({
            isOpen: true,
            isSuccess: false,
            message: "Houve um erro ao enviar seu email. Tente novamente em alguns minutos.",
          });
        },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
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

          <button type="submit" className="item" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </section>

      {dialogState.isOpen && (
        <div className="dialog">
          <div className="dialog-content">
            {dialogState.isSuccess === undefined ? (
              <p>{dialogState.message}</p>
            ) : dialogState.isSuccess ? (
              <>
                <h2>✅ Sucesso!</h2>
                <p>{dialogState.message}</p>
                <button onClick={() => navigate("/")}>Concluído</button>
              </>
            ) : (
              <>
                <h2>❌ Erro!</h2>
                <p>{dialogState.message}</p>
                <button onClick={() => setDialogState({ isOpen: false })}>Fechar</button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="infos">
        <h2>Para mais informações</h2>
        <h3 className="email">Zahircontato@outlook.com</h3>
      </div>

      <div className="images">
        {[...Array(8).keys()].map((_e, index) => (
          <img key={index} src={`/images/anuncie/0${index+1}.jpg`} alt="" />
        ))}
      </div>
    </>
  );
}
