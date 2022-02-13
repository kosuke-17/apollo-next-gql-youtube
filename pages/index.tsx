import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { getAll } from "../graphql/Query";
import { CREATE_POST } from "../graphql/Mutation";

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(getAll);
  const [createPost] = useMutation(CREATE_POST);
  if (loading) return <div>loading...</div>;
  const addPost = () => {
    createPost({
      variables: {
        title: "next.jsからのタイトル",
        description: "next.jsからの内容",
      },
    });
  };
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

      <hr />
      {/* <input type="text" /> */}
      <button onClick={() => addPost()}>記事投稿</button>
    </div>
  );
};

export default Home;
