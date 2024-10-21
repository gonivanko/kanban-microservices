import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./KanbanBoard.module.scss";
import { useAuth } from "../../providers/AuthProvider";
import { Plus } from "lucide-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Header from "../../components/Header/Header";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { setShowProject } from "../../redux/slices/alertSlice";
import NewProjectModal from "../../components/Modals/NewProjectModal";
import { Link } from "react-router-dom";

interface Project {
  name: string;
  description: string;
}

const KanbanBoard: React.FC = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data.user);
        const fetchedProjects: Project[] = res.data.data.projects.paginated;
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const handleOpenAlert = () => {
    dispatch(setShowProject(true));
  };

  return (
    <>
      <div className={styles.container}>
        <Header loading={loading} user={null} />
        <SearchBar type="project" />
        <div className={styles.projects_block}>
          {/* {loading
            ? Array.from(new Array(3)).map((_, index) => (
                <div key={index} className={styles.projectCard}></div>
              ))
            : filteredProjects.map((project, index) => (
                <div key={index} className={styles.projectCard}>
                  <h6>{project.name}</h6>
                  <p>{project.description}</p>
                  <button>Open</button>
                </div>
              ))} */}
          {Array.from(new Array(3)).map((_, index) => (
            <div key={index} className={styles.projectCard}>
              <h6>Frontend Project</h6>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Placeat alias inventore unde a excepturi. Repellendus dolore
                reiciendis nam quam blanditiis!
              </p>
              <Link to={`/board?id=${index + 1}`}>Open</Link>
            </div>
          ))}
          <div className={styles.addProjectCard} onClick={handleOpenAlert}>
            <Plus />
            <span>New Project</span>
          </div>
        </div>
      </div>
      <NewProjectModal />
    </>
  );
};

export default KanbanBoard;
