import React, { useContext } from 'react';

const ServerData = React.createContext();

export const ServerDataProvider = props => (
  <ServerData.Provider value={props.value}>
    {props.children}
  </ServerData.Provider>
);

export const useServerData = () => {
  const context = useContext(ServerData);
  return context;
};
