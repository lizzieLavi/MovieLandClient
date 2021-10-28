import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/editAndAddUser.css";

function AddUser(props) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState([]);
  const [SessionTimeOut, setSessionTimeOut] = useState("");
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState(0);
  const [checkedPermissions, setCheckedPermissions] = useState([
    { name: "View Subscription", checked: false },
    { name: "Create Subscription", checked: false },
    { name: "Delete Subscription", checked: false },
    { name: "View Movie", checked: false },
    { name: "Create Movie", checked: false },
    { name: "Delete Movie", checked: false },
  ]);
  const config = { headers: { "x-access-token": sessionStorage["token"] } };

  const saveUser = async () => {
    var dateInMil = Date.now();
    var date = new Date(dateInMil);
    var newLogin = { username: UserName, password: Password };
    var returnedLoginData = await axios.post(
      "https://cinemaws.herokuapp.com/api/LogIn/",
      newLogin,
      config
    );
    var newUser = {
      id: returnedLoginData.data.userId,
      FirstName: FirstName,
      LastName: LastName,
      CreatedDate: date.toLocaleDateString(),
      SessionTimeOut: SessionTimeOut,
    };
    await axios.post(
      "https://cinemaws.herokuapp.com/api/users/",
      newUser,
      config
    );
    var permissionsArr = [];

    checkedPermissions.map((permission, index) => {
      if (permission.checked === true)
        permissionsArr = [...permissionsArr, permission.name];
    });

    await axios.post(
      "https://cinemaws.herokuapp.com/api/Permissions",
      { id: returnedLoginData.data.userId, permissions: permissionsArr },
      config
    );

    props.UpdateCallBack();
  };

  const checkPermission = (e) => {
    var PerArr = checkedPermissions;
    PerArr.map((permission, index) => {
      if (permission.name === e.target.value)
        permission.checked = !permission.checked;
    });

    setCheckedPermissions(PerArr);
  };

  return (
    <div className="editUser">
      <div className="border">
        <form>
          <div className="userData">
            <h1 className="title">Add User:</h1>
            <label className="labels" for="firstName">
              First Name:{" "}
            </label>
            <input
              className="data"
              id="firstName"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <br />
            <label className="labels" for="lastName">
              Last Name:{" "}
            </label>
            <input
              className="data"
              id="lastName"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <br />
            <label className="labels" for="userName">
              User Name:{" "}
            </label>
            <input
              className="data"
              id="userName"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <br />
            <label className="labels" for="Password">
              Password:{" "}
            </label>
            <input
              className="data"
              id="Password"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label className="labels" for="sessionTimeOut">
              Session Time Out{" "}
            </label>
            <input
              className="data"
              id="genres"
              type="text"
              onChange={(e) => setSessionTimeOut(e.target.value)}
              required
            />
            <br />
          </div>

          <label
            className="permissionsLable"
            id="Permissions"
            type="text"
            style={{ justifyContent: "center" }}
          >
            Permissions:
          </label>

          <div className="PemissionsStyle">
            {checkedPermissions.map((permission, index) => {
              return (
                <div className="checkboxItem">
                  <input
                    id={index}
                    className="perCheckbox"
                    onClick={checkPermission}
                    type="checkbox"
                    value={permission.name}
                  />
                  <label className="checkLabel" for={index}>
                    {permission.name}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="form_buttons">
            <button type="submit" onClick={saveUser}>
              {" "}
              <Link className="cardsLinks" to={`/Users`}>
                save
              </Link>
            </button>
            <button>
              {" "}
              <Link className="cardsLinks" to={`/Users`}>
                cancel{" "}
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
