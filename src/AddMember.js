import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/editMovie.css";

function AddMember(props) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState([]);
  const [City, setCity] = useState("");
  const config = { headers: { "x-access-token": sessionStorage["token"] } };

  const saveMember = async () => {
    var newMember = { Name: Name, Email: Email, City: City };
    await axios.post(
      "https://cinemaws.herokuapp.com/api/Members/",
      newMember,
      config
    );
    props.UpdateCallBack();
  };

  return (
    <div className="editPage">
      <div className="border">
        <h1 className="title">Add Member:</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label className="labels" for="Name">
            Full Name:{" "}
          </label>
          <input
            required
            className="data"
            id="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label className="labels" for="Email">
            Email:{" "}
          </label>
          <input
            required
            className="data"
            id="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="labels" for="City">
            City:{" "}
          </label>
          <input
            required
            className="data"
            id="City"
            type="text"
            onChange={(e) => setCity(e.target.value)}
          />
          <br />

          <div>
            <button type="submit" onClick={saveMember}>
              {" "}
              <Link className="link" to={`/Subscriptions`}>
                Save
              </Link>
            </button>
            <button>
              {" "}
              <Link className="cardsLinks" to={`/Subscriptions`}>
                Cancel{" "}
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
