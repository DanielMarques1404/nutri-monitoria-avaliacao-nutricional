import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TagUseCase } from "../../domain/useCases/TagUseCase";
import { TagSupabaseRepository } from "../../infra/supabase/TagSupabaseRepository";
import type { Tag } from "../../types/game";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const ucTag = new TagUseCase(new TagSupabaseRepository());

export const TagForm = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<Tag>({
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  const [tagsList, setTagsList] = useState<Tag[] | null>(null);

  const updateList = () =>
    ucTag.listAll().then((tags) => {
      setTagsList(tags);
    });

  useEffect(() => {
    updateList();
  }, []);

  const submit = async (data: Tag) => {
    try {
      await ucTag.createOrUpdate({ id: data.id, name: data.name });
      toast.success(`TAG "${data.name}" ${data.id ? "atualizada" : "criada"} com sucesso!`);
      reset();
      updateList();
    } catch (error) {
      console.error("Falha ao registrar TAG", error);
      toast.error("Falha ao registrar TAG");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await ucTag.delete(id);
      updateList();
      toast.success("TAG excluída com sucesso!");
    } catch (error) {
      console.error("Falha ao excluir TAG", error);
      toast.error("Falha ao excluir TAG");
    }
  };

  const handleUpdate = async (id: number) => {
    const tagToUpdate = tagsList?.find((tag) => tag.id === id);
    if (!tagToUpdate) {
      toast.error("TAG não encontrada");
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
