import { Search } from "lucide-react";
import styles from "./SearchBar.module.scss";
import { useState } from "react";

interface SearchProps {
  type: "task" | "project";
}

export default function SearchBar({ type }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setSearchTerm(value);
  //   if (value) {
  //     setFilteredProjects(
  //       projects.filter((project) =>
  //         project.name.toLowerCase().includes(value.toLowerCase())
  //       )
  //     );
  //   } else {
  //     setFilteredProjects(projects);
  //   }
  // };

  return (
    <div className={styles.searchContainer}>
      <Search />
      <input
        placeholder={
          type === "project" ? "Search projects..." : "Search tasks..."
        }
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}
