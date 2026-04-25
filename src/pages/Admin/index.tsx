import { useEffect, useState } from "react";
import { TagUseCase } from "../../domain/useCases/TagUseCase";
import { TagSupabaseRepository } from "../../infra/supabase/TagSupabaseRepository";
import type { QuizTag } from "../../types/game";
import { toast } from "react-toastify";

const ucListTags = new TagUseCase(new TagSupabaseRepository());

export const Admin = () => {
  const [tagsList, setTagsList] = useState<QuizTag[] | null>(null);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    // const updateTagsList = async () => {

    // }
    ucListTags.listAll().then((tags) => {
      setTagsList(tags);
    });
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await ucListTags.create({ id: 0, name: tagName });
      toast.success("Tag criada com sucesso!");
      setTagName("");
    } catch (error) {
      console.error("Falha ao registrar usuário", error);
      toast.error('Falha ao registrar usuário')
    }
  };

  return (
    <section>
      <h1>Admin</h1>
      <ul>
        {tagsList?.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Tag name" id="tagName" value={tagName} onChange={(e) => setTagName(e.target.value)} />
        <button type="submit">Add Tag</button>
      </form>
    </section>
  );
};
