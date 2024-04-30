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

  const validateInfo = (e) => {
    e.preventDefault();
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
    <div className="py-1 border">
      <h1
        className="p-1 pb-2 mb-0"
        style={{ borderBottom: "2px solid lightgrey" }}
      >
        &nbsp;Edit Your Profile
      </h1>
      <form className="container bg-light py-3 m-0 row" onSubmit={validateInfo}>
        <div className="col-md-6 d-grid gap-2 my-2">
          <b>Basic Details</b>
          <div className="form-floating">
            <input
              type="text"
              name="dnameInput"
              value={dname}
              onChange={({ target }) => setDname(target.value)}
              id="dnameInput"
              placeholder="john-doe"
              required
              className="form-control"
            />
            <label htmlFor="dnameInput">Your Username</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="nameInput"
              value={name}
              onChange={({ target }) => setName(target.value)}
              id="nameInput"
              placeholder="John Doe"
              required
              className="form-control"
            />
            <label htmlFor="nameInput">Your Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="titleInput"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              id="titleInput"
              placeholder="Software Developer"
              className="form-control"
            />
            <label htmlFor="titleInput">Your Work Title</label>
          </div>
        </div>
        <div className="col-md-6 d-grid gap-2 my-2">
          <b>Other Profile links</b>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="weblinkInput"
              value={weblink}
              onChange={({ target }) => setWeblink(target.value)}
              id="weblinkInput"
              placeholder="https://example.com/johnDoe"
            />
            <label htmlFor="weblinkInput">Portfolio link</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="gitlinkInput"
              value={gitlink}
              onChange={({ target }) => setGitlink(target.value)}
              id="gitlinkInput"
              placeholder="https://github.com/johnDoe"
            />
            <label htmlFor="gitlinkInput">Github link</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="twitterInput"
              value={twitter}
              onChange={({ target }) => setTwitter(target.value)}
              id="twitterInput"
              placeholder="https://twitter.com/@johnDoe"
            />
            <label htmlFor="twitterInput">Twitter link</label>
          </div>
        </div>
        <div className="my-3 d-grid gap-2">
          <div className="form-floating">
            <textarea
              type="text"
              name="aboutInput"
              value={about}
              onChange={({ target }) => setAbout(target.value)}
              id="aboutInput"
              placeholder="I'm a software developer working on google....."
              className="form-control"
              spellCheck={true}
            />
            <label htmlFor="aboutInput">Explain about yourself</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="addressInput"
              value={address}
              onChange={({ target }) => setAddress(target.value)}
              id="addressInput"
              placeholder="River Street, Columbia"
              className="form-control"
            />
            <label htmlFor="addressInput">Your Address</label>
          </div>
        </div>
        <div className="mt-2">
          <button className="btn btn-success float-end">
            Update User Details
          </button>
        </div>
      </form>
    </div>
  );
}
