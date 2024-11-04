import Header from "../../components/Header/Header";
import EditProfileModal from "../../components/Modals/EditProfileModal";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import styles from "./Profile.module.scss";

export default function ProfilePage() {
  return (
    <>
      <article className={styles.root}>
        <Header loading={true} user={null} />
        <ProfileCard />
      </article>
      <EditProfileModal />
    </>
  );
}
