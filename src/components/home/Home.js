import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import MaterialTable from 'material-table'

import { useServerData } from '../../context/serverData';
import styles from './home.module.scss';

const TABLE_COLUMNS = [
  { title: 'Date', field: 'datetime', type: 'date' },
  { title: 'Min temp', field: 'temperature_min' },
  { title: 'Max temp', field: 'temperature_max' },
  { title: 'Latitude', field: 'latitude' },
  { title: 'Longitude', field: 'longitude' },
];

const TABLE_OPTIONS = { paging: false, search: false, toolbar: false };

const Home = () => {
  const serverData = useServerData();
  const selectOptions = useMemo(() => serverData
    .filter(({station_id}, i) => serverData.findIndex(entry => entry.station_id === station_id) === i)
    .map(({place_name}) => ({ value: place_name, label: place_name })), [serverData]);
  const [place, setPlace] = useState(selectOptions[0]);
  const dataToShow = useMemo(() => serverData
    .filter(({place_name}) => place_name === place.value)
    .map(({datetime, temperature_min, temperature_max, latitude, longitude}) =>
      ({datetime, temperature_min, temperature_max, latitude, longitude})), [place]);

  return (
    <div>
      <h1>Weather</h1>
      <div className={styles.container}>
        <Select
          id="place"
          className={styles.select}
          defaultValue={selectOptions[0]}
          isSearchable
          name="color"
          options={selectOptions}
          value={place}
          onChange={place => setPlace(place)}
        />
      </div>
      {dataToShow.length > 0 && (
        <div className={styles.tableContainer}>
          <MaterialTable
            columns={TABLE_COLUMNS}
            data={dataToShow}
            options={TABLE_OPTIONS}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
