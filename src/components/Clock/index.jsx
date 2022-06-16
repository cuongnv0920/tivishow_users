import React, { useEffect, useState } from "react";

Clock.propTypes = {};

function Clock(props) {
  const [clock, setClock] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClock(date.toLocaleTimeString());
    }, 1000);
  }, []);

  return <div>{clock}</div>;
}

export default Clock;
