import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import { getAll } from "../graphql/Query";

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(getAll);
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return (
    <div className={styles.container}>
      {data.getAll.map((data: any) => (
        <div key={data.id}>
          <h1>タイトル</h1>
          <p>{data.title}</p>
          <h1>内容</h1>
          <p>{data.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
