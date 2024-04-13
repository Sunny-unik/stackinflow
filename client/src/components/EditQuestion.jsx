// import axios from "axios";
// import React, { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useParams } from "react-router-dom";
// import { tagRegex } from "../helper/RegexHelper";

// export default function EditQuestion(props) {
//   const propLocation = props.location;
//   const questionId = useParams().qid;
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [loader, setLoader] = useState(false);
//   const [qTitle, setQTitle] = useState(propLocation.questionTitle);
//   const [qTags, setQTags] = useState(propLocation.questionTags);
//   const [qDescription, setQDescription] = useState(
//     propLocation.questionDetails
//   );
//   let qUserdname = null;

//   useEffect(() => {
//     if (!qTitle) {
//       axios
//         .get(`${process.env.REACT_APP_API_URL}/question?id=${questionId}`)
//         .then((res) => {
//           setQTitle(res.data.data.question);
//           setQTags(res.data.data.tags);
//           setQDescription(res.data.data.questiondetail);
//           qUserdname = res.data.data.userId;
//         })
//         .catch((err) => console.log("In question fetch: ", err));
//     }
//   }, []);

//   const removeTag = useCallback(
//     (index) => {
//       const tags = [...qTags];
//       tags.splice(index, 1);
//       setQTags(tags);
//     },
//     [qTags]
//   );

//   const getTagsToAppend = useCallback(() => {
//     const tags = [...qTags];
//     tags.splice(tags.length - 1, 1);
//     return tags;
//   }, [qTags]);

//   const handleInputChange = useCallback(({ target }) => {
//     setQTags(target.value.split(" "));
//   }, []);

//   const validQuestion = () => {
//     const errors = [],
//       tagsToAppend = getTagsToAppend();
//     // valid tags which doesn't includes symbol & empty space at any position
//     const validTags = tagsToAppend.filter((tag) => tagRegex.test(tag.trim()));

//     if (qTitle.trim().length < 4 || qTitle.trim().length > 151)
//       errors.push("title's characters length must in between 4 to 151");
//     if (qDescription.trim().length < 5 || qDescription.trim().length > 5001)
//       errors.push("description's characters length must in between 5 to 5000");
//     if (tagsToAppend.length < 0 || tagsToAppend.length > 5)
//       errors.push("number of tags must in between 1 to 5");
//     if (validTags.length !== tagsToAppend.length)
//       errors.push("tags can't includes symbol & empty spaces at any position");

//     if (!!errors.length) {
//       const errorsString = errors.join(",\n");
//       alert(`${errorsString.charAt(0).toUpperCase()}${errorsString.slice(1)}.`);
//       setLoader(false);
//     }
//     return !errors.length;
//   };

//   function submitQuestion() {
//     let tags;
//     if (typeof qTags !== "object") {
//       tags = qTags.split(",");
//     } else {
//       tags = qTags;
//     }

//     if (tags.length < 1) {
//       alert("!For create your question you must use atleast 1 tags in it.");
//     } else if (tags.length > 5) {
//       alert("!You can not put more than 5 tags in your question.");
//     } else {
//       const createq = {
//         question: qTitle,
//         tags,
//         questiondetail: qDescription,
//         questionid: questionId
//       };
//       axios
//         .post(`${process.env.REACT_APP_API_URL}/update-question`, createq)
//         .then((res) => {
//           alert(res.data.data);
//           res.data.status === "ok" &&
//             props.history.push(`/question/${questionId}`);
//         });
//     }
//   }

