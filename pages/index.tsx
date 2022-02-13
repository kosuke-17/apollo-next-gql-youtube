import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useMutation, useQuery } from "@apollo/client";
import { getAll } from "../graphql/Query";
import { CREATE_POST, DELETE_POST } from "../graphql/Mutation";
import { useState } from "react";

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(getAll);
  const [createPost] = useMutation(CREATE_POST);
  const [deletePost] = useMutation(DELETE_POST);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  const addPost = () => {
    createPost({
      variables: {
        title: title,
        description: description,
      },
    });
  };

  const removePost = (id: string) => {
    console.log(id);

    deletePost({
      variables: {
        id: id,
      },
    });
  };
  return (
    <div className={styles.container}>
      {data.getAll.map((data: any) => (
        <div key={data.id}>
          <h1>タイトル</h1>
          <p>{data.title}</p>
          <h1>内容</h1>
          <p>{data.description}</p>
          <button onClick={() => removePost(data.id)}>削除</button>
        </div>
      ))}
      <hr />
      title &nbsp;:&nbsp;
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <br />
      <br />
      description &nbsp;:&nbsp;
      <input type="text" onChange={(e) => setDescription(e.target.value)} />
      <br />
      <br />
      <button onClick={() => addPost()}>記事投稿</button>
    </div>
  );
};

export default Home;
