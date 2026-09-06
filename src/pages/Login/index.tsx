import { useState } from "react";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [isRequestingReset, setIsRequestingReset] = useState(false);
    const navigate = useNavigate();
    const { login, requestPasswordReset } = useAuthContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const loginUser = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            login && await login(credentials.email, credentials.password);
            toast.success("Login efetuado com sucesso!", { position: "bottom-right"});
            navigate('/admin/');
        } catch (error) {
            console.error("Falha ao efetuar login", error);
            toast.error("Falha no login", { position: "bottom-right"});
        }
    };

    const handlePasswordReset = async () => {
        if (!credentials.email) {
            toast.warning("Informe seu email para solicitar a troca de senha", { position: "bottom-right" });
            return;
        }

        try {
            setIsRequestingReset(true);
            await requestPasswordReset(credentials.email);
            toast.success("Se o email estiver cadastrado, você receberá um link para trocar a senha.", { position: "bottom-right" });
        } catch (error) {
            console.error("Falha ao solicitar troca de senha", error);
            toast.error("Falha ao solicitar troca de senha", { position: "bottom-right" });
        } finally {
            setIsRequestingReset(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col gap-2 border border-blue-500 p-4 rounded-md" onSubmit={loginUser}>
                <h2 className="text-xl font-bold">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="p-4"
                    required
                />
                <h2 className="text-lg font-semibold">Senha</h2>
                <input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={credentials.password}
                    onChange={handleChange}
                    className="p-4"
                    required
                />
                <button
                    type="button"
                    onClick={handlePasswordReset}
                    disabled={isRequestingReset}
                    className="text-sm text-blue-600 underline disabled:cursor-not-allowed disabled:text-gray-400 cursor-pointer"
                >
                    {isRequestingReset ? "Enviando..." : "Esqueci minha senha"}
                </button>
                <Button classname="bg-light-green text-center p-2 rounded-md text-white font-ubuntu text-2xl my-2" type="submit" label={"Entrar"} />
            </form>
        </div>
    );
};
