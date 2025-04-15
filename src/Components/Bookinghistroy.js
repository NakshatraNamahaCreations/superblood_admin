import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaSearch, FaEye } from "react-icons/fa";

function Bookinghistroy() {
  const [loading, setLoading] = useState(false);
  const [allenquirydata, setAllenquirydata] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchAllenquiryData();
  }, []);

  useEffect(() => {
    setFilteredData(
      allenquirydata.filter((item) =>
        item.userName?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allenquirydata]);

  const fetchAllenquiryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.nakshatranamahacreations.com/api/getconfirmenquiry"
      );
      setAllenquirydata(response.data.data || []);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const columns = [
    {
      name: "SI NO",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.userName,
      sortable: true,
      width: "150px",
    },
    {
      name: "Mobile Number",
      selector: (row) => row.phoneNumber,
      sortable: true,
      width: "150px",
    },
    {
      name: "Pickup Location",
      selector: (row) => row.pickuplocation,
      sortable: true,
      width: "250px",
    },
    {
      name: "Drop Location",
      selector: (row) => row.droplocation,
      sortable: true,
      width: "250px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      width: "120px",
    },
    {
      name: "Distance",
      selector: (row) => row.distance,
      sortable: true,
      width: "120px",
    },
    {
      name: "Action",
      cell: (row) => (
        <FaEye
          style={{ cursor: "pointer", color: "#007bff", fontSize: "18px" }}
          onClick={() => handleViewClick(row)}
          title="View"
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "80px",
    },
  ];

  return (
    <div className="container">
      <div className="user-container">
        <div className="header d-flex justify-content-between align-items-center">
          <h2 className="title">Enquiry Management</h2>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Name..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="table-container">
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              striped
              highlightOnHover
              responsive
              persistTableHead
              className="custom-table"
            />
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enquiry Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow ? (
            <div>
              <p>
                <strong>Name:</strong> {selectedRow.userName}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRow.phoneNumber}
              </p>
              <p>
                <strong>Date:</strong> {selectedRow.date}
              </p>
              <p>
                <strong>Time:</strong> {selectedRow.time}
              </p>
              <p>
                <strong>Pickup:</strong> {selectedRow.pickuplocation}
              </p>
              <p>
                <strong>Drop:</strong> {selectedRow.droplocation}
              </p>
              <p>
                <strong>Distance:</strong> {selectedRow.distance}
              </p>
              <p>
                <strong>Body Type:</strong> {selectedRow.selectbody}
              </p>
            </div>
          ) : (
            <p>No data found.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        * {
          font-family: "Poppins", sans-serif;
        }
        .container {
          padding: 20px;
          max-width: 100%;
          width: 100%;
        }

        .title {
          font-size: 22px;
          font-weight: bold;
          color: #333;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 8px 12px;
          margin: 20px 0;
          width: 300px;
          border: 1px solid #ddd;
        }

        .search-icon {
          color: #888;
          margin-right: 8px;
        }

        .search-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          width: 100%;
        }

        .table-container {
          background: white;
          padding: 10px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          overflow-x: auto;
        }

        .custom-table {
          width: 100%;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }
      `}</style>
    </div>
  );
}

export default Bookinghistroy;
