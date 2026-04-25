import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { TagUseCase } from "../../domain/useCases/TagUseCase";
import { TagSupabaseRepository } from "../../infra/supabase/TagSupabaseRepository";
import type { Tag } from "../../types/game";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const ucTag = new TagUseCase(new TagSupabaseRepository());

export const TagForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<Tag>({
    defaultValues: {
      name: "",
    },
  });

  const [tagsList, setTagsList] = useState<Tag[] | null>(null);

  useEffect(() => {
    ucTag.listAll().then((tags) => {
      setTagsList(tags);
    });
  }, []);

  const submit = async (data: Tag) => {
    try {
      await ucTag.create({ id: 0, name: data.name });
      toast.success("TAG criada com sucesso!");
      reset();
    } catch (error) {
      console.error("Falha ao registrar TAG", error);
      toast.error("Falha ao registrar TAG");
    }
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
          label="Adicionar"
        />
      </form>

      <div className="border-2 border-dark-green my-2"></div>

      <ul>
        {tagsList?.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </section>
  );
};
