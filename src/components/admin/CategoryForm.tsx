import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CategoryUseCase } from "../../domain/useCases/CategoryUseCase";
import { CategorySupabaseRepository } from "../../infra/supabase/CategorySupabaseRepository";
import type { Category } from "../../types/game";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const ucCategory = new CategoryUseCase(new CategorySupabaseRepository());

export const CategoryForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<Category>({
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const [categoriesList, setCategoriesList] = useState<Category[] | null>(null);

  useEffect(() => {
    ucCategory.listAll().then((categories) => {
      setCategoriesList(categories);
    });
  }, []);

  const submit = async (data: Category) => {
    try {
      console.log(data);
      await ucCategory.create({ id: 0, name: data.name, active: data.active });
      toast.success("Categoria criada com sucesso!");
      reset();
    } catch (error) {
      console.error("Falha ao registrar Categoria", error);
      toast.error("Falha ao registrar Categoria");
    }
  };

  return (
    <section>
      <h1>Categorias</h1>

      <form onSubmit={handleSubmit(submit)}>
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
          classname="inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded-md text-lg"
          type="submit"
          label={"Adicionar"}
        />
      </form>

      <ul>
        {categoriesList?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </section>
  );
};
