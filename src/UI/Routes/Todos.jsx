import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTodo from "../Components/AddTodo";
import { useFirestoreConnect } from "react-redux-firebase";
import ToDoItem from "../Components/TodoItem";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Todos = () => {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  const [personalLinksState, setPersonalLinksState] = useState();
  const [publicPostsState, setPublicPostsState] = useState();
  const history = useHistory();
  useFirestoreConnect({
    collection: `users/${uid}/instaLinks`,
    storeAs: "personalLinks",
  });
  useFirestoreConnect({
    collection: `instaLinks`,
    storeAs: "publicPosts",
  });
  const publicPosts = useSelector((state) => state?.firestore?.data?.publicPosts) || [];
  const personalLinks = useSelector((state) => state?.firestore?.data?.personalLinks) || [];
  useEffect(() => {
    if(publicPosts){
      if (Object.keys(publicPosts).length > 0) {
      setPublicPostsState(publicPosts)
      }
    }
  }, [publicPosts])

  return (
    <div>
      {uid ? <>
      <h3>Hello {displayName}</h3>
      <AddTodo />
      </>
      : <div>
        <button onClick={()=>history.push("/signin")} className='btn btn-primary'>To add your link Please Login with google</button>
      </div>
      }
      <div class='row'>
      {publicPostsState &&
          Object.values(publicPostsState).map((instaLink, id) => {
            return ( <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="card card-user">
            <div class="card-body">
              <ToDoItem
                id={instaLink.id}
                title={instaLink?.link}
                isDisabled={instaLink?.isDisabled}
                hashTags={instaLink?.hashTags}
                email={instaLink?.email}
              />
            </div>
          </div>
        </div>)})}
        </div>
    </div>
  );
};

export default Todos;
