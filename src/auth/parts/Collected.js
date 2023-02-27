/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 19/02/2023 - 13:42:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { Noitem } from "./Noitem";

const CollectedContext = createContext(null);

export const CollectedProvider = ({ children }) => {
    const auth = useAuth();

    const collects = (user) => {
        fetch(`${auth.api}mycollections?api_token=${auth.api_token}&username=${user}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.code === '00') {
            
          } else {
            return Noitem;
          }
        })
        .catch((err) => {
            return err;
        })
        // return user;
    }

    return (
        <CollectedContext.Provider value={{ collects }}>
            {children}
        </CollectedContext.Provider>
    )
}

export const useCollected = () => {
    return useContext(CollectedContext);
}