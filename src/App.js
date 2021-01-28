// import logo from "./logo.svg";
import React, { useEffect } from "react";
import "./App.css";
import firebase from "./firebase";
import ItemsList from "./components/ItemsList"
import Loader from "./components/Loader";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [data,setData] = React.useState([])

  useEffect(() => {
    firebase.firestore().collection("places").get().then(response => {
      let docs = response.docs.map(x => ({
        id: x.id,
        data: x.data(),
        parts: x.data().parts && x.data().parts.map(part => part.id)
      }));
      console.info(docs);
      setData(docs)
      setLoading(false)
    });


  }, []);

  return (
    <div className="wrapper">

      {data.length ? (
        <ItemsList data={data} />
      ) : loading ? <Loader/> : (
        <p>No items</p>
      )}


    </div>
  );
}

export default App;
