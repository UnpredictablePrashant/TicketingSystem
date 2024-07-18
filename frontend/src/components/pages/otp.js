import * as React from "react";
export default function Otp() {
  return (
   
  <div>
   
   <div class="container">

{/* <!-- Outer Row --> */}
<div class="row justify-content-center">

    <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div class="row">
                    <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                    <div class="col-lg-6">
                        <div class="p-5">
                            <div class="text-center">
                                <h5 class="h5 text-gray-900 mb-4">OTP sent on your registered email address</h5>
                            </div>
                            <form class="user" id="otpForm">
                                <div class="form-group">
                                    <input type="text" class="form-control form-control-user" id="exampleInputOtp" aria-describedby="otpHelp" placeholder="Enter OTP" required></input>
                                </div>
                                <div class="form-group">
                                    <div class="custom-control custom-checkbox small">
                                        <label id="otpValidLabel">OTP valid up to <span id="timer">05:00</span></label>
                                    </div>
                                    <div id="expiryMessage" style="display: none;">OTP expired, generate a new one</div>
                                </div>
                                <button type="submit" class="btn btn-primary btn-user btn-block">
                                    Verify
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

  </div>
  )
  };
