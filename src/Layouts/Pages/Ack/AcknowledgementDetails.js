import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchBookingDetailsById } from "../../../Redux/actions/booking";
import { AddBillingDetails } from "../../../Redux/actions/billing";
import moment from "moment";
import { toast } from "react-toastify";

const AcknowledgementDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const [loader, setLoader] = useState(false);
  const today = moment().format("YYYY-MM-DD");
  useEffect(() => {
    if (!loginDetails) {
      navigate("/");
    } else {
      console.log("Hi");
    }
  }, []);
  useEffect(() => {
    const url = new URL(window.location.href);
    const BookingId = url.searchParams.get("BookingId");
    console.log("BookingId++++", BookingId);

    dispatch(
      fetchBookingDetailsById(
        loginDetails?.logindata?.Token,
        BookingId,
        (callback) => {
          if (callback.status) {
            console.log(
              "Callback---------get user bookings",
              callback?.response?.Details
            );

            const data = {
              bookingId: callback?.response?.Details.Id,
              packageId: callback?.response?.Details.PackageId,
              packageGuestCount: callback?.response?.Details.PackageGuestCount,
              totalGuestCount: callback?.response?.Details.TotalGuestCount,
              bookingDate: callback?.response?.Details?.FutureDate,
              billingDate: today,
              teensCount: callback?.response?.Details.NumOfTeens,
              actualAmount: callback?.response?.Details.ActualAmount,
              amountAfterDiscount:
                callback?.response?.Details.AmountAfterDiscount,
              discount: callback?.response?.Details.PanelDiscount
                ? callback?.response?.Details.PanelDiscount
                : callback?.response?.Details.WebsiteDiscount
                ? callback?.response?.Details.WebsiteDiscount
                : callback?.response?.Details.CouponDiscount,
              packageWeekdayPrice:
                callback?.response?.Details.PackageWeekdayPrice,
              packageWeekendPrice:
                callback?.response?.Details.PackageWeekendPrice,
            };

            console.log("Data-----from ack booking>", data);

            dispatch(
              AddBillingDetails(
                loginDetails?.logindata?.Token,
                data,
                (callback) => {
                  if (callback.status) {
                    console.log(
                      "Generate Bill --------------",
                      callback?.response?.Details
                    );

                    if (
                      callback?.response?.Details[0]?.NumOfTeens -
                        callback?.response?.Details[0]?.TotalGuestCount ==
                      0
                    ) {
                      navigate("/TeensBilling", {
                        state: { BookingDetails: callback?.response?.Details },
                      });
                      setLoader(false);
                    } else {
                      navigate("/BillingDetails", {
                        state: { BookingDetails: callback?.response?.Details },
                      });
                      setLoader(false);
                    }

                    toast.error(callback.error);
                  } else {
                    toast.error(callback.error);
                    setLoader(false);
                  }
                }
              )
            );
          } else {
            console.log(callback.error);
            toast.error(callback.error);
          }
        }
      )
    );
  }, []);

  // const fetchUserBookingFn = () => {
  //   dispatch(
  //     fetchBookingDetailsById(
  //       loginDetails?.logindata?.Token,
  //       BookingId,
  //       (callback) => {
  //         if (callback.status) {
  //           setLoading(false);
  //           console.log(
  //             "Callback---------get user bookings",
  //             callback?.response
  //           );
  //           setUserBookings(callback?.response?.Details);
  //           setFilteredUserBookings(callback?.response?.Details);
  //         } else {
  //           console.log(callback.error);
  //           toast.error(callback.error);
  //         }
  //       }
  //     )
  //   );
  // };

  return <div>AcknowledgementDetails</div>;
};

export default AcknowledgementDetails;
