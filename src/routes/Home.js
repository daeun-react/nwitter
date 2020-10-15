import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);
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

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
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
