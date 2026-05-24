import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { ITag } from "../../domain/entities/entities";
import { GenericUseCases } from "../../domain/useCases/GenericUseCases";
import { RepositoryFactory } from "../../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../../utils/data";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const ucTag = new GenericUseCases<ITag>(
  RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createTagRepo(),
);

export const TagForm = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<ITag>({
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  const queryClient = useQueryClient();

  const { data: tagsList } = useQuery({
    queryKey: ["nutri-monitoria-tags"],
    queryFn: async () => {
      return await ucTag.listAll();
    },
  });

  const createUpdateMutation = useMutation({
    mutationFn: (tag: ITag) => {
      return ucTag.createOrUpdate(tag);
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-tags"],
      });
      toast.success(
        `TAG "${variable.name}" ${variable.id ? "atualizada" : "criada"} com sucesso!`,
        {
          position: "bottom-right",
        },
      );
      reset();
    },
    onError: () => {
      //console.error("Falha ao registrar TAG", error);
      toast.error("Falha ao registrar TAG", { position: "bottom-right" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return ucTag.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-tags"],
      });
      toast.success("TAG excluída com sucesso!", {
        position: "bottom-right",
      });
      reset();
    },
    onError: () => {
      // console.error("Falha ao excluir TAG", error);
      toast.error("Falha ao excluir TAG", { position: "bottom-right" });
    },
  });

  const submit = async (data: ITag) => {
    createUpdateMutation.mutate(data);
  };

  const handleDelete = async (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleUpdate = async (id: number) => {
    const tagToUpdate = tagsList?.find((tag) => tag.id === id);
    if (!tagToUpdate) {
      toast.error("TAG não encontrada", { position: "bottom-right" });
      return;
    }

    setValue("id", tagToUpdate.id);
    setValue("name", tagToUpdate.name);
  };

  return (
    <section className="flex flex-col gap-2 w-1/2 border-2 border-mediumGrey p-4 rounded-md">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
        <Input
          label={"TAG"}
          type="text"
          id="firstInput"
          value={watch("name")}
          placeholder="Nome da TAG"
          {...register("name", { required: "Este campo é obrigatório" })}
          errors={errors.name}
        />
        <div className="flex items-center justify-end gap-2">
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            onClick={() => {
              reset();
              (
                document.getElementById("firstInput") as HTMLInputElement | null
              )?.focus();
            }}
            type="button"
            label="Novo"
          />
          <Button
            classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
            type="submit"
            label="Salvar"
          />
        </div>
      </form>

      <div className="border-2 border-dark-green my-2"></div>

      <Table
        caption={"TAGs"}
        items={tagsList || []}
        deleteAction={(id) => handleDelete(id)}
        updateAction={(id) => handleUpdate(id)}
      />
    </section>
  );
};
