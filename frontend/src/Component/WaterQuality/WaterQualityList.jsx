import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Nav from "../Nav/nav";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintWaterQuality from "../WaterQuality/PrintWaterQuality";
import WaterQualityChart from "../WaterQuality/WaterQualityChart";

function WaterQualityList() {
  const [records, setRecords] = useState([]);
  const { tankId } = useParams();
  const ComponentsRef = useRef();
  const [showTable, setShowTable] = useState(false); // hide by default ✅

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/water?tankId=${tankId}`
      );
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
      pdf.save("water-quality-report.pdf");
    });
  };

  const getWeeklySummary = () => {
    const grouped = {};
    records.forEach((rec) => {
      const date = new Date(rec.timestamp).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = { phTotal: 0, tdsTotal: 0, count: 0, statusCount: {} };
      }
      grouped[date].phTotal += rec.phLevel;
      grouped[date].tdsTotal += rec.tds;
      grouped[date].count += 1;
      grouped[date].statusCount[rec.status] =
        (grouped[date].statusCount[rec.status] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, values]) => {
      const avgPH = (values.phTotal / values.count).toFixed(2);
      const avgTDS = (values.tdsTotal / values.count).toFixed(2);
      const frequentStatus = Object.entries(values.statusCount).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      return { date, avgPH, avgTDS, frequentStatus };
    });
  };

  const weeklySummary = getWeeklySummary();

  return (
    <div>
      <Nav />
      <WaterQualityChart records={records} />

      <h2>📊 Weekly Water Quality Summary</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Date</th>
            <th>Average PH</th>
            <th>Average TDS</th>
            <th>Most Common Status</th>
          </tr>
        </thead>
        <tbody>
          {weeklySummary.map((row, i) => (
            <tr key={i}>
              <td>{row.date}</td>
              <td>{row.avgPH}</td>
              <td>{row.avgTDS}</td>
              <td>{row.frequentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button id="daily-stats" onClick={() => setShowTable((prev) => !prev)}>
        {showTable ? "Hide Daily Information" : "View Daily Information"}
      </button>

      {showTable && (
        <>
          <h2>📋 Water Quality Records</h2>
          <Link to="/water-quality/add">
            <button>Add New Record</button>
          </Link>
          <div ref={ComponentsRef}>
            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>Tank ID</th>
                  <th>ID</th>
                  <th>PH Level</th>
                  <th>TDS</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec._id}>
                    <td>{rec.tankId}</td>
                    <td>{rec._id}</td>
                    <td>{rec.phLevel}</td>
                    <td>{rec.tds}</td>
                    <td>{rec.status}</td>
                    <td>{new Date(rec.timestamp).toLocaleString()}</td>
                    <td>
                      <button className="no-print">
                        <Link to={`/water-quality/edit/${rec._id}`}>Edit</Link>
                      </button>
                      
                      <button
                        className="no-print"
                        onClick={() => handleDelete(rec._id)}
                      >
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

export default WaterQualityList;
