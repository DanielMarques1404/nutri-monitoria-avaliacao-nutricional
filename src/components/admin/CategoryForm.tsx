import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CategoryUseCase } from "../../domain/useCases/CategoryUseCase";
import { CategorySupabaseRepository } from "../../infra/supabase/CategorySupabaseRepository";
import type { Category } from "../../types/game";

const ucCategory = new CategoryUseCase(new CategorySupabaseRepository());

export const CategoryForm = () => {
  const [categoriesList, setCategoriesList] = useState<Category[] | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    ucCategory.listAll().then((categories) => {
      setCategoriesList(categories);
    });
  }, []);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await ucCategory.create({ id: 0, name: categoryName, active: active });
      toast.success("Categoria criada com sucesso!");
      setCategoryName("");
      setActive(true);
    } catch (error) {
      console.error("Falha ao registrar Categoria", error);
      toast.error("Falha ao registrar Categoria");
    }
  };

  return (
    <section>
      <h1>Categorias</h1>
      <ul>
        {categoriesList?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <input
          type="checkbox"
          id="categoryActive"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        <label htmlFor="categoryActive">Ativa</label>
        <button type="submit">Add Category</button>
      </form>
    </section>
  );
};
