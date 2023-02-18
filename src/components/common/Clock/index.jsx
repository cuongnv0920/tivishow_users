import React, { useEffect, useState } from "react";

Clock.propTypes = {};

export function Clock(props) {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return <div>{clock}</div>;
}
