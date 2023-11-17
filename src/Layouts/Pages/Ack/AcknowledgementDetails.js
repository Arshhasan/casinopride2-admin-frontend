import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchBookingDetailsById } from "../../../Redux/actions/booking";
import { AddBillingDetails } from "../../../Redux/actions/billing";
import moment from "moment";
import { toast } from "react-toastify";
import { Modal, Button } from "react-bootstrap";

const AcknowledgementDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginDetails = useSelector(
    (state) => state.auth?.userDetailsAfterLogin.Details
  );

  const [show, setShow] = useState(false);
  const [futureDate, setFutureDate] = useState();

  const [dateFromBackend, setDateFromBackend] = useState();

  const [comparisonResult, setComparisonResult] = useState("");
  const [disabledBtn, setDisableBtn] = useState(false);
  const [isDateInPast, setIsDateInPast] = useState(false);
  const [isDateInFuture, setIsDateInFuture] = useState(false);
  const [isPresentDate, setIsPresentDate] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    // navigate("/NewBooking");
    window.close();
    setShow(false);
  };

  const [loader, setLoader] = useState(false);
  const today = moment().format("YYYY-MM-DD");

  console.log("today----------->", dateFromBackend);

  useEffect(() => {
    compareDates();
  }, [dateFromBackend, today]);

  function compareDates() {
    const backendDate = moment(dateFromBackend).startOf("day");
    const today = moment().startOf("day");

    if (backendDate.isBefore(today)) {
      // Condition 1: If the backendDate is before today
      setComparisonResult("Past date.");
      setIsDateInPast(true);
      setIsDateInFuture(false);
      setDisableBtn(true);
      setIsPresentDate(false);
    } else if (backendDate.isAfter(today)) {
      // Condition 2: If the backendDate is after today
      setComparisonResult("Future date");
      setIsDateInFuture(true);
      setIsDateInPast(false);
      setIsPresentDate(false);
      setDisableBtn(true);
    } else {
      // Condition 3: If the backendDate is neither before nor after today (i.e., they match)
      setComparisonResult("Dates match");
      setIsDateInPast(false);
      setIsDateInFuture(false);
      setDisableBtn(false);
      setIsPresentDate(true);
    }
  }

  console.log("comparisonResult------------>", comparisonResult);

  useEffect(() => {
    if (!loginDetails) {
      navigate("/");
    } else {
      console.log("Hi");
      setShow(true);
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
            console.log(
              "callback?.response?.Details?.FutureDate",
              callback?.response?.Details?.FutureDate
            );
            setDateFromBackend(callback?.response?.Details?.FutureDate);

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
            setBookingData(data);

            // dispatch(
            //   AddBillingDetails(
            //     loginDetails?.logindata?.Token,
            //     data,
            //     (callback) => {
            //       if (callback.status) {
            //         console.log(
            //           "Generate Bill --------------",
            //           callback?.response?.Details
            //         );

            //         if (
            //           callback?.response?.Details[0]?.NumOfTeens -
            //             callback?.response?.Details[0]?.TotalGuestCount ==
            //           0
            //         ) {
            //           navigate("/TeensBilling", {
            //             state: { BookingDetails: callback?.response?.Details },
            //           });
            //           setLoader(false);
            //         } else {
            //           navigate("/BillingDetails", {
            //             state: { BookingDetails: callback?.response?.Details },
            //           });
            //           setLoader(false);
            //         }

            //         toast.error(callback.error);
            //       } else {
            //         toast.error(callback.error);
            //         setLoader(false);
            //       }
            //     }
            //   )
            // );
          } else {
            console.log(callback.error);
            toast.error(callback.error);
          }
        }
      )
    );
  }, []);

  console.log("futureDate------------>", futureDate);
  console.log("today------->", today);

  const confirmBilling = () => {
    console.log("bookingData?.data--->", bookingData);
    dispatch(
      AddBillingDetails(
        loginDetails?.logindata?.Token,
        bookingData,
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
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {isPresentDate ? (
            <Modal.Title>Confirm Booking</Modal.Title>
          ) : (
            <Modal.Title>Error</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {isPresentDate ? (
            <p>Do you want to continue with the booking?</p>
          ) : (
            <p></p>
          )}
          {isDateInFuture ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Sorry, this booking cannot be processed as it is scheduled for a
              future date.
            </p>
          ) : (
            <p></p>
          )}
          {isDateInPast ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Sorry, this booking cannot be processed as it was scheduled for a
              past date.
            </p>
          ) : (
            <p></p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {isPresentDate ? (
            <Button variant="primary" onClick={confirmBilling}>
              Confirm
            </Button>
          ) : (
            <></>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AcknowledgementDetails;
