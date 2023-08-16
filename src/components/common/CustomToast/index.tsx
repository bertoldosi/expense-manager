import React from "react";
import { toast, ToastOptions } from "react-toastify";

export const customToast = async (
  functionThatReturnPromise: () => Promise<any>,
  messageLoading: string = "Processando! ⏳",
  messageSucesso: string = "Sucesso! 👌",
  messageError?: "Tente novamente mais tarde! 🤯",
  toastOptions: ToastOptions = {
    autoClose: 2000,
    closeButton: true,
  }
): Promise<void> => {
  const loadingToastId = toast.loading(<h3>{messageLoading}</h3>, toastOptions);

  await functionThatReturnPromise()
    .then(() => {
      return toast.update(loadingToastId, {
        render: <h3>{messageSucesso}</h3>,
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        ...toastOptions,
      });
    })

    .catch((error) => {
      return toast.update(loadingToastId, {
        render: <h3>{messageError || error.message}</h3>,
        type: toast.TYPE.ERROR,
        isLoading: false,
        ...toastOptions,
      });
    });
};

// Exemplo de como usar a função customToast
const SomeComponent: React.FC = () => {
  const handleUpdateInstitution = async () => {
    async function fethData() {
      // Simula uma operação assíncrona, como uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 2000))
        .then(() => {
          // Operações necessárias após sucesso da operação
        })
        .catch((error) => {
          // Aqui você retornar um erro, no padrão informado abaixo, que no customToast será exibido no toast

          if (error.response.status === 405) {
            throw new Error("Não permitido. Nome já cadastrado nesse periodo!");
          }

          throw error;
        });
    }

    await customToast(fethData);
  };

  return (
    <div>
      <button onClick={handleUpdateInstitution}>Atualizar Carrinho</button>
    </div>
  );
};

export default SomeComponent;
