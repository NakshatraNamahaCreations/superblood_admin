import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

function User() {
  const [loading, setLoading] = useState(false);
  const [alluser, setAlluser] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchalluserdata();
  }, []);

  useEffect(() => {
    const result = alluser.filter((item) => {
      return (
        item.userName.toLowerCase().includes(search.toLowerCase()) ||
        item.Phonenumber.toString().includes(search)
      );
    });
    setFilteredData(result);
  }, [search, alluser]);

  const fetchalluserdata = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.nakshatranamahacreations.com/api/alluser"
      );
      setAlluser(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "SI No",
      selector: (row, index) => index + 1,
      sortable: true,
      // width: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.userName,
      sortable: true,
      // width: "200px",
    },
    {
      name: "Phone Number",
      selector: (row) => row.Phonenumber,
      sortable: true,
      // width: "200px",
    },
  ];

  return (
    <div className="container">
      <div className="user-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <h2 className="title">User Management</h2>
        </div>

        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Name or Phone Number..."
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
              className="custom-table"
              responsive
              persistTableHead
            />
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          padding: 20px;

          margin: auto;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #1c1c1c;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: #f1f1f1;
          border-radius: 8px;
          padding: 8px 12px;
          margin-bottom: 20px;
          width: 100%;
          max-width: 350px;
          border: 1px solid #ddd;
        }

        .search-icon {
          color: #999;
          margin-right: 8px;
        }

        .search-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          width: 100%;
          color: #333;
        }

        .table-container {
          background: #fff;
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }

        .custom-table {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}

export default User;
