import axios from "axios";
import { useMutation } from "react-query";
import { z } from "zod";
import { api } from "../Api";

// Schema de validação usando Zod
export const emailSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres." })
    .nonempty({ message: "O campo 'nome' é obrigatório." }),
  arroba: z
    .string()
    .min(2, { message: "O arroba deve ter pelo menos 2 caracteres." })
    .nonempty({ message: "O campo 'arroba' é obrigatório." }),
  email: z
    .string()
    .email({ message: "Insira um endereço de email válido." })
    .nonempty({ message: "O campo 'email' é obrigatório." }),
  telefone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Insira um número de telefone válido." })
    .nonempty({ message: "O campo 'telefone' é obrigatório." }),
  mensagem: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres." })
    .nonempty({ message: "O campo 'mensagem' é obrigatório." }),
});

type EmailData = z.infer<typeof emailSchema>;

// Hook para envio de email usando useMutation
export function useEmailSend() {
  return useMutation({
    mutationFn: async (data: EmailData) => {
      // Validação do schema antes de enviar
      const parsedData = emailSchema.parse(data);

      // Enviando o objeto via POST
      const response = await api.post("/email/send", parsedData);

      return response.data; // O retorno pode ser ignorado conforme solicitado
    },
    onError: (error) => { 
      if (axios.isAxiosError(error)) {
        console.error("Erro no envio do email:", error.response?.data || error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    },
    onSuccess: () => {
      console.log("Email enviado com sucesso!");
    },
  });
}
