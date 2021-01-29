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
  const [data, setData] = React.useState([]);
  const [headData, setHeadData] = React.useState([]);
  const [active, setActive] = React.useState("");
  const [tetchs, setTechs] = React.useState([]);

  const ActivContext = {
    active: active,
    setActive: (val) => setActive(val),
  };

  function changeTechs() {}

  const TetchsContext = {
    tetchs: tetchs,
    changeTechs,
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("places")
      .get()
      .then((response) => {
        let docs = response.docs.map((x) => ({
          id: x.id,
          // data: x.data(),
          name: x.data().name,
          parts: x.data().parts && x.data().parts.map((part) => part.id),
        }));
        // setData(docs)

        let hData = [];
        let lData = [];

        docs.forEach((item) => {
          let f = true;
          docs.forEach((itemI) => {
            if (itemI.parts !== undefined) {
              itemI.parts.forEach((el) => {
                if (el === item.id) {
                  f = false;
                }
              });
            }
          });
          if (f) hData.push(item);
          else lData.push(item);
        });

        setHeadData(hData);
        setData(lData);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        {loading ? (
          <Loader />
        ) : headData.length > 0 ? (
          <Context.Provider value={ActivContext}>
            <ItemsList headData={headData} data={data} />
          </Context.Provider>
        ) : (
          <h1>Здания отсутствуют</h1>
        )}
      </div>
      <Context.Provider value={TetchsContext}>
        <Techs active data={tetchs} />
      </Context.Provider>
    </>
  );
}

export default App;
