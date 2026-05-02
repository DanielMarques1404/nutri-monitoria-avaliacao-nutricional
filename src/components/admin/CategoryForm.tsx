import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GenericUseCases } from "../../domain/useCases/GenericUseCases";
import { Table } from "../layout/Table";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { SupabaseRepository } from "../../infra/supabase/SupabaseRepository";
import type { ICategory } from "../../domain/entities/entities";

const ucCategory = new GenericUseCases<ICategory>(new SupabaseRepository("Categories"));

export const CategoryForm = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<ICategory>({
    defaultValues: {
      id: 0,
      name: "",
    },
  });

  const [categoriesList, setCategoriesList] = useState<ICategory[] | null>(null);

  const updateList = () =>
    ucCategory.listAll().then((categories) => {
      setCategoriesList(categories);
    });

  useEffect(() => {
    updateList();
  }, []);

  const submit = async (data: ICategory) => {
    try {
      await ucCategory.createOrUpdate(data);
      toast.success(`Categoria "${data.name}" ${data.id ? "atualizada" : "criada"} com sucesso!`, {position: "bottom-right"});
      reset();
      updateList();
    } catch (error) {
      console.error("Falha ao registrar Categoria", error);
      toast.error("Falha ao registrar Categoria", {position: "bottom-right"});
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await ucCategory.delete(id);
      updateList();
      toast.success("Categoria excluída com sucesso!", {position: "bottom-right"});
    } catch (error) {
      console.error("Falha ao excluir Categoria", error);
      toast.error("Falha ao excluir Categoria", {position: "bottom-right"});
    }
  };

  const handleUpdate = async (id: number) => {
    const CategoryToUpdate = categoriesList?.find((Category) => Category.id === id);
    if (!CategoryToUpdate) {
      toast.error("Categoria não encontrada", {position: "bottom-right"});
      return;
    }

    setValue("id", CategoryToUpdate.id);
    setValue("name", CategoryToUpdate.name);
    setValue("active", CategoryToUpdate.active);
  };

  return (
    <section className="flex flex-col gap-2 w-1/2 border-2 border-mediumGrey p-4 rounded-md">
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
        <Input
          label={"Categoria"}
          type="text"
          placeholder="Nome da Categoria"
          value={watch("name")}
          {...register("name")}
        />
        <Input
          label={"Ativa"}
          type="checkbox"
          checked={watch("active")}
          {...register("active")}
        />
        <Button
          classname="text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg ml-auto"
          type="submit"
          label="Salvar"
        />
      </form>

      <div className="border-2 border-dark-green my-2"></div>

      <Table
        caption={"Categorias"}
        items={categoriesList || []}
        deleteAction={(id) => handleDelete(id)}
        updateAction={(id) => handleUpdate(id)}
      />
    </section>
  );
};
