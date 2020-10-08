import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Profile({ userObj }) {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweet")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNewDisplayName(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
}

export default Profile;
