import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function EditProfile(props) {
  const user = useSelector((state) => state.user),
    id = user._id;

  useEffect(() => {
    if (user === null) {
      alert("User need to login first");
      props.history.push("/login");
    }
  });

  const [dname, setDname] = useState(user.dname);
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title || "");
  const [about, setAbout] = useState(user.about || "");
  const [weblink, setWeblink] = useState(user.weblink || "");
  const [gitlink, setGitlink] = useState(user.gitlink || "");
  const [twitter, setTwitter] = useState(user.twitter || "");
  const [address, setAddress] = useState(user.address || "");

  const validateInfo = () => {
    const errors = [];
    if (!name || !name.trim()) errors.push("please enter your name");
    if (!dname || !dname.trim()) errors.push("please enter username");
    if (!!errors.length) {
      const errorsString = errors.join(",\n");
      return alert(
        `${errorsString.charAt(0).toUpperCase()}${errorsString.slice(1)}.`
      );
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/valid-dname`, { dname, id })
      .then((res) => {
        if (res.data.status === "ok") return updateUserDetails();
        res.data.data !== id ? alert(res.data.msg) : updateUserDetails();
      });
  };

  const updateUserDetails = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/`, {
        id,
        dname,
        name,
        title,
        about,
        weblink,
        gitlink,
        twitter,
        address
      })
      .then((res) => alert(res.data.msg))
      .catch(() => alert("Some error in update user details, try again later"));
  };

  return (
    <div className="py-1">
      <div>
        <h1>
          <b> Edit Your Profile </b>
        </h1>
      </div>
      <div className="container bg-light py-3 m-0 row ">
        <div className="col-md-6">
          <label>
            <b>Display name</b>
          </label>
          <br />
          <input
            type="text"
            name="dnameInput"
            value={dname}
            onChange={({ target }) => setDname(target.value)}
            id="dnameInput"
            placeholder="Display Name"
            required
            className="col-md-9"
          />
          <br />
          <label>
            <b>Your Name</b>
          </label>
          <br />
          <input
            type="text"
            name="nameInput"
            value={name}
            onChange={({ target }) => setName(target.value)}
            id="nameInput"
            placeholder="Your Name"
            required
            className="col-md-9"
          />
          <br />
          <label>
            <b>Work Title</b>
          </label>
          <br />
          <input
            type="text"
            name="titleInput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="titleInput"
            placeholder="Work Title"
            required
            className="col-md-9"
          />
          <br />
        </div>
        <div className="col-md-6">
          <label>
            <b>Web Preference</b>
          </label>
          <br />
          <div>
            Website link
            <br />
            <input
              style={{ width: "80%" }}
              type="text"
              className="rounded"
              name="weblinkInput"
              value={weblink}
              onChange={({ target }) => setWeblink(target.value)}
              id="weblinkInput"
              placeholder="Website Link"
              required
            />
            <br />
          </div>
          <div>
            Github Link
            <br />
            <input
              style={{ width: "80%" }}
              type="text"
              className="rounded"
              name="gitlinkInput"
              value={gitlink}
              onChange={({ target }) => setGitlink(target.value)}
              id="gitlinkInput"
              placeholder="Github Link"
              required
            />
            <br />
          </div>
          <div>
            Twitter link
            <br />
            <input
              style={{ width: "80%" }}
              type="text"
              className="rounded"
              name="twitterInput"
              value={twitter}
              onChange={({ target }) => setTwitter(target.value)}
              id="twitterInput"
              placeholder="Twitter Link"
              required
            />
            <br />
          </div>
        </div>
        <div className="col-md-12">
          <label>
            <b>About Me</b>
          </label>
          <br />
          <textarea
            type="text"
            name="aboutInput"
            value={about}
            onChange={({ target }) => setAbout(target.value)}
            id="aboutInput"
            placeholder="explain about yourself"
            className="col-md-12"
            required
          />
        </div>
        <div className="col-md-12">
          <label>
            <b>Address</b>
          </label>
          <br />
          <input
            type="text"
            name="addressInput"
            value={address}
            onChange={({ target }) => setAddress(target.value)}
            id="addressInput"
            placeholder="Address"
            className="col-md-12"
            required
          />
          <br />
          <br />
        </div>
        <div className="col-md-12 text-right">
          <button
            type="button"
            className="btn btn-success float-end"
            onClick={validateInfo}
          >
            Update User Details
          </button>
        </div>
      </div>
      <br />
    </div>
  );
}
