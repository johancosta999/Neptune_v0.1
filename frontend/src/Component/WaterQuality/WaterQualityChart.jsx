import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function WaterQualityChart() {
  const [records, setRecords] = useState([]);
  const tankId = localStorage.getItem("selectedTankId");
  const [range, setRange] = useState("1w");

  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/water?tankId=${tankId}`
      );
      setRecords(res.data.data);
    } catch (err) {
      console.error("Error fetching TDS data", err);
    }
  };

  const filterByRange = (data) => {
    const now = new Date();
    let rangeTime;

    if (range === "1h") rangeTime = now - 60 * 60 * 1000;
    else if (range === "1d") rangeTime = now - 24 * 60 * 60 * 1000;
    else if (range === "1w") rangeTime = now - 7 * 24 * 60 * 60 * 1000;

    return data.filter((d) => new Date(d.timestamp) >= rangeTime);
  };

  const filteredRecords = filterByRange(records);

  useEffect(() => {
    fetchData(); // fetch initially

    const interval = setInterval(() => {
      fetchData(); // fetch every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // clean up on unmount
  }, [tankId]);

  return (
    <div>
      <h3>TDS Level Chart (mg/L)</h3>
      <br />

      <select onChange={handleRangeChange}>
        <option value="1h">Last Hour</option>
        <option value="1d">Last Day</option>
        <option value="1w" selected>
          Last Week
        </option>
      </select>

      <ResponsiveContainer
        width="85%"
        height={500}
        style={{ margin: "0 auto" }}
      >
        <LineChart data={filteredRecords}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
          />
          <YAxis domain={[0, 1000]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="tds"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WaterQualityChart;
