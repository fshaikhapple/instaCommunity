import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AddTodo = () => {
  const [presentToDo, setPresentToDo] = useState("");
  const [hashTags, setHashTags] = useState("");
  const firestore = useFirestore();
  const [fireData, setFireData] = useState()
  const { uid } = useSelector((state) => state.firebase.auth);
  const state = useSelector((state) => state);

  const handleChange = ({ currentTarget: { name, value } }) => {
    if (name === "addTodo") {
      setPresentToDo(value);
    }
    if (name === 'hashTags') {
      setHashTags(value)
    }
  };
  useEffect(() => {
    if (uid) {
      const fetchData = async () => {
        await firestore.collection('users').doc(uid).collection("todos").limit(2).orderBy("title")
          .onSnapshot(function (querySnapshot) {
            var items = [];
            querySnapshot.forEach(function (doc) {
              items.push({ key: doc.id, ...doc.data() });
            });
            setFireData(items)
          })
      };
      fetchData();
    }
  }, [uid])

  const showNext = () => {
    const list = fireData
    if (list.length === 0) {
      alert("Thats all we have for now !")
    } else {
      const fetchNextData = async () => {
        await firestore.collection('users')
          .doc(uid).collection("todos").limit(5).orderBy("title").startAfter(3)
          .onSnapshot(function (querySnapshot) {
            const items = [];
            querySnapshot.forEach(function (doc) {
              items.push({ key: doc.id, ...doc.data() });
            });
          })
      };
      fetchNextData();
    }
  }


  const addNewTodo = (link, hashTags) => {
    let linkEmbed = '';
    const http = link.split('/')[0]// https:
    const blank = link.split('/')[1] // ''
    const instagram = link.split('/')[2] // 'www.instagram.com'
    const p = link.split('/')[3] //  'p'
    const id = link.split('/')[4] //  'id'
    if (http === 'https:') {
      if (blank === '') {
        if (instagram === 'www.instagram.com') {
          if (p === 'p') {
            linkEmbed = `https://www.instagram.com/p/${id}/embed`
          }
        }
      }
    }
    firestore.collection('instaLinks').add({
      link: linkEmbed,
      id: uid,
      hashTags: [hashTags],
      email: state.firebase.auth.email,
      interests: 0,
      isDisabled: true
    }).then((docRef) => {
      firestore.collection("users").doc(uid).collection("instaLinks").doc(docRef.id)
        .set({
          docRef: docRef.id
        })
    })
    setHashTags("")
    setPresentToDo("")
  };

  return (
    <div>
      <form action="">
        <div className='row'>
          <div className='col-md-3'>
            <h4>Copy paste a Instagram Link to promote</h4>
          </div>
          <div className='col-md-3'>
            <div class="input-group">
              <input
                type="text"
                className="form-control"
                placeholder='https://instagram/post'
                name="addTodo"
                value={presentToDo}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div class="input-group">
              <input
                className="form-control"
                type="text"
                placeholder='#followForFollow'
                name="hashTags"
                value={hashTags}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='col-md-3'>
            <button
              className='btn btn-primary btn-block'
              onClick={(event) => {
                event.preventDefault();
                addNewTodo(presentToDo, hashTags);
                console.log("state", state.firebase.auth.email);
              }}
            >
              Add Link
        </button>
          </div>
        </div>



        {/* <button
          onClick={(event) => {
            event.preventDefault();
            showNext()
          }}
        >
          showNext
        </button> */}
      </form>
    </div>
  );
};

export default AddTodo;
