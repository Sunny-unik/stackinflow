import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../action/userAction";
import { isHttpValid } from "../../helper/validateUrl";

export default function EditProfile() {
  const user = useSelector((state) => state.user),
    id = user._id,
    dispatch = useDispatch();

  const [disableAttribute, setDisableAttribute] = useState(true);
  const [dname, setDname] = useState(user.dname);
  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(user.title || "");
  const [about, setAbout] = useState(user.about || "");
  const [weblink, setWeblink] = useState(user.weblink || "");
  const [gitlink, setGitlink] = useState(user.gitlink || "");
  const [twitter, setTwitter] = useState(user.twitter || "");
  const [address, setAddress] = useState(user.address || "");

  const setValue = ({ target }) => {
    const getSetState = {
      dnameInput: [dname, setDname],
      nameInput: [name, setName],
      titleInput: [title, setTitle],
      aboutInput: [about, setAbout],
      weblinkInput: [weblink, setWeblink],
      gitlinkInput: [gitlink, setGitlink],
      twitterInput: [twitter, setTwitter],
      addressInput: [address, setAddress]
    };
    getSetState[target.name][1](target.value);
    const isSame = Object.keys(getSetState).some((key) => {
      const initialFieldValue = user[key.split("Input")[0]];
      return key === target.name
        ? target.value !== initialFieldValue
        : getSetState[key][0] !== initialFieldValue;
    });
    setDisableAttribute(!isSame);
  };

  const validateInfo = (e) => {
    e.preventDefault();
    const errors = [];
    const invalidLinks = Object.entries({
      portfolio: weblink,
      git: gitlink,
      twitter
    }).filter(([_, v]) => !!v && !isHttpValid(v));
    invalidLinks.forEach((a) => errors.push(`please enter valid ${a[0]} url`));
    if (!name || !name.trim()) errors.push("please enter your name");
    if (!dname) errors.push("please enter username");
    if (dname.includes(" ")) errors.push("username cannot include space");
    if (!errors.length) return updateUserDetails();
    const errorsString = errors.join(",\n");
    return alert(
      `${errorsString.charAt(0).toUpperCase()}${errorsString.slice(1)}.`
    );
  };

  const updateUserDetails = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/user/`, {
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
      .then(({ data }) => {
        if (!data.errors?.length) {
          data.data && dispatch(authenticateUser());
          return alert(data.msg);
        }
        const errorsString = data.errors.join(",\n");
        alert(
          `${errorsString.charAt(0).toUpperCase()}${errorsString.slice(1)}.`
        );
      })
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
      <form
        className="container bg-light py-3 m-0 row"
        onSubmit={validateInfo}
        {...(disableAttribute ? { disabled: true } : {})}
      >
        <div className="col-md-6 d-grid gap-2 my-2">
          <b>Basic Details</b>
          <div className="form-floating">
            <input
              type="text"
              name="dnameInput"
              value={dname}
              onChange={setValue}
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
              onChange={setValue}
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
              onChange={setValue}
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
              onChange={setValue}
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
              onChange={setValue}
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
              onChange={setValue}
              id="twitterInput"
              placeholder="https://twitter.com/@johnDoe"
            />
            <label htmlFor="twitterInput">Twitter link</label>
          </div>
        </div>
        <div className="my-3 d-grid gap-2">
          <div className="form-floating">
            <input
              type="text"
              name="addressInput"
              value={address}
              onChange={setValue}
              id="addressInput"
              placeholder="River Street, Columbia"
              className="form-control"
            />
            <label htmlFor="addressInput">Your Address</label>
          </div>
          <div className="form-floating">
            <textarea
              type="text"
              name="aboutInput"
              value={about}
              rows="3"
              onChange={setValue}
              id="aboutInput"
              placeholder="I'm a software developer working on google....."
              className="form-control"
              spellCheck={true}
            />
            <label htmlFor="aboutInput">Explain about yourself</label>
          </div>
        </div>
        <div className="mt-2">
          <button
            className="btn btn-success float-end"
            {...(disableAttribute ? { disabled: true } : {})}
          >
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}
