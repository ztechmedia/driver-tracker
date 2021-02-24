import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

//load services
import * as NavigationServices from "../services/navigation/NavigationServices";

//load navigator
import DriverNavigator from "./DriverNavigator";

const NavigationContainer = (props) => {
  const navRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    NavigationServices.setNavigator(navRef.current);
  }, []);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({
          routeName: "Auth",
        })
      );
    }
  }, [isAuth]);

  return <DriverNavigator ref={navRef} />;
};

export default NavigationContainer;
