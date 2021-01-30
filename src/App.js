// import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import firebase from "./firebase";
import ItemsList from "./components/ItemsList";
import Loader from "./components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";
import Context from "./context";
import Techs from "./components/Techs";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [nodes, setNodes] = React.useState([]);
  // const [headData, setHeadData] = React.useState([]);
  const [active, setActive] = React.useState("");
  // const [tetchs, setTechs] = React.useState([]);

  const ActivContext = {
    active: active,
    setActive: (val) => setActive(val),
  };

  // function changeTechs() {}

  // const TetchsContext = {
  //   tetchs: tetchs,
  //   changeTechs,
  // };

  function getHeadNodes(nodes) {
    let arr = [];
    nodes.forEach((item) => {
      let f = true;
      nodes.forEach((itemI) => {
        if (itemI.parts !== undefined) {
          itemI.parts.forEach((el) => {
            if (el === item.id) {
              f = false;
            }
          });
        }
      });
      if (f) arr.push(item);
    });
    return arr;
  }

  function findNodesParts(headNodes, nodes) {
    let arr = headNodes;
    arr.forEach((element, key) => {
      if (element.parts) {
        element.parts.forEach((el, kp) => {
          nodes.forEach((elN) => {
            if (elN.id === el) {
              let a = [];
              if (elN.parts) {
                a = findNodesParts([elN], nodes);
              }
              arr[key].parts[kp] = a[0];
              console.log(arr[key]);
            }
          });
        });
      }
    });
    return arr
  }

  async function getfirebaseData() {
    return await firebase
      .firestore()
      .collection("places")
      .get()
      .then((response) => {
        let docs = response.docs.map((x) => ({
          id: x.id,
          name: x.data().name,
          parts: x.data().parts && x.data().parts.map((part) => part.id),
        }));
        return docs;
      });
  }
  useEffect(() => {
    getfirebaseData().then((docs) => {
      let data = getHeadNodes(docs);
      console.log(JSON.stringify(data),JSON.stringify(docs))
      data = findNodesParts(data, docs);
      console.log(data);
      setNodes(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : nodes ? (
        <Context.Provider value={ActivContext}>
          {/* <ItemsList /> */}
        </Context.Provider>
      ) : (
        <h1>Здания отсутствуют</h1>
      )}
      {/* <Context.Provider value={TetchsContext}>
        <Techs active data={tetchs} />
      </Context.Provider> */}
    </>
  );
}

export default App;
