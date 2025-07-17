import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import PrintWaterLevel from "../WaterLevel/PrintWaterLevel";
import WaterLevelChart from "../WaterLevel/WaterLevelChart";

function WaterLevelList() {
  const [records, setRecords] = useState([]);
  const { tankId } = useParams();
  const ComponentsRef = useRef();
  const [showTable, setShowTable] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/water?tankId=${tankId}`);
      setRecords(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/water/${id}`);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDownloadPDF = () => {
    const input = ComponentsRef.current;
    html2canvas(input, { useCORS: true, scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("water-level-report.pdf");
    });
  };

  const getWeeklyWaterLevelSummary = () => {
    const grouped = {};
    records.forEach((rec) => {
      const date = new Date(rec.recordedAt || rec.timestamp).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = { levelTotal: 0, count: 0 };
      }
      grouped[date].levelTotal += rec.waterLevel;
      grouped[date].count += 1;
    });

    return Object.entries(grouped).map(([date, values]) => {
      const avgLevel = (values.levelTotal / values.count).toFixed(2);
      return { date, avgLevel };
    });
  };

  const weeklySummary = getWeeklyWaterLevelSummary();

  return (
    <div>
      <Nav />
      <h2>📊 Weekly Water Level Summary</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Average Water Level (%)</th>
          </tr>
        </thead>
        <tbody>
          {weeklySummary.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.avgLevel}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button id="daily-stats" onClick={() => setShowTable((prev) => !prev)}>
        {showTable ? "Hide Daily Records" : "View Daily Records"}
      </button>

      {showTable && (
        <>
          <h2>📋 Water Level Records</h2>
          <Link to="/tank-level">
            <button>Add New Water Level</button>
          </Link>
          <div ref={ComponentsRef}>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Tank ID</th>
                  <th>Location</th>
                  <th>Water Level (%)</th>
                  <th>Status</th>
                  <th>Recorded At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec._id}>
                    <td>{rec.tankId}</td>
                    <td>{rec.location}</td>
                    <td>{rec.waterLevel}%</td>
                    <td>{rec.status}</td>
                    <td>{new Date(rec.recordedAt || rec.timestamp).toLocaleString()}</td>
                    <td>
                      <button className="no-print">
                        <Link to={`/water-level/edit/${rec._id}`}>Edit</Link>
                      </button>
                      <button className="no-print" onClick={() => handleDelete(rec._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="no-print" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </>
      )}
    </div>
  );
}

export default WaterLevelList;


