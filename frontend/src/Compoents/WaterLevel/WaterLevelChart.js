import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

function WaterLevelChart() {
  const { tankId } = useParams();
  const [records, setRecords] = useState([]);
  const [range, setRange] = useState("1w");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/water?tankId=${tankId}`
      );
      setRecords(res.data.data);
    } catch (err) {
      console.error("Error fetching water level data", err);
    }
  };

  const filterByRange = (data) => {
    const now = new Date();
    let rangeTime;

    if (range === "1h") rangeTime = now - 60 * 60 * 1000;
    else if (range === "1d") rangeTime = now - 24 * 60 * 60 * 1000;
    else if (range === "1w") rangeTime = now - 7 * 24 * 60 * 60 * 1000;

    return data.filter(
      (d) => new Date(d.recordedAt || d.timestamp) >= rangeTime
    );
  };

  const filteredRecords = filterByRange(records);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [tankId]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#1976d2" }}>
        📊 Water Level Chart (%) - {tankId}
      </h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="range">Select Time Range: </label>
        <select
          id="range"
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{ padding: "8px", fontSize: "14px", marginLeft: "10px" }}
        >
          <option value="1h">Last Hour</option>
          <option value="1d">Last Day</option>
          <option value="1w">Last Week</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={filteredRecords}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="recordedAt"
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }
            label={{ value: "Time", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            domain={[0, 100]}
            label={{
              value: "Water Level (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="waterLevel"
            stroke="#42a5f5"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Water Level"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WaterLevelChart;
