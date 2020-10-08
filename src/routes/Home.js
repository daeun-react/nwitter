import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  // const getNweets = async () => {
  //   const dbNweets = await dbService.collection("nweet").get();
  //   dbNweets.forEach((document) => {
  //     const object = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev) => [object, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getNweets();
    dbService.collection("nweet").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let attachmentUrl = "";
    if (attachment !== "") {
      const name = `${userObj.uid}/${uuidv4()}`;
      const attachmentRef = storageService.ref().child(name);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweet").add(nweetObj);
    setNweet("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  const onClearPhotoClick = () => {
    setAttachment();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} style={{ width: 100, height: 50 }} alt="" />
            <button onClick={onClearPhotoClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={userObj.uid === nweet.creatorId}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
