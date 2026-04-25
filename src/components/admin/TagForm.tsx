import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TagUseCase } from "../../domain/useCases/TagUseCase";
import { TagSupabaseRepository } from "../../infra/supabase/TagSupabaseRepository";
import type { Tag } from "../../types/game";

const ucTag = new TagUseCase(new TagSupabaseRepository());

export const TagForm = () => {
  const [tagsList, setTagsList] = useState<Tag[] | null>(null);
  const [tagName, setTagName] = useState("");

  useEffect(() => {
    ucTag.listAll().then((tags) => {
      setTagsList(tags);
    });
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await ucTag.create({ id: 0, name: tagName });
      toast.success("Tag criada com sucesso!");
      setTagName("");
    } catch (error) {
      console.error("Falha ao registrar TAG", error);
      toast.error("Falha ao registrar TAG");
    }
  };

  return (
    <section>
      <h1>Tags</h1>
      <ul>
        {tagsList?.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tag name"
          id="tagName"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button type="submit">Add Tag</button>
      </form>
    </section>
  );
};
