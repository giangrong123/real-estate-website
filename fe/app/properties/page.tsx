import PropertyCard from "@/components/property/PropertyCard";
import { PROPERTIES_DATA } from "@/data/properties";
import { USERS_DATA } from "@/data/users";
import styles from "./properties.module.css";

export default function PropertiesPage() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Danh sách bất động sản</h1>

      <div className={styles.grid}>
        {PROPERTIES_DATA.map((item) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </section>
  );
}