//   return (
//     <div
//       style={{ borderLeft: ".05rem solid lightgrey", minHeight: "64vh" }}
//       className="p-1"
//     >
//       <h1 className="text-center text-md-start text-lg-start">
//         &nbsp;Edit Question{" "}
//       </h1>
//       {console.log({ propLocation })}
//       {console.log(questionId)}
//       {questionId ? (
//         <div className="d-md-flex">
//           <form
//             style={{
//               fontSize: "larger",
//               color: "whitesmoke",
//               textShadow: ".02em .02em black"
//             }}
//             className="p-2 col-sm-12 col-md-7 d-md-inline-block border rounded m-2 bg-secondary"
//             id="editqmain"
//           >
//             <label htmlFor="questiontitle" className="m-1 form-label">
//               {" "}
//               Question Title{" "}
//             </label>
//             <input
//               onChange={(e) => setQuestion(e)}
//               type="text"
//               className="m-1 col-sm-11 form-control"
//               id="questiontitle"
//               value={qTitle}
//               name="questiontitle"
//               required
//             />

//             <label htmlFor="questiondetail" className="m-1 form-label">
//               {" "}
//               Question Description{" "}
//             </label>
//             <textarea
//               onChange={(e) => {
//                 setQuestion(e);
//               }}
//               type="text"
//               className="m-1 col-sm-11 form-control"
//               id="questiondetail"
//               value={qDescription}
//               name="questiondetail"
//               required
//             ></textarea>

//             <label htmlFor="questiontag" className="m-1 form-label">
//               {" "}
//               Question Tags{" "}
//             </label>
//             <input
//               onChange={(e) => setQuestion(e)}
//               type="text"
//               className="m-1 col-sm-11 form-control"
//               id="questiontag"
//               value={qTags}
//               name="questiontag"
//               required
//             />
//             <br />
//             <button
//               type="reset"
//               className="m-1 mt-0 p-2 bg-info rounded-3 editqbtn"
//               onClick={validateq}
//             >
//               {" "}
//               Update Question{" "}
//             </button>
//             <style jsx>{`
//               .editqbtn:hover {
//                 background: lightgreen !important;
//               }
//             `}</style>
//             <style jsx>{`
//               .editqbtn:focus {
//                 background: lightgreen !important;
//               }
//             `}</style>
//           </form>
//           <div className="col-md-4 col-sm-12 d-inline-block mb-4 mx-1 mt-2 card">
//             <div className="card-header">
//               <h4>Tips for your question</h4>
//             </div>
//             <p className="p-2 card-header">
//               The community is here to help you with specific coding, algorithm,
//               or language problems.
//               <br />
//               Avoid asking opinion-based questions.
//             </p>
//             <details className="p-2">
//               <summary style={{ fontFamily: "sans-serif" }}>
//                 <h5 className="d-inline-block">1. Summarize the problem</h5>
//               </summary>
//               <p className="px-3 py-1">
//                 Include details about your goal Describe expected and actual
//                 results Include any error messages
//               </p>
//             </details>
//             <details className="p-2">
//               <summary style={{ fontFamily: "sans-serif" }}>
//                 <h5 className="d-inline-block">
//                   2. Describe what you’ve tried
//                 </h5>
//               </summary>
//               <p className="px-3 py-1">
//                 Show what you’ve tried and tell us what you found (on this site
//                 or elsewhere) and why it didn’t meet your needs. You can get
//                 better answers when you provide research.
//               </p>
//             </details>
//             <details className="p-2">
//               <summary style={{ fontFamily: "sans-serif" }}>
//                 <h5 className="d-inline-block">3. How to tag</h5>
//               </summary>
//               <p>Tags help the right people find and answer your question.</p>
//               <li>
//                 Identify your tags by completing the sentence, "My question is
//                 about…"
//               </li>
//               <li>
//                 Include tags that are crucial to your question only, like{" "}
//                 <NavLink to="/questionsBy/java">java</NavLink>
//               </li>
//               <li>
//                 Only include version numbers, like c#-4.0, when absolutely
//                 necessary
//               </li>
//               <li>Use existing popular tags</li>
//             </details>
//           </div>
//         </div>
//       ) : (
//         <h3 className="text-center">Question Not Found</h3>
//       )}
//     </div>
//   );
// }
