import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { ITag } from "../../domain/entities/entities";
import { GenericUseCases } from "../../domain/useCases/GenericUseCases";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { RepositoryFactory } from "../../infra/factory/RepositoryFactory";
import { CURRENT_TECH_REPOSITORY } from "../../utils/data";

const ucTag = new GenericUseCases<ITag>(RepositoryFactory.getRepo(CURRENT_TECH_REPOSITORY).createTagRepo());

export const TagForm = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<ITag>({
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nutri-monitoria-tags"],
      });
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
    },
  });

  const submit = async (data: ITag) => {
    try {
      createUpdateMutation.mutate(data);
      toast.success(
        `TAG "${data.name}" ${data.id ? "atualizada" : "criada"} com sucesso!`,
        { position: "bottom-right" },
      );
      reset();
    } catch (error) {
      console.error("Falha ao registrar TAG", error);
      toast.error("Falha ao registrar TAG", { position: "bottom-right" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      deleteMutation.mutate(id);
      toast.success("TAG excluída com sucesso!", { position: "bottom-right" });
    } catch (error) {
      console.error("Falha ao excluir TAG", error);
      toast.error("Falha ao excluir TAG", { position: "bottom-right" });
    }
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
          placeholder="Nome da TAG"
          value={watch("name")}
          {...register("name")}
        />
        <Button
          classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg ml-auto"
          type="submit"
          label="Salvar"
        />
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
