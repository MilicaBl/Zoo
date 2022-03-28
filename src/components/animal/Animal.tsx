import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimal";
import { Div } from "../../styles/Div";
import "./animal.css";

export function Animal() {
  const [animalId, setAnimalId] = useState(0);
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [isFed, setIsFed] = useState(true);
  const [getAnimals, setGetAnimlas] = useState(false);
  let params = useParams();

  // Hitta url id
  useEffect(() => {
    if (params.id) {
      setAnimalId(+params.id);
    }
  }, []);

  // Hämta djur från ls
  useEffect(
    () => {
      let lsAnimals = localStorage.getItem("animals");

      if (lsAnimals) {
        setAnimals(JSON.parse(lsAnimals));
      }
    },
    [animalId, getAnimals]
  );
  useEffect(
    () => {
      let timeNow = new Date().getTime();
      for (let a of animals) {
        if (a.id === animalId) {
          let lastFed = new Date(a.lastFed).getTime();
          if (lastFed) {
            let diff = Math.abs(timeNow - lastFed) / 35e5;
            console.log(diff);
            if (diff >= 3) {
              a.isFed = false;
              localStorage.setItem("animals", JSON.stringify(animals));
            }
            if (diff >= 4) {
              setIsFed(false);
            }
          }
        }
      }
    },
    [animalId]
  );

  //Mata djuret
  function feedAnimal() {
    for (let animal of animals) {
      if (animal.id === animalId) {
        animal.isFed = true;
        animal.lastFed = new Date();
      }
    }
    //Spara listan med nya värden till ls
    localStorage.setItem("animals", JSON.stringify(animals));
    setGetAnimlas(true);
    setIsFed(true);
  }
  // Visa html för djuret
  function showAnimal() {
    for (let a of animals) {
      if (a.id === animalId) {
        return (
          <div className="animalDiv">
            <h3>
              {a.name}
            </h3>
            <p>
              Född: {a.yearOfBirth}
            </p>
            <p>
              {a.longDescription}
            </p>
            <p>
              Mediciner: {a.medicine}
            </p>
            <img src={a.imageUrl} alt="animal" />
            {a.isFed === false
              ? <p>Jag är hungrig! </p>
              : <p>Jag är inte hungrig än! Jag fick mat den {new Date(a.lastFed).toLocaleString()}</p>
             }
            {a.isFed == false &&
              <button disabled={false} onClick={feedAnimal}>
                Mata mig!
              </button>}
            {isFed == false && <Div hidden={false}>Jag behöver matas</Div>}
          </div>
        );
      }
    }
  }
  return (
    <div>
      {showAnimal()}
    </div>
  );
}
