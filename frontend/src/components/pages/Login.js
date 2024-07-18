import * as React from "react";
import "./login.css";
export default function Login() {
  return (
    <>
      <>
        <div class="container" className="body">
          <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0" className="cardbody">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form class="user" id="loginForm">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              className="add"
                            ></input>
                          </div>

                          <button
                            type="submit"
                            class="btn btn-primary btn-user btn-block"
                            id="btn"
                          >
                            Send OTP
                          </button>
                        </form>
                        <div id="message" class="text-center mt-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      
    </>
  );
}
