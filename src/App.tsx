import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Cat, Dog, Heart, LayoutGrid, ListFilter, Menu, MoreHorizontal,
  Pencil, Plus, Search, Sparkles, Trash2, Volume2, X,
} from "lucide-react";

type Species = "Cachorro" | "Gato";
type Pet = { id: string; name: string; age: number; species: Species; breed?: string; color: string };
type Toast = { message: string; kind: "success" | "danger" } | null;
type ToastKind = "success" | "danger";

const seed: Pet[] = [
  { id: "1", name: "Tobias", age: 4, species: "Cachorro", breed: "Golden Retriever", color: "gold" },
  { id: "2", name: "Luna", age: 2, species: "Gato", breed: "Siamês", color: "purple" },
  { id: "3", name: "Max", age: 7, species: "Cachorro", breed: "Beagle", color: "blue" },
  { id: "4", name: "Mia", age: 1, species: "Gato", breed: "Persa", color: "pink" },
];
const colors = ["gold", "purple", "blue", "pink", "mint"];

function Button({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{children}</button>;
}

function Modal({ title, subtitle, children, onClose }: { title: string; subtitle: string; children: React.ReactNode; onClose: () => void }) {
  useEffect(() => { const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose(); document.addEventListener("keydown", fn); return () => document.removeEventListener("keydown", fn); }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <section className="modal glass" role="dialog" aria-modal="true">
      <button className="icon-btn modal-close" onClick={onClose} aria-label="Fechar"><X size={19}/></button>
      <div className="modal-icon"><Heart size={24}/></div>
      <h2>{title}</h2><p>{subtitle}</p>{children}
    </section>
  </div>;
}

function PetForm({ pet, onSubmit, onClose }: { pet?: Pet; onSubmit: (pet: Omit<Pet, "id" | "color">) => void; onClose: () => void }) {
  const [species, setSpecies] = useState<Species>(pet?.species ?? "Cachorro");
  const [name, setName] = useState(pet?.name ?? "");
  const [age, setAge] = useState(pet?.age?.toString() ?? "");
  const [breed, setBreed] = useState(pet?.breed ?? "");
  const [error, setError] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Informe o nome do animal.");
    if (age === "" || Number(age) < 0) return setError("Informe uma idade válida.");
    if (!breed.trim()) return setError(`Informe a raça do ${species.toLowerCase()}.`);
    onSubmit({ name: name.trim(), age: Number(age), species, breed: breed.trim() });
  };
  return <form className="pet-form" onSubmit={submit}>
    <div className="species-picker">
      <button type="button" className={species === "Cachorro" ? "active" : ""} onClick={() => setSpecies("Cachorro")}><Dog/> Cachorro</button>
      <button type="button" className={species === "Gato" ? "active" : ""} onClick={() => setSpecies("Gato")}><Cat/> Gato</button>
    </div>
    <label>Nome do animal<input autoFocus value={name} onChange={e => setName(e.target.value)} placeholder="Ex.: Amora"/></label>
    <div className="form-row">
      <label>Idade<input type="number" min="0" value={age} onChange={e => setAge(e.target.value)} placeholder="0"/></label>
      <label>Raça<input value={breed} onChange={e => setBreed(e.target.value)} placeholder={species === "Cachorro" ? "Ex.: Labrador" : "Ex.: Siamês"}/></label>
    </div>
    {error && <div className="form-error">{error}</div>}
    <div className="modal-actions"><Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button><Button type="submit">{pet ? "Salvar alterações" : "Cadastrar animal"}</Button></div>
  </form>;
}

export default function App() {
  const [pets, setPets] = useState<Pet[]>(() => { try { const data = localStorage.getItem("petfolio:pets"); return data ? JSON.parse(data) : seed; } catch { return seed; } });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"Todos" | Species>("Todos");
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<Pet | null>(null);
  const [menu, setMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => localStorage.setItem("petfolio:pets", JSON.stringify(pets)), [pets]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 2600); return () => clearTimeout(id); }, [toast]);

  const visible = useMemo(() => pets.filter(p => (filter === "Todos" || p.species === filter) && p.name.toLowerCase().includes(query.toLowerCase().trim())), [pets, filter, query]);
  const dogs = pets.filter(p => p.species === "Cachorro").length;
  const cats = pets.length - dogs;
  const notify = (message: string, kind: ToastKind = "success") => setToast({ message, kind });
  const create = (data: Omit<Pet, "id" | "color">) => { setPets(v => [...v, { ...data, id: crypto.randomUUID(), color: colors[v.length % colors.length] }]); setModal(null); notify(`${data.name} foi cadastrado com sucesso!`); };
  const edit = (data: Omit<Pet, "id" | "color">) => { if (!selected) return; setPets(v => v.map(p => p.id === selected.id ? { ...p, ...data } : p)); setModal(null); notify("Cadastro atualizado com sucesso!"); };
  const remove = () => { if (!selected) return; setPets(v => v.filter(p => p.id !== selected.id)); setModal(null); setMenu(null); notify(`${selected.name} foi removido.`, "danger"); };
  const open = (type: "edit" | "delete", pet: Pet) => { setSelected(pet); setModal(type); setMenu(null); };

  return <div className="app-shell">
    <div className="orb orb-one"/><div className="orb orb-two"/><div className="orb orb-three"/>
    <header className="topbar glass">
      <a className="brand" href="#"><span><Heart fill="currentColor" size={22}/></span><div>petfolio<small>Seu cantinho animal</small></div></a>
      <nav className={mobileNav ? "open" : ""}><a className="active" href="#inicio"><LayoutGrid size={17}/> Visão geral</a><a href="#animais"><Heart size={17}/> Meus animais</a></nav>
      <button className="mobile-menu icon-btn" onClick={() => setMobileNav(!mobileNav)} aria-label="Menu"><Menu/></button>
      <div className="profile"><div className="avatar">AN</div><div><strong>Olá, Ana!</strong><small>Amiga dos animais</small></div></div>
    </header>

    <main id="inicio">
      <section className="hero">
        <div><span className="eyebrow"><Sparkles size={14}/> CUIDADO EM CADA DETALHE</span><h1>Seus melhores amigos,<br/><em>sempre por perto.</em></h1><p>Organize as informações dos seus animais de um jeito simples, bonito e cheio de carinho.</p></div>
        <Button onClick={() => { setSelected(null); setModal("create"); }}><Plus size={19}/> Novo animal</Button>
      </section>

      <section className="stats-grid">
        <article className="stat glass"><div className="stat-icon total"><Heart/></div><div><span>Total de animais</span><strong>{pets.length}</strong><small>companheiros cadastrados</small></div></article>
        <article className="stat glass"><div className="stat-icon dog"><Dog/></div><div><span>Cachorros</span><strong>{dogs}</strong><small>{pets.length ? Math.round(dogs / pets.length * 100) : 0}% dos seus animais</small></div></article>
        <article className="stat glass"><div className="stat-icon cat"><Cat/></div><div><span>Gatos</span><strong>{cats}</strong><small>{pets.length ? Math.round(cats / pets.length * 100) : 0}% dos seus animais</small></div></article>
      </section>

      <section className="content glass" id="animais">
        <div className="content-head"><div><span className="section-kicker">MINHA FAMÍLIA</span><h2>Animais cadastrados</h2><p>Todos os seus companheiros em um só lugar.</p></div><span className="count-pill">{visible.length} {visible.length === 1 ? "animal" : "animais"}</span></div>
        <div className="toolbar">
          <label className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar pelo nome..."/>{query && <button onClick={() => setQuery("")}><X size={15}/></button>}</label>
          <div className="filters"><ListFilter size={17}/>{(["Todos", "Cachorro", "Gato"] as const).map(f => <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div>
        </div>

        {visible.length ? <div className="pet-grid">{visible.map(pet => <article className="pet-card" key={pet.id}>
          <div className={`pet-portrait ${pet.color}`}>{pet.species === "Cachorro" ? <Dog/> : <Cat/>}<span className="species-tag">{pet.species}</span></div>
          <div className="pet-info"><div><h3>{pet.name}</h3><p>{pet.breed || "Sem raça informada"}</p></div><div className="card-menu"><button className="icon-btn" onClick={() => setMenu(menu === pet.id ? null : pet.id)} aria-label="Opções"><MoreHorizontal/></button>{menu === pet.id && <div className="menu-pop glass"><button onClick={() => open("edit", pet)}><Pencil/> Editar</button><button className="delete" onClick={() => open("delete", pet)}><Trash2/> Excluir</button></div>}</div></div>
          <div className="pet-meta"><span><b>{pet.age}</b> {pet.age === 1 ? "ano" : "anos"}</span><button onClick={() => notify(pet.species === "Cachorro" ? `${pet.name}: Au au!` : `${pet.name}: Miau!`)}><Volume2/> Ouvir som</button></div>
        </article>)}</div> : <div className="empty"><div><Search/></div><h3>Nenhum animal encontrado</h3><p>Ajuste a busca ou cadastre um novo companheiro.</p><Button onClick={() => setModal("create")}><Plus/> Novo animal</Button></div>}
      </section>
    </main>

    <footer><span><Heart fill="currentColor" size={15}/> Feito com carinho para quem ama animais.</span><small>Petfolio © 2026</small></footer>

    {modal === "create" && <Modal title="Novo companheiro" subtitle="Preencha os dados para adicionar à sua família." onClose={() => setModal(null)}><PetForm onSubmit={create} onClose={() => setModal(null)}/></Modal>}
    {modal === "edit" && selected && <Modal title={`Editar ${selected.name}`} subtitle="Atualize as informações do seu animal." onClose={() => setModal(null)}><PetForm pet={selected} onSubmit={edit} onClose={() => setModal(null)}/></Modal>}
    {modal === "delete" && selected && <Modal title="Remover animal?" subtitle={`Tem certeza que deseja remover ${selected.name}? Esta ação não poderá ser desfeita.`} onClose={() => setModal(null)}><div className="modal-actions"><Button variant="ghost" onClick={() => setModal(null)}>Cancelar</Button><Button variant="danger" onClick={remove}><Trash2 size={17}/> Sim, remover</Button></div></Modal>}
    {toast && <div className={`toast ${toast.kind}`}><span>{toast.kind === "success" ? "✓" : <Trash2 size={16}/>}</span>{toast.message}</div>}
  </div>;
}
