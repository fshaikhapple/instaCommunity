import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import '../../css/black-dashboard.css'
import emilyz from '../../img/emilyz.jpg'

const SignIn = () => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const state = useSelector((state) => state.firebase);
  const isNewUser = (additionalUserInfo) => {
    const uuid = additionalUserInfo.uid
    console.log("state", state);
    if (additionalUserInfo.isNewUser) {
      firestore.collection("users").doc(uuid).collection("additionalUserInfo").doc(additionalUserInfo.uid).set({
        'isNewUser': additionalUserInfo.isNewUser,
        'verified_email': additionalUserInfo.verified_email,
        'uid': additionalUserInfo.uid,
        'segment': 0
      })
    }
  }


  const signInWithGoogle = () => {
    let additionalUserInfo = {}
    firebase.login({ provider: "google", type: "popup" })
      .then((data) => {
        console.log("data", data);
        history.push("/dashboard");
        additionalUserInfo = {
          isNewUser: data.additionalUserInfo.isNewUser,
          verified_email: data.additionalUserInfo.profile.verified_email,
          uid: data.user.uid
        }
      }).then(() => {
        console.log("rest");
        isNewUser(additionalUserInfo)
      });
  };
  const goToDashBoard=()=>{
    history.push("/dashboard");
  }

  const history = useHistory();
  return (
    <div class="content">
      <div className='row'>
        <div class="col-md-12">
          <div class="card card-user">
            <div class="card-body">
              <p class="card-text">
              </p><div class="author">
                <div class="block block-one"></div>
                <div class="block block-two"></div>
                <div class="block block-three"></div>
                <div class="block block-four"></div>
                <a href="javascript:void(0)">
                  <img className="avatar" src={emilyz} alt="..." />
                  <h2 class="">Faizan Shaikh</h2>
                </a>
                {/* <p class="description">
                      Ceo/Co-Founder
                    </p> */}
              </div>
              <p></p>
              <h1>Sign In</h1>
              <button className={'btn btn-primary'}
                onClick={(event) => {
                  event.preventDefault();
                  signInWithGoogle()
                }}
              >
                Sign In with Google
      </button>
              <br />
              <button className={'btn btn-secondary'}
                onClick={(event) => {
                  event.preventDefault();
                  goToDashBoard()
                }}
              >
                {"Skip for now, Sign in later >>"}
      </button>
              <div class="card-description">
                Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
                </div>
            </div>
            <div class="card-footer">
              <div class="button-container">
                <button href="javascript:void(0)" class="btn btn-icon btn-round btn-facebook">
                  <i class="fab fa-facebook"></i>
                </button>
                <button href="javascript:void(0)" class="btn btn-icon btn-round btn-twitter">
                  <i class="fab fa-twitter"></i>
                </button>
                <button href="javascript:void(0)" class="btn btn-icon btn-round btn-google">
                  <i class="fab fa-google-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default SignIn;
