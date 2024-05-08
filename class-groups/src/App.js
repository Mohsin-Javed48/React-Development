/** @format */

import { useEffect, useState } from "react";
import { useLocalStorageState } from "./useLocalStorageStage";

/** @format */
export default function App() {
  const [list, setList] = useLocalStorageState([], "groups");

  return (
    <div className="parent-container">
      <Input onList={setList} list={list} />
      <Display list={list} onList={setList} />
    </div>
  );
}

function Input({ onList, list }) {
  const [grpTopic, setGrpTopic] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [grpNum, setGrpNum] = useState(0);

  function handleGrpTopic(e) {
    setGrpTopic(e);
  }
  function handleMember1(e) {
    setMember1(e);
  }
  function handleMember2(e) {
    setMember2(e);
  }
  function handleGrpNum(e) {
    const isAssigned = list.some((li) => li.grpNum === Number(e));
    if (isAssigned) {
      alert("Group Number already assigned to another Group");
    } else {
      setGrpNum(Number(e));
    }
  }
  function handleSubmit() {
    if (
      grpTopic.length > 2 &&
      member1.length > 2 &&
      member2.length > 2 &&
      grpNum !== 0
    ) {
      const obj = { grpTopic, member1, member2, grpNum };
      onList((list) => [...list, obj]);

      setGrpTopic("");
      setMember1("");
      setMember2("");
      setGrpNum(0);
    }
  }
  return (
    <div className="input-container">
      <div className="input-label">
        <h1>Groups Data</h1>
      </div>
      <div className="input-fields">
        <span>
          <label>Groups Topic:</label>
          <input
            className="leader-input"
            onChange={(e) => handleGrpTopic(e.target.value)}
            value={grpTopic}
            type="name"
          ></input>
        </span>
        <span>
          <label>Team Member 1:</label>
          <input
            onChange={(e) => handleMember1(e.target.value)}
            value={member1}
            type="name"
          ></input>
        </span>
        <span>
          <label>Team Member 2:</label>
          <input
            onChange={(e) => handleMember2(e.target.value)}
            value={member2}
            type="name"
          ></input>
        </span>
        <span>
          <label className="group-num">Group Number:</label>
          <select onChange={(e) => handleGrpNum(e.target.value)} value={grpNum}>
            {Array.from({ length: 20 }, (_, i) => (
              <option>{i + 1}</option>
            ))}
          </select>
        </span>
      </div>
      <button onClick={handleSubmit} name="submit ">
        Submit
      </button>
    </div>
  );
}

function Display({ list, onList }) {
  const [searchedValue, setSearchedValue] = useState(null);
  return (
    <div className="display-container">
      <div className="display-label">
        <h1>Display Groups</h1>
      </div>
      <Search list={list} setSearchedValue={setSearchedValue} />
      <GroupList list={list} onList={onList} searchedValue={searchedValue} />
    </div>
  );
}

function Search({ list, setSearchedValue }) {
  const [searchby, setSearchBy] = useState("");
  const [userInput, setUserInput] = useState("");
  function handleUserInput(e) {
    setUserInput(e.target.value);
  }
  function handleSearchBy(e) {
    setSearchBy(e.target.value);
  }

  useEffect(
    function () {
      if (userInput === "") {
        setSearchedValue(null);
        return;
      }

      let filteredList = list.filter((li) => {
        if (searchby === "name") {
          return (
            li.member1.includes(userInput) || li.member2.includes(userInput)
          );
        } else if (searchby === "grpNum") {
          return li.grpNum.toString().includes(userInput);
        } else {
          return li.grpTopic.includes(userInput);
        }
      });
      if (filteredList) setSearchedValue(filteredList);
    },
    [userInput, searchby, list, setSearchedValue]
  );

  return (
    <div className="search">
      <input
        className="sort"
        type="text"
        value={userInput}
        onChange={handleUserInput}
      />
      <select onChange={handleSearchBy}>
        <option value={"name"}>Search by Name</option>
        <option value={"grpNum"}>Search by Group number</option>
        <option value={"topic"}>Search by Topic name</option>
      </select>
    </div>
  );
}

function GroupList({ list, onList, searchedValue }) {
  function handleDelete(val) {
    let newList = list.filter((li) => li.grpNum !== val);
    onList(newList);
  }
  let showList = !searchedValue ? list : searchedValue;
  // console.log(searchedValue);
  return (
    <div className="list">
      <ul>
        {showList.map((li) => (
          <List
            grpTopic={li.grpTopic}
            member1={li.member1}
            member2={li.member2}
            grpNum={li.grpNum}
            onDelete={handleDelete}
            key={li.grpNum}
          />
        ))}
      </ul>
    </div>
  );
}

function List({ grpTopic, member1, member2, grpNum, onDelete }) {
  return (
    <li>
      <span>
        <h4>
          Group {grpNum}: {grpTopic}
        </h4>
        <p>
          {member1} and {member2}
        </p>
      </span>
      <button onClick={() => onDelete(grpNum)}>🗑️</button>
    </li>
  );
}
