import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animals } from "../../models/Animals";
import "./renderAnimals.css"
import { IAnimal } from "../../models/IAnimal";
import axios from "axios";
import { Div } from "../../styles/Div";

export function RenderAnimals(){
    const[animals,setAnimals]=useState<Animals[]>([]);
    
    useEffect(()=>{
        axios
        .get<IAnimal[]>('https://animals.azurewebsites.net/api/animals')
        .then((response)=>{
        let apiAnimals= response.data.map((animal)=>{
            // skapade klassen för övningens skull har inte mycket användning i detta fallet
                return new Animals(
                    animal.id, 
                    animal.name, 
                    animal.shortDescription, 
                    animal.imageUrl, 
                    animal.isFed, 
                    animal.lastFed,
                    animal.yearOfBirth,
                    animal.medicine,
                    animal.longDescription)
            })
            if(!localStorage.getItem('animals')){
                localStorage.setItem('animals', JSON.stringify(apiAnimals));
            }
    }) 
  
},[])
    useEffect(()=>{
        if(animals.length>0)return;
        let lsAnimals=localStorage.getItem('animals');
        if(lsAnimals){
           setAnimals(JSON.parse(lsAnimals));
        }
    })
  
     let lis =animals.map((animal)=>{
         let animalLink=`/animal/${animal.id}`;
         return(
             <li key={animal.id}>
                <Link className="link" to={animalLink}>
                    <h3>{animal.name}</h3>
                    <img className="images" src={animal.imageUrl}></img>
                    <p>{animal.description}</p> 
                    {animal.isFed==false?
                    <Div>
                        Jag behöver matas!
                    </Div>:""
                }
                </Link>
            </li>
         )
     })
    return(
        <>
        <ul >{lis}</ul>
        </>
    )
           
}