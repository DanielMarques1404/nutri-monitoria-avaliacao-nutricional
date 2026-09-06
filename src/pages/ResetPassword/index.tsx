import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { Button } from "../../components/ui/Button";

export const ResetPassword = () => {
    const [passwords, setPasswords] = useState({ password: "", passwordConfirmation: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { updatePassword } = useAuthContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value,
        }));
    };

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (passwords.password !== passwords.passwordConfirmation) {
            toast.warning("As senhas informadas não conferem", { position: "bottom-right" });
            return;
        }

        try {
            setIsSubmitting(true);
            await updatePassword(passwords.password);
            toast.success("Senha atualizada com sucesso!", { position: "bottom-right" });
            navigate("/admin/login");
        } catch (error) {
            console.error("Falha ao atualizar senha", error);
            toast.error("Falha ao atualizar senha", { position: "bottom-right" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col gap-2 border border-blue-500 p-4 rounded-md" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold">Trocar senha</h2>
                <label className="text-lg font-semibold" htmlFor="password">Nova senha</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Digite sua nova senha"
                    value={passwords.password}
                    onChange={handleChange}
                    className="p-4"
                    required
                />
                <label className="text-lg font-semibold" htmlFor="passwordConfirmation">Confirmar senha</label>
                <input
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Confirme sua nova senha"
                    value={passwords.passwordConfirmation}
                    onChange={handleChange}
                    className="p-4"
                    required
                />
                <Button
                    classname="bg-light-green text-center p-2 rounded-md text-white font-ubuntu text-2xl my-2"
                    type="submit"
                    label={isSubmitting ? "Salvando..." : "Salvar nova senha"}
                    disabled={isSubmitting}
                />
            </form>
        </div>
    );
};
