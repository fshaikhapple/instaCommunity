import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";

const ToDoItem = ({ title, isDisabled, hashTags, email,id }) => {
  const firestore = useFirestore();
  const { uid } = useSelector(state => state?.firebase?.auth);
  const handleChange = (event) => {
    console.log("firebase", event);
    firestore.collection('users')
    var userCollection = firestore.collection('users').doc(uid);
    var userCollectionInsta = firestore.collection('instaLinks').doc(id);
    userCollection.update({
      likes: firestore.FieldValue.increment(1)
    })
    userCollectionInsta.update({
      interests  : firestore.FieldValue.increment(1)
    })
  };
  return (
    <div>
      <iframe width="300" height="440" src={title} frameborder="0"></iframe>
    <div style={{
      opacity: isDisabled ? 0.4 : 1,
    }}
    onClick={handleChange}>
      <p> {JSON.stringify(hashTags)} </p>
    </div>
    </div>
  );
};

export default ToDoItem;